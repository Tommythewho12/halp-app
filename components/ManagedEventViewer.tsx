import { Button, Pressable, Text, View } from 'react-native';

import { DetailedManagedEvent, ManagedEvent } from '@/types';
import VolunteerPicker from './VolunteerPicker';
import { useState } from 'react';

export default function ManagedEventViewerr({ event }: { event: DetailedManagedEvent }) {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const getDisplayName = (userId: string) => {
        return event.volunteers.find(u => u.id === userId)?.display_name;
    };

    return (
        <View>
            <Text>Event Name</Text>
            <Text>{event.name}</Text>
            <Text>Team Id</Text>
            <Text>{event.team_id}</Text>
            <Text>Description</Text>
            <Text>{event.description}</Text>
            <Text>Start Date Time</Text>
            <Text>{event.start_datetime}</Text>
            <Text>Completed</Text>
            {event.complete ? <Text>Completed!</Text> : <Text>Incomplete</Text>}
            <Text>Jobs</Text>
            {event.jobs &&
                event.jobs.map(j => (
                    <Text key={j.id}>{j.type}</Text>
                ))
            }
            <Text>Volunteers</Text>
            {event.volunteers &&
                event.volunteers.map(v =>
                    <Text key={v.id}>{v.display_name}</Text>
                )
            }
            <VolunteerPicker modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <Pressable onPress={() => setModalVisible(true)}>
                <Text>WHADDUP</Text>
            </Pressable>
        </View>
    );
};