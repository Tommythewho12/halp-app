import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useLocalSearchParams } from "expo-router";
import http from '@/services/http-common';

import { DetailedEvent, DetailedEventDto } from '@/types';
import EventView from "@/views/EventView";
import { useEvents } from "@/contexts/EventsContext";
import { toDetailedEvent } from '@/utils/Utils';
import { useUser } from '@/contexts/UsersContext';

export default function EventViewController() {
    const { event_id: eventId } = useLocalSearchParams<{ event_id?: string }>();
    const [event, setEvent] = useState<DetailedEvent | null>(null);
    const { id: userId } = useUser();
    const { volunteerToEvent, unvolunteerFromEvent } = useEvents();

    useEffect(() => {
        fetchEvent();
    }, [eventId]);

    const fetchEvent = async () => {
        if (eventId === undefined) {
            throw new Error("event_id parameters must be set");
        }

        try {
            const response = await http.get<DetailedEventDto>(`auth/events/${eventId}`);
            const detailedEvent: DetailedEvent = toDetailedEvent(response.data);

            setEvent(detailedEvent);
        } catch (e) {
            console.error("Failed to fetch events:", e);
        }
    };

    const requestVolunteerToEvent = async (): Promise<boolean> => {
        if (!eventId) return false;
        const response = await volunteerToEvent(eventId);
        if (response) {
            setEvent(prev => {
                if (!prev) return prev;
                return { ...prev, event: { ...prev.event, isVolunteering: true } };
            });
        }
        return false;
    };

    const requestUnvolunteerFromEvent = async (): Promise<boolean> => {
        if (!eventId) return false;
        if (event?.jobs.find(j => j.assigneeId == userId)) {
            console.error('you cannot unvolunteer from this event because you are already assigned to a job');
            return false;
        }
        const result = await unvolunteerFromEvent(eventId);
        if (!result) {
            throw new Error('unknown error; unable to unvolunteer from event');
        }
        setEvent(prev => {
            if (!prev) return prev;
            return { ...prev, event: { ...prev.event, isVolunteering: false } };
        });
        return true;
    };

    return (
        <>
            {event ? (
                <EventView
                    detailedEvent={event}
                    volunteerToEvent={requestVolunteerToEvent}
                    unvolunteerFromEvent={requestUnvolunteerFromEvent} />
            ) : (
                <Text>Not found!</Text>
            )}
        </>
    );
}