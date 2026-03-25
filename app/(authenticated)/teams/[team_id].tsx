import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import TeamView from '@/components/TeamView';
import { useTeams } from '@/contexts/TeamsContext';
import { useEvents } from '@/contexts/EventsContext';

export default function TeamController() {
    const { team_id } = useLocalSearchParams();
    const { teams, subscribeToTeam, unsubscribeFromTeam } = useTeams();
    const { fetchEvents } = useEvents();

    const team = teams.find(t => t.id === team_id);
    if (!team) {
        throw new Error('no team found for id: ' + team_id);
    }

    const handleSubscribeToTeam = async () => {
        const result = await subscribeToTeam(team.id);
        if (result) {
            fetchEvents();
        } else {
            throw new Error('subscribing to team failed');
        }
    };

    const handleUnsubscribeFromTeam = async () => {
        const result = await unsubscribeFromTeam(team.id);
        if (!result) {
            throw new Error('unsubscribing from team failed');
        }
    };

    return (
        <>
            {team ? (
                <TeamView
                    team={team}
                    handleSubscribeToTeam={handleSubscribeToTeam}
                    handleUnsubscribeFromTeam={handleUnsubscribeFromTeam} />
            ) : (
                <Text>object does not exist {team}</Text>
            )}
        </>
    )
}