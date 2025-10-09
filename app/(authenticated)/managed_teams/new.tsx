import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTeams } from '@/contexts/TeamsContext';
import http from '@/services/http-common';

export default function NewManagedTeam() {
    const router = useRouter();
    const { addTeam } = useTeams();
    const [name, setName] = useState('');

    const handleCreateTeam = async () => {
        await http.post(`auth/teams`, { teamName: name })
            .then(response => {
                addTeam({
                    id: response.data.id,
                    name: name,
                    is_admin: true,
                    is_subscribed: false
                });
            }).catch(e => {
                console.error(e);
            });
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