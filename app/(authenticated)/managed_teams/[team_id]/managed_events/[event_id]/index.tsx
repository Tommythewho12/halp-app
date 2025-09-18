import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { useEvents } from '@/contexts/EventsContext';
import ManagedEventViewerr from '@/components/ManagedEventViewer';

export default function ManagedEventViewer() {
    const { event_id } = useLocalSearchParams<{ event_id?: string }>();
    const { events } = useEvents();

    const event = event_id ? events.find((e) => e.id == event_id) : undefined;

    return (
        <View>
            {event ?
                <ManagedEventViewerr
                    id={event.id}
                    team_id={event.team_id}
                    name={event.name}
                    description={event.description}
                    start_dateTime={event.start_dateTime}
                    complete={event.complete}
                /> :
                <Text>Sumting went wong!</Text>
            }
        </View>
    )
};