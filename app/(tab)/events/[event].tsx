import { Button } from "@react-navigation/elements";
import { Text, View } from "react-native";

import http from '@/http-common';
import { useAuth } from '@/services/AuthContext';

import EventViewer from "@/components/EventViewer";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

export default function Event() {
    const searchParams = useLocalSearchParams();
    const { accessToken } = useAuth();
    const [event, setEvent] = useState({ id: null, name: null, start_datetime: null, description: null, team_id: null });

    useEffect(() => {
        console.log(`## effect in event`);
        var eventId = searchParams.id;
        if (eventId == null) {
            throw new Error("no eventId was provided for team view");
        }
        console.log(`## request against /auth/events/${eventId}`);
        http.get(`auth/events/${eventId}`, { headers: { Authorization: `Bearer ` + accessToken } }).then(response => {
            setEvent(response.data);
        }).catch(e => { console.error(e) });
    }, []);

    return (
        <View>
            <Text>Hier passieren Sachen</Text>
            <EventViewer id={event.id} name={event.name} start_datetime={event.start_datetime} description={event.description} team_id={event.team_id} />
        </View>
    )
}