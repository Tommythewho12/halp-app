import { Text } from 'react-native';
import { useLocalSearchParams } from "expo-router";

import EventViewer from "@/components/EventViewer";
import { useEvents } from "@/contexts/EventsContext";

export default function EventViewerr() {
    const { event_id: eventId } = useLocalSearchParams<{ event_id?: string }>();
    const { events } = useEvents();

    const event = events.find(e => e.id == eventId);

    return (
        <>
            {event ? (
                <EventViewer event={event} />
            ) : (
                <Text>Not found!</Text>
            )}
        </>
    );
}