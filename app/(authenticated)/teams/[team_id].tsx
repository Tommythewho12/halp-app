import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import TeamViewer from '@/components/TeamViewer';
import { Team } from '@/types';
import { useTeams } from '@/contexts/TeamsContext';
import { isNumber } from '@/components/basic/Utils';

export default function TeamView() {
    const { team_id } = useLocalSearchParams();
    const { teams } = useTeams();

    const handleSubscribe = () => {
        // TODO move to teams context provider
        http.post(`auth/teams/${1}/subscribers`)
            .then(response => {
                // TODO update subscription status
                // setTeam({ ...team, is_subscribed: true });
            })
            .catch(e => { console.error(e) });
    }

    const handleUnsubscribe = () => {
        // TODO move to teams context provider
        http.delete(`auth/teams/${1}/subscribers`)
            .then(response => {
                // TODO update subscription status
                // setTeam({ ...team, is_subscribed: false });
            })
            .catch(e => { console.error(e) });
    }

    const team = teams.find(t => t.id === team_id);

    return (
        <>
            {team ? (
                <TeamViewer team={team} />
            ) : (
                <Text>object does not exist {team}</Text>
            )}
        </>
    )
}