import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

// TODO pass function to create new team to this view
export default function NewTeam() {
    const router = useRouter();
    const [name, setName] = useState('');

    const handleCreateTeam = () => {
        // call method passed in constructor
        router.back();
    }

    return (
        <View>
            <Text>Some Text</Text>

            <TextInput
                placeholder='Name'
                keyboardType='default'
                value={name}
                onChangeText={setName}
            />

            <TouchableOpacity onPress={handleCreateTeam}>
                <Text>Create</Text>
            </TouchableOpacity>
        </View>
    )
}