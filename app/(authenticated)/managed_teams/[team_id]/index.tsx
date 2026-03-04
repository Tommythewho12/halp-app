import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import ManagedTeamViewer from '@/components/ManagedTeamViewer';
import { useTeams } from '@/contexts/TeamsContext';
import { useEvents } from '@/contexts/EventsContext';
import { isNumber } from '@/components/basic/Utils';
import { Team } from '@/types';

export default function ManagedTeamm() {
    const { team_id: teamIdParameter } = useLocalSearchParams<{ team_id?: string }>();
    const { teams } = useTeams();
    const { events } = useEvents();
    const [team, setTeam] = useState<Team | null>(null);

    useEffect(() => {
        if (teamIdParameter !== undefined && isNumber(teamIdParameter)) {
            const optionalTeam = teams.find(t => t.id == teamIdParameter);
            if (optionalTeam !== undefined) {
                setTeam(optionalTeam);
            }
        }
    }, [teamIdParameter]);

    return (
        <>
            {team !== null ? (<ManagedTeamViewer team={team} events={events.filter((e) => e.teamId === team.id)} />) : <Text>Not found!</Text>}
        </>
    );
}
