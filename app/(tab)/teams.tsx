import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import http from '@/http-common';
import TeamsListViewer from '@/components/TeamsListViewer';
import { useAuth } from '@/services/AuthContext';

export default function Teams() {
    const { accessToken } = useAuth();
    const [teams, setTeams] = useState([]);
    
    useEffect(() => {
        http.get(`auth/teams`, {headers: {Authorization: `Bearer ` + accessToken}})
        .then(response => {
            setTeams(response.data);
        }).catch(e => {
            console.error(e);
        });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
            Teams
        </Text>
        <TeamsListViewer teams={teams} />
        </View>
    );
}
