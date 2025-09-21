import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import { useEvents } from '@/contexts/EventsContext';
import ManagedEventViewerr from '@/components/ManagedEventViewer';
import { DetailedManagedEvent } from '@/types';

export default function ManagedEventViewer() {
    const { team_id, event_id } = useLocalSearchParams<{ team_id?: string, event_id?: string }>();
    const [event, setEvent] = useState<DetailedManagedEvent | null>(null);

    useEffect(() => {
        if (typeof (event_id) === 'string' && typeof (team_id) === 'string') {
            http.get(`auth/teams/${team_id}/events/${event_id}`)
                .then(response => {
                    console.debug("##debug", response.data);
                    setEvent(response.data);
                })
                .catch(e => {
                    console.error(e);
                });
        }
    }, []);

    return (
        <View>
            {event ?
                <ManagedEventViewerr
                    event={event}
                /> :
                <Text>Sumting went wong!</Text>
            }
        </View>
    )
};