import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import http from '@/services/http-common';
import EventsListViewer from '@/components/EventsListViewer';
import { TopView } from '@/components/basic/Containers';

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
        <EventsListViewer events={events} />
    );
}
