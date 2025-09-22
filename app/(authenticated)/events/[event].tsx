import { Text, View } from "react-native";

import http from '@/services/http-common';

import EventViewer from "@/components/EventViewer";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function Event() {
    const searchParams = useLocalSearchParams();
    const eventId = searchParams.event;
    const [event, setEvent] = useState({ id: eventId, name: null, start_datetime: null, description: null, team_id: null, is_subscribed: false, is_assigned: false });

    const handleVolunteer = () => {
        http.post(`auth/events/${event.id}/volunteers`)
            .then(response => {
                setEvent({ ...event, is_subscribed: true });
            })
            .catch(e => { console.error(e) });
    }

    const handleUnvolunteer = () => {
        http.delete(`auth/events/${event.id}/volunteers`)
            .then(response => {
                setEvent({ ...event, is_subscribed: false });
            })
            .catch(e => { console.error(e) });
    }

    // TODO take data from parent instead of making another call
    useEffect(() => {
        if (eventId == null) {
            throw new Error("no eventId was provided for event view");
        }
        console.debug(`## prepare statement against /auth/events/${eventId}`);
        http.get(`auth/events/${eventId}`)
            .then(response => {
                setEvent(response.data);
            }).catch(e => { console.error(e) });
    }, [eventId]);

    return (
        <View>
            <EventViewer
                id={event.id}
                name={event.name}
                startDatetime={event.start_datetime}
                description={event.description}
                teamId={event.team_id}
                isSubscribed={event.is_subscribed}
                handleVolunteer={handleVolunteer}
                handleUnvolunteer={handleUnvolunteer}
                isAssigned={event.is_assigned} />
        </View>
    )
}