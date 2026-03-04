import React, { createContext, useContext, useState, useEffect } from 'react';

import http from '@/services/http-common';
import { Event, EventDto } from '@/types';
import { safeBooleanConverter } from '@/components/basic/Utils';

type EventsContextType = {
    events: Event[];
    fetchEvents: () => Promise<void>;
    addEvent: (event: Event) => Promise<void>;
    deleteEvent: (eventId: string) => Promise<void>;
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
    const [events, setEvents] = useState<Event[]>([]);

    const fetchEvents = async () => {
        try {
            const response = await http.get<EventDto[]>("auth/events");
            const convertedEvents: Event[] = response.data.map(event => ({
                id: String(event.id),
                teamId: String(event.team_id),
                name: event.name,
                description: event.description,
                startDatetime: new Date(event.start_datetime * 1000),
                setupComplete: safeBooleanConverter(event.complete)
            }));
            setEvents(convertedEvents);
        } catch (e) {
            console.error("Failed to fetch events:", e);
        }
    };

    const addEvent = async (event: Event) => {
        // TODO move http to here
        setEvents((prev) => [...prev, event]);
    };

    const deleteEvent = async (eventId: string) => {
        // TODO move http to here
        setEvents((prev) => prev.filter(e => e.id !== eventId));
    };

    // fetch events initially
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventsContext.Provider value={{ events, fetchEvents, addEvent, deleteEvent }}>
            {children}
        </EventsContext.Provider>
    );
};

export const useEvents = () => {
    const ctx = useContext(EventsContext);
    if (!ctx) {
        throw new Error("useEvents must be used inside EventsProvider");
    }
    return ctx;
};