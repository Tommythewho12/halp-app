import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTeams } from '@/contexts/TeamsContext';

export default function NewManagedTeamController() {
    const router = useRouter();
    const { newManagedTeam } = useTeams();
    const [name, setName] = useState('');

    const handleCreateTeam = async () => {
        await newManagedTeam(name);
        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Team Name</Text>

            <TextInput
                placeholder='Name'
                keyboardType='default'
                value={name}
                onChangeText={setName}
            />

            <Button onPress={handleCreateTeam} title='Create' />
        </SafeAreaView>
    )
}