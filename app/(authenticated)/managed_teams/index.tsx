import { Text, View, Pressable, Button } from 'react-native';

import ManagedTeamsListViewer from '@/components/TeamsListViewer';
import { useRouter } from 'expo-router';
import { useTeams } from '@/contexts/TeamsContext';

export default function ManagedTeams() {
    const router = useRouter();
    const { teams } = useTeams();

    const handlePressCreateNew = () => {
        router.navigate({ pathname: '/(authenticated)/managed_teams/new' });
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title='Create new Team'
                onPress={handlePressCreateNew} />

            <ManagedTeamsListViewer teams={teams} />
        </View>
    );
}
