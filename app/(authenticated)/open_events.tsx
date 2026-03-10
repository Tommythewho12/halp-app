
import EventsListViewer from '@/components/EventsListViewer';
import { useEvents } from '@/contexts/EventsContext';

export default function Events_notSubscribed() {
    const { events } = useEvents();

    const showingEvents = events.filter(e => !e.isAssigned);

    return <EventsListViewer events={showingEvents} />;
}
