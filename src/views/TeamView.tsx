import { Button, Text } from 'react-native';

import { TitleAndId, TopView } from '@/components/Containers';
import { Team } from '@/types';

export default function TeamView(
    {
        team,
        handleSubscribeToTeam,
        handleUnsubscribeFromTeam,
    }: {
        team: Team,
        handleSubscribeToTeam: () => Promise<void>,
        handleUnsubscribeFromTeam: () => Promise<void>,
    }) {

    return (
        <TopView>
            <TitleAndId title={team.name} id={team.id} />
            {team.isSubscribed ? (
                <Button title="Unsubscribe from team!" onPress={() => handleUnsubscribeFromTeam()} />
            ) : (
                <Button title="Subscribe to team" onPress={() => handleSubscribeToTeam()} />
            )}
            {team.isAdmin && <Text>You are the admin of this team!</Text>}
        </TopView>
    );
};