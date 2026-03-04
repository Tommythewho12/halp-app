
import EventsListViewer from '@/components/EventsListViewer';
import { useEvents } from '@/contexts/EventsContext';

// events, but has to be named index
export default function Events_notSubscribed() {
    const { events } = useEvents();

    return <EventsListViewer events={events} />;
}
