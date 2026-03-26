import { useState } from "react";
import { Button } from "react-native";

import { ShortTextInputWithLabel, TopView } from '@/components/Containers';

export default function ManagedTeamCreateView({ handleCreateTeam }: { handleCreateTeam: (name: string) => Promise<void> }) {
    const [name, setName] = useState<string>('');

    const submitCreateTeam = () => {
        handleCreateTeam(name);
    }

    return (
        <TopView>
            <ShortTextInputWithLabel
                placeholder='Team Name'
                value={name}
                onChangeText={setName}
                onSubmitEditing={submitCreateTeam}
                returnKeyType='send' />

            <Button onPress={submitCreateTeam} title='Create' />
        </TopView>
    )
}