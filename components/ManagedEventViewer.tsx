import { Text, View } from 'react-native';

import { ManagedEvent } from '@/types';

export default function ManagedEventViewerr(event: ManagedEvent) {

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
            <Text>Completed?</Text>
            {event.complete ? <Text>Completed!</Text> : <Text>Still in worrk</Text>}
        </View>
    );
};