import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import ManagedTeamViewer from '@/components/ManagedTeamViewer';
import { useTeams } from '@/contexts/TeamsContext';
import { useEvents } from '@/contexts/EventsContext';

export default function ManagedTeamm() {
    const { team_id: teamIdParameter } = useLocalSearchParams<{ team_id?: string }>();
    const { teams } = useTeams();
    const { events } = useEvents();

    if (teamIdParameter == undefined) {
        console.error('team_id parameter must be defined');
    }
    const team = teams.find(t => t.id == teamIdParameter);

    return (
        <>
            {team ? (
                <ManagedTeamViewer
                    team={team}
                    events={events.filter((e) => e.teamId === team.id)}
                />
            ) : (
                <Text>Not found!</Text>
            )}
        </>
    );
}
