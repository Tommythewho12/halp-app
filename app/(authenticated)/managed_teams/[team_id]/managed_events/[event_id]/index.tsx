import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import ManagedEventViewerr from '@/components/ManagedEventViewer';
import { DetailedManagedEvent } from '@/types';

export default function ManagedEventViewer() {
    const { team_id, event_id } = useLocalSearchParams<{ team_id?: string, event_id?: string }>();
    const [event, setEvent] = useState<DetailedManagedEvent | null>(null);

    const handleVolunteerAssignment = (newUserId: string | null, jobId: string) => {
        if (event) {
            const newJobs = event.jobs.map(j => {
                if (j.id !== jobId)
                    return j;
                return {
                    id: j.id,
                    type: j.type,
                    user_id: newUserId
                }
            });

            const newEvent = {
                id: event.id,
                team_id: event.team_id,
                name: event.name,
                description: event.description,
                start_datetime: event.start_datetime,
                complete: event.complete,
                volunteers: event.volunteers,
                jobs: newJobs
            };
            setEvent(newEvent);
        }
    };

    useEffect(() => {
        if (typeof (event_id) === 'string' && typeof (team_id) === 'string') {
            http.get(`auth/teams/${team_id}/events/${event_id}`)
                .then(response => {
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
                    handleVolunteerAssignment={handleVolunteerAssignment}
                /> :
                <Text>Sumting went wong!</Text>
            }
        </View>
    )
};