import React from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect, useLocalSearchParams } from 'expo-router';

import ManagedTeamViewer from '@/components/ManagedTeamViewer';
import { useTeams } from '@/contexts/TeamsContext';
import { useEvents } from '@/contexts/EventsContext';

export default function ManagedTeamm() {
    const { team_id } = useLocalSearchParams<{ team_id?: string }>();
    const { teams } = useTeams();
    const { events } = useEvents();

    const team = team_id ? teams.find((t) => t.id == team_id) : undefined;

    // useFocusEffect(
    //     React.useCallback(() => {
    //         if (id) {
    //             setTeamId(searchParams.id);
    //         }
    //     }, [])
    // );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {team ? <ManagedTeamViewer id={team.id} name={team.name} events={events.filter((e) => e.team_id == team_id)} /> : <Text>Not found!</Text>}
        </View>
    );
}
