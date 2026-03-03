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
    const [team, setTeam] = useState<Team>();

    const handleSubscribe = () => {
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

    console.info("TeamView: ", team_id, teams, team, typeof team_id);

    useEffect(() => {
        let message = null;
        if (team_id == null)
            message = 'no team_id was provided for team view';
        else if (Array.isArray(team_id))
            message = 'team_id search-parameter expected to be string but is string[]';
        else if (!isNumber(team_id))
            message = 'team_id search-parameter is not a number';
        else {
            setTeam(teams.find(t => t.id === parseInt(team_id)));
        }
        if (message !== null)
            throw new Error(message);
    }, [team_id]);

    return (
        <>
            {team != undefined ? <TeamViewer team={team} /> : <Text>object does not exist {team}</Text>}
        </>
    )
}