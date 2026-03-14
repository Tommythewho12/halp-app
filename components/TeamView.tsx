import { Button, StyleSheet, Text, View } from 'react-native';

import { TitleAndId, TopView } from './basic/Containers';
import { Team } from '@/types';
import { useTeams } from '@/contexts/TeamsContext';

export default function TeamView({ team }: { team: Team }) {
    const { subscribeToTeam, unsubscribeFromTeam } = useTeams();

    return (
        <TopView>
            <TitleAndId title={team.name} id={team.id} />
            {team.isSubscribed ? (
                <Button title="Unsubscribe from team!" onPress={() => unsubscribeFromTeam(team.id)} />
            ) : (
                <Button title="Subscribe to team" onPress={() => subscribeToTeam(team.id)} />
            )}
            {team.isAdmin && <Text>You are the admin of this team!</Text>}
        </TopView>
    );
};