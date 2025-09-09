import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import http from '@/http-common';
import TeamsListViewer from '@/components/TeamsListViewer';

export default function Teams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        http.get(`auth/teams`)
            .then(response => {
                setTeams(response.data);
            }).catch(e => {
                console.error(e);
            });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TeamsListViewer teams={teams} />
        </View>
    );
}
