import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import ManagedEventViewerr from '@/components/ManagedEventViewer';
import { DetailedManagedEventDto, DetailedManagedEvent, Event, Job, Volunteer } from '@/types';
import { safeBooleanConverter } from '@/components/basic/Utils';

export default function ManagedEventViewer() {
    const { team_id: teamIdParameter, event_id: eventIdParameter } = useLocalSearchParams<{ team_id?: string, event_id?: string }>();
    const [event, setEvent] = useState<DetailedManagedEvent | null>(null);

    const handleVolunteerAssignment = (newUserId: string | null, jobId: string) => {
        if (event !== null) {
            const newJobs: Job[] = event.jobs.map(j => {
                if (j.id !== jobId)
                    return j;
                return { ...j, userId: newUserId }
            });

            const newEvent = { ...event, jobs: newJobs };
            setEvent(newEvent);
        }
    };

    const fetchEvent = async () => {
        if (eventIdParameter === undefined || teamIdParameter === undefined) {
            throw new Error("both team_id and event_id parameters must be set");
        }

        try {
            const response = await http.get<DetailedManagedEventDto>(`auth/teams/${teamIdParameter}/events/${eventIdParameter}`);
            const volunteers: Volunteer[] = response.data.volunteers.map(v => ({
                id: String(v.id),
                displayName: v.display_name,
                assigned: false
            }));
            const jobs: Job[] = response.data.jobs.map(j => ({
                id: String(j.id),
                jobName: j.type,
                userName: '',
                userId: j.user_id
            }));

            const updatedVolunteers: Volunteer[] = volunteers.map(v => {
                let assigned: boolean = false;
                const jobIndex = jobs.findIndex(j => j.userId === v.id);
                if (jobIndex >= 0) {
                    jobs[jobIndex] = { ...jobs[jobIndex], userId: v.id, userName: v.displayName };
                    assigned = true;
                }
                return { ...v, assigned: assigned }
            });

            const convertedEvent: Event = {
                id: String(response.data.id),
                teamId: String(response.data.team_id),
                name: response.data.name,
                description: response.data.description,
                startDatetime: new Date(response.data.start_datetime * 1000),
                setupComplete: safeBooleanConverter(response.data.complete)
            }

            const convertedDetailedManagedEvent: DetailedManagedEvent = {
                event: convertedEvent,
                volunteers: updatedVolunteers,
                jobs: jobs
            };
            setEvent(convertedDetailedManagedEvent);
        } catch (e) {
            console.error("Failed to fetch events:", e);
        }
    };

    useEffect(() => {
        console.debug('useEffect of ManagedEventViewer');
        fetchEvent();
    }, [eventIdParameter, teamIdParameter]);

    return (
        <>
            {event ?
                <ManagedEventViewerr
                    detailedEvent={event}
                    handleVolunteerAssignment={handleVolunteerAssignment}
                /> :
                <Text>Sumting went wong!</Text>
            }
        </>
    )
};