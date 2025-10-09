import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import http from '@/services/http-common';
import EventsListViewer from '@/components/EventsListViewer';

// events, but has to be named index
export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        http.get(`auth/events`, {
            params: {
                as: 'subscriber'
            }
        })
            .then(response => {
                console.debug("received events object: ", response.data);
                setEvents(response.data);
            }).catch(e => {
                console.error(e);
            });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <EventsListViewer events={events} />
        </SafeAreaView>
    );
}
