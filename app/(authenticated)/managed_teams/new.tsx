import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { useTeams } from '@/contexts/TeamsContext';

export default function NewTeam() {
    const router = useRouter();
    const { addTeam } = useTeams();
    const [name, setName] = useState('');

    const handleCreateTeam = () => {
        // TODO rest call
        addTeam({
            id: undefined,
            name: name,
            is_admin: true,
            is_subscribed: false
        });
        router.back();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Team Name</Text>

            <TextInput
                placeholder='Name'
                keyboardType='default'
                value={name}
                onChangeText={setName}
            />

            <Button onPress={handleCreateTeam} title='Create' />
        </View>
    )
}