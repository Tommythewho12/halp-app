import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import ManagedEventViewerr from '@/components/ManagedEventViewer';
import { DetailedManagedEventDto, DetailedManagedEvent, Job, Volunteer } from '@/types';

export default function ManagedEventViewer() {
    const { team_id, event_id } = useLocalSearchParams<{ team_id?: string, event_id?: string }>();
    const [event, setEvent] = useState<DetailedManagedEventDto | null>(null);

    const handleVolunteerAssignment = (newUserId: string | undefined, jobId: string) => {
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
            return { id: j.id, jobName: j.type, userName: userName, userId: j.user_id };
        });
        const newVolunteers: Volunteer[] = object.volunteers.map(v => {
            const assignedJobs = event?.jobs.find(j => j.user_id === v.id);
            return { id: v.id, displayName: v.display_name, assigned: assignedJobs !== undefined };
        });

        return {
            ...object,
            teamId: object.team_id,
            startDatetime: new Date(object.start_datetime * 1000),
            jobs: newJobs.sort((a, b) => a.jobName.toLocaleLowerCase().localeCompare(b.jobName.toLocaleLowerCase())),
            volunteers: newVolunteers
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
        <>
            {event ?
                <ManagedEventViewerr
                    event={convertDto(event)}
                    handleVolunteerAssignment={handleVolunteerAssignment}
                /> :
                <Text>Sumting went wong!</Text>
            }
        </>
    )
};