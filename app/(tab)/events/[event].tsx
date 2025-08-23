import { Button } from "@react-navigation/elements";
import { Text, View } from "react-native";

import http from '@/http-common';
import { useAuth } from '@/services/AuthContext';

import EventViewer from "@/components/EventViewer";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function Event() {
    const searchParams = useLocalSearchParams();
    const eventId = searchParams.id;
    const { accessToken } = useAuth();
    const [event, setEvent] = useState({ id: eventId, name: null, start_datetime: null, description: null, team_id: null, isUserSubscribed: false });

    const handleVolunteer = () => {
        console.debug("Access Token: ", accessToken);
        // http.post(`auth/events/${event.id}/volunteers`, "data", { headers: { Authorization: `Bearer ` + accessToken } })
        http.post(`auth/events/${event.id}/volunteers`)
            .then(response => {
                setEvent({ ...event, isUserSubscribed: true });
            })
            .catch(e => { console.error(e) });
    }

    useEffect(() => {
        if (eventId == null) {
            throw new Error("no eventId was provided for event view");
        }
        console.debug(`## prepare statement against /auth/events/${eventId}`);
        // http.get(`auth/events/${eventId}`, { headers: { Authorization: `Bearer ` + accessToken } })
        http.get(`auth/events/${eventId}`)
            .then(response => {
                console.debug(`## sent request against /auth/events/${eventId}`);
                setEvent(response.data);
            }).catch(e => { console.error(e) });
    }, [eventId]);

    return (
        <View>
            <Text>Hier passieren Sachen</Text>
            <EventViewer id={event.id} name={event.name} start_datetime={event.start_datetime} description={event.description} team_id={event.team_id} isUserVolunteer={false} handleVolunteer={handleVolunteer} />
        </View>
    )
}