import EventsListViewer from '@/components/EventsListViewer';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import http from '@/http-common';
import { useAuth } from '@/services/AuthContext';

// events, but has to be named index
export default function Index() {
    const { accessToken } = useAuth();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // http.get(`auth/events`, {headers: {Authorization: `Bearer ` + accessToken}})
        http.get(`auth/events`)
            .then(response => {
                setEvents(response.data);
            }).catch(e => {
                console.error(e);
            });
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>
                Events
            </Text>
            <EventsListViewer events={events} />
        </View>
    );
}
