import React, { createContext, useContext, useState, useEffect } from 'react';

import http from '@/services/http-common';
import { DetailedManagedEventCreator, Event, EventDto } from '@/types';
import { is2XXStatus, safeBooleanConverter } from '@/utils/Utils';
import { useTeams } from './TeamsContext';

type EventsContextType = {
    events: Event[];
    fetchEvents: () => Promise<void>;
    addEvent: (event: DetailedManagedEventCreator) => Promise<string>;
    deleteEvent: (eventId: string) => Promise<void>;
    volunteerToEvent: (eventId: string) => Promise<boolean>;
    unvolunteerFromEvent: (eventId: string) => Promise<boolean>;
};

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
    const teamsContext = useTeams();
    const [events, setEvents] = useState<Event[]>([]);

    const fetchEvents = async () => {
        try {
            const response = await http.get<EventDto[]>("auth/events");
            const convertedEvents: Event[] = response.data.map(event => ({
                id: String(event.id),
                name: event.name,
                teamId: String(event.team_id),
                description: event.description,
                startDatetime: new Date(event.start_datetime * 1000),
                setupComplete: safeBooleanConverter(event.complete),
                teamName: teamsContext.getTeamName(String(event.team_id)),
                isVolunteering: safeBooleanConverter(event.is_volunteering),
                isAssigned: safeBooleanConverter(event.is_assigned)
            }));
            setEvents(convertedEvents);
        } catch (e) {
            console.error("Failed to fetch events:", e);
        }
    };

    const addEvent = async (creator: DetailedManagedEventCreator): Promise<string> => {
        try {
            const response = await http.post<EventDto>(`auth/teams/${creator.event.teamId}/events`,
                {
                    eventName: creator.event.name,
                    dateTime: (creator.event.startDatetime.valueOf()) / 1000,
                    description: creator.event.description,
                    jobs: {
                        scorer: creator.scorers,
                        official: creator.officials
                    }
                });
            const event = response.data;
            const convertedEvent: Event = {
                id: String(event.id),
                teamId: String(event.team_id),
                name: event.name,
                description: event.description,
                startDatetime: new Date(event.start_datetime * 1000),
                setupComplete: safeBooleanConverter(event.complete),
                teamName: teamsContext.getTeamName(String(event.team_id)),
                isVolunteering: safeBooleanConverter(event.is_volunteering),
                isAssigned: safeBooleanConverter(event.is_assigned)
            };
            setEvents((prev) => [...prev, convertedEvent]);
            return String(event.id);
        } catch (e) {
            console.error(e);
            return '';
        }
    };

    const deleteEvent = async (eventId: string) => {
        // TODO move http to here
        setEvents((prev) => prev.filter(e => e.id !== eventId));
    };

    const volunteerToEvent = async (eventId: string) => {
        const response = await http.post(`auth/events/${eventId}/volunteers`); // TODO create DTO
        if (is2XXStatus(response.status)) {
            setEvents(prev => prev.map(e => e.id === eventId ? { ...e, isVolunteering: true } : e));
            return true;
        }

        console.error('process failed with status: ', response.status);
        return false;
    }

    const unvolunteerFromEvent = async (eventId: string): Promise<boolean> => {
        const response = await http.delete(`auth/events/${eventId}/volunteers`); // TODO create DTO
        if (is2XXStatus(response.status)) {
            setEvents(prev => prev.map(e => e.id === eventId ? { ...e, isVolunteering: false } : e));
            return true;
        }

        console.error('process failed with status: ', response.status);
        return false;
    }

    // fetch events initially
    useEffect(() => {
        if (!teamsContext || teamsContext.isLoading) {
            return;
        }

        fetchEvents();
    }, [teamsContext.isLoading]);

    return (
        <EventsContext.Provider value={{
            events,
            fetchEvents,
            addEvent,
            deleteEvent,
            volunteerToEvent,
            unvolunteerFromEvent
        }}>
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