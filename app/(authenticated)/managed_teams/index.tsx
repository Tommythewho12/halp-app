import { Text, View, Pressable } from 'react-native';

import TeamsListViewer from '@/components/TeamsListViewer';
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
            <Pressable
                onPress={handlePressCreateNew}
            >
                <Text>Create new Team</Text>
            </Pressable>
            <Text>My managed Teams</Text>
            <TeamsListViewer teams={teams} />
        </View>
    );
}
