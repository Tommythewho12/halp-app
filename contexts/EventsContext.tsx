import React, { createContext, useContext, useState, useEffect } from 'react';

import http from '@/services/http-common';
import { ManagedEvent } from '@/types';

type EventsContextType = {
    events: ManagedEvent[];
    fetchEvents: () => Promise<void>;
    addEvent: (event: ManagedEvent) => void;
    deleteEvent: (eventId: number) => void;
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
    const [events, setEvents] = useState<ManagedEvent[]>([]);

    const fetchEvents = async () => {
        try {
            const response = await http.get<ManagedEvent[]>("auth/events");
            setEvents(response.data);
        } catch (e) {
            console.error("Failed to fetch events:", e);
        }
    };

    const addEvent = (event: ManagedEvent) => {
        setEvents((prev) => [...prev, event]);
    };

    const deleteEvent = (eventId: number) => {
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