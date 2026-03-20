import EventsView from '@/components/EventsView';
import { useEvents } from '@/contexts/EventsContext';

export default function EventsController() {
    const { events } = useEvents();

    const showingEvents = events.filter(e => e.isVolunteering);

    return (
        <EventsView events={showingEvents} />
    );
}
