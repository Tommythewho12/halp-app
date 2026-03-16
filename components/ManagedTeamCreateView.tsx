import { useState } from "react";
import { Button } from "react-native";

import { LabelShortTextEditor, TopView } from "./basic/Containers";

export default function ManagedTeamCreateView({ handleCreateTeam }: { handleCreateTeam: (name: string) => Promise<void> }) {
    const [name, setName] = useState<string>('');

    return (
        <TopView>
            <LabelShortTextEditor
                label='Team Name'
                value={name}
                onChangeText={setName} />

            <Button onPress={() => handleCreateTeam(name)} title='Create' />
        </TopView>
    )
}