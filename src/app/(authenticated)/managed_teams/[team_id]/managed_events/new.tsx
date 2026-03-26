import { router, useLocalSearchParams } from 'expo-router';

import { useEvents } from '@/contexts/EventsContext';
import { DetailedManagedEventCreator } from '@/types';
import ManagedEventCreateView from '@/views/ManagedEventCreateView';

export default function NewManagedEventController() {
    const { team_id } = useLocalSearchParams<{ team_id?: string }>();

    const { addEvent } = useEvents();

    const submitNewEvent = async (event: DetailedManagedEventCreator): Promise<void> => {
        if (!team_id || !event) {
            return;
        }
        const newManagedEvent: DetailedManagedEventCreator = {
            ...event, event: { ...event.event, teamId: team_id }
        };
        const response: string = await addEvent(newManagedEvent);
        if (response) {
            router.replace({ pathname: `/(authenticated)/managed_teams/[team_id]/managed_events/[event_id]`, params: { team_id: team_id, event_id: response } });
        }
    };

    return (
        <ManagedEventCreateView submitNewEvent={submitNewEvent} />
    );
}