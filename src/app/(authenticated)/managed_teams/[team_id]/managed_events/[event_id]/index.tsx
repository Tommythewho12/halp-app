import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { useEffect, useState } from 'react';

import http from '@/services/http-common';
import ManagedEventView from '@/views/ManagedEventView';
import { DetailedManagedEventDto, DetailedManagedEvent, Event, Job, Volunteer } from '@/types';
import { is2XXStatus, safeBooleanConverter } from '@/utils/Utils';

export default function ManagedEventController() {
    const { team_id: teamIdParameter, event_id: eventIdParameter } = useLocalSearchParams<{ team_id?: string, event_id?: string }>();
    const [event, setEvent] = useState<DetailedManagedEvent | null>(null);

    const handleVolunteerAssignment = async (newUserId: string | null, jobId: string) => {
        if (event != null) {
            const response = await http.patch(`auth/teams/${teamIdParameter}/events/${eventIdParameter}/jobs/${jobId}`, { volunteerId: newUserId });
            if (is2XXStatus(response.status)) {
                setEvent(prev => {
                    if (!prev) return prev;

                    const newJobs = new Map<String, Job>();
                    prev.jobs.forEach((value, key) => newJobs.set(key, key != jobId ? { ...value } : { ...value, userId: newUserId }));

                    const prevUserId = prev.jobs.get(jobId)?.userId;

                    const newVolunteers = new Map<String, Volunteer>();
                    prev.volunteers.forEach((value, key) => {
                        if (key == newUserId)
                            newVolunteers.set(key, { ...value, assigned: true })
                        else if (key == prevUserId)
                            newVolunteers.set(key, { ...value, assigned: false })
                        else
                            newVolunteers.set(key, { ...value })
                    });

                    return { ...prev, jobs: newJobs, volunteers: newVolunteers }
                });
            } else {
                console.error('process failed with status: ', response.status);
                return false;
            }
        }
    };

    const fetchEvent = async () => {
        if (eventIdParameter === undefined || teamIdParameter === undefined) {
            throw new Error("both team_id and event_id parameters must be set");
        }

        try {
            const response = await http.get<DetailedManagedEventDto>(`auth/teams/${teamIdParameter}/events/${eventIdParameter}`);
            const volunteerss = new Map<String, Volunteer>();
            const jobss = new Map<String, Job>();
            response.data.volunteers.forEach(volunteer => {
                volunteerss.set(String(volunteer.id), { id: String(volunteer.id), displayName: volunteer.display_name, assigned: false });
            });
            response.data.jobs.forEach(job => {
                jobss.set(String(job.id), { id: String(job.id), jobName: job.type, userId: String(job.user_id) });
                const assignedVolunteer = volunteerss.get(String(job.user_id))
                if (assignedVolunteer != undefined) {
                    assignedVolunteer.assigned = true;
                }
            });

            const convertedEvent: Event = {
                id: String(response.data.id),
                teamId: String(response.data.team_id),
                name: response.data.name,
                description: response.data.description,
                startDatetime: new Date(response.data.start_datetime * 1000),
                setupComplete: safeBooleanConverter(response.data.complete),
                isVolunteering: false,
                isAssigned: false
            }

            const convertedDetailedManagedEventt: DetailedManagedEvent = {
                event: convertedEvent,
                volunteers: volunteerss,
                jobs: jobss
            };
            setEvent(convertedDetailedManagedEventt);
        } catch (e) {
            console.error("Failed to fetch events:", e);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    return (
        <>
            {event ?
                <ManagedEventView
                    detailedEvent={event}
                    handleVolunteerAssignment={handleVolunteerAssignment}
                /> :
                <Text>Sumting went wong!</Text>
            }
        </>
    )
};