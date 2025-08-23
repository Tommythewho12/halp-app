import { useAuth } from '@/services/AuthContext';
import http from '@/http-common';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function Team() {
    const searchParams = useLocalSearchParams();
    const teamId = searchParams.id;
    const { accessToken } = useAuth();
    const [team, setTeam] = useState({ teamId: teamId, teamName: null, adminName: null });

    useEffect(() => {
        if (teamId == null) {
            throw new Error("no teamId was provided for team view");
        }
        console.debug(`## prepare statement against /auth/teams/${teamId}`);
        http.get(`auth/teams/${teamId}`, { headers: { Authorization: `Bearer ` + accessToken } })
            .then(response => {
                console.debug(`## sent request against /auth/teams/${teamId}`);
                setTeam(response.data);
            })
            .catch(e => { console.error(e) });
    }, [teamId]);

    return (
        <View>
            <Text>Welcome to the team view</Text>
            <Text>Id: {team.teamId}</Text>
            <Text>Name: {team.teamName}</Text>
            <Text>Admin: {team.adminName}</Text>
        </View>
    )
}