import { Text, View, Pressable } from 'react-native';
import { useEffect, useState } from 'react';

import http from '@/http-common';
import TeamsListViewer from '@/components/TeamsListViewer';
import { Team } from '@/types';
import { useRouter } from 'expo-router';

export default function ManagedTeams() {
    const router = useRouter();
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        http.get<Team[]>(`auth/teams`, { params: { as: 'admin' } })
            .then(response => {
                setTeams(response.data);
            }).catch(e => {
                console.error(e);
            });
    }, []);

    const handlePress = () => {
        router.navigate({ pathname: '/(authenticated)/managed_teams/new' });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pressable
                onPress={handlePress}
            >
                <Text>Create new Team</Text>
            </Pressable>
            <Text>My managed Teams</Text>
            <TeamsListViewer teams={teams} />
        </View>
    );
}
