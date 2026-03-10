import EventsListViewer from '@/components/EventsListViewer';
import { useEvents } from '@/contexts/EventsContext';

export default function Events() {
    const { events } = useEvents();

    const showingEvents = events.filter(e => e.isVolunteering);

    return (
        <EventsListViewer events={showingEvents} />
    );
}
