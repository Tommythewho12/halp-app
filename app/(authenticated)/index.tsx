import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import http from '@/http-common';
import EventsListViewer from '@/components/EventsListViewer';

// events, but has to be named index
export default function Index() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        http.get(`auth/events`, {
            params: {
                as: 'volunteer'
            }
        })
            .then(response => {
                setEvents(response.data);
            }).catch(e => {
                console.error(e);
            });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <EventsListViewer events={events} />
        </View>
    );
}
