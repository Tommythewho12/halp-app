import OpenEventsView from '@/views/OpenEventsView';
import { useEvents } from '@/contexts/EventsContext';

export default function OpenEventsController() {
    const { events } = useEvents();

    const showingEvents = events.filter(e => !e.isVolunteering);

    return <OpenEventsView events={showingEvents} />;
}
