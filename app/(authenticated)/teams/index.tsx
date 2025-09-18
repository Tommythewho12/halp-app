import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import http from '@/services/http-common';
import TeamsListViewer from '@/components/TeamsListViewer';
import { Team } from '@/types';

export default function Teams() {
    const [teams, setTeams] = useState<Team[]>([]);

    useEffect(() => {
        http.get<Team[]>(`auth/teams`, { params: { as: 'user' } })
            .then(response => {
                setTeams(response.data);
            }).catch(e => {
                console.error(e);
            });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Subscribed Teams</Text>
            <TeamsListViewer teams={teams.filter(t => t.is_subscribed)} />
            <Text>Unsubscribed Teams</Text>
            <TeamsListViewer teams={teams.filter(t => !t.is_subscribed)} />
        </View>
    );
}
