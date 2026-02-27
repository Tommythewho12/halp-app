import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import ManagedEventViewerr from '@/components/ManagedEventViewer';
import { DetailedManagedEventDto, DetailedManagedEvent, Job } from '@/types';

export default function ManagedEventViewer() {
    const { team_id, event_id } = useLocalSearchParams<{ team_id?: string, event_id?: string }>();
    const [event, setEvent] = useState<DetailedManagedEventDto | null>(null);

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

    const convertDto = (object: DetailedManagedEventDto): DetailedManagedEvent => {
        const newJobs: Job[] = object.jobs.map(j => {
            const userName = event?.volunteers.find(u => u.id === j.user_id)?.display_name;
            return { id: j.id, jobName: j.type, userName: userName ? userName : "" };
        });

        return {
            ...object,
            start_datetime: new Date(object.start_datetime * 1000),
            jobs: newJobs.sort((a, b) => a.jobName.toLocaleLowerCase().localeCompare(b.jobName.toLocaleLowerCase()))
        };
    }

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
                    event={convertDto(event)}
                    handleVolunteerAssignment={handleVolunteerAssignment}
                /> :
                <Text>Sumting went wong!</Text>
            }
        </View>
    )
};