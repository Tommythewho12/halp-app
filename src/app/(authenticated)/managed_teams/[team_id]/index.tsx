import { Text } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import ManagedTeamView from '@/views/ManagedTeamView';
import { useTeams } from '@/contexts/TeamsContext';
import { useEvents } from '@/contexts/EventsContext';

export default function ManagedTeamController() {
    const { team_id: teamIdParameter } = useLocalSearchParams<{ team_id?: string }>();
    const { teams, deleteManagedTeam } = useTeams();
    const { events } = useEvents();

    if (teamIdParameter == undefined) {
        console.error('team_id parameter must be defined');
    }
    const team = teams.find(t => t.id == teamIdParameter);

    const deleteTeamCbf = async () => {
        if (!teamIdParameter) return;
        if (events.filter(e => e.teamId == teamIdParameter && e.startDatetime > new Date()).length > 0) {
            console.error('All events for this team need to be deleted first');
            return;
        }
        deleteManagedTeam(teamIdParameter);
        router.back();
    };

    return (
        <>
            {team ? (
                <ManagedTeamView
                    team={team}
                    events={events.filter((e) => e.teamId === team.id)}
                    handleDeleteTeam={deleteTeamCbf}
                />
            ) : (
                <Text>Not found!</Text>
            )}
        </>
    );
}
