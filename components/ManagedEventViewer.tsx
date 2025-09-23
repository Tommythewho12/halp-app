import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';

import http from '@/services/http-common';
import { DetailedManagedEvent, } from '@/types';
import VolunteerPicker from './VolunteerPicker';

export default function ManagedEventViewerr(
    {
        event,
        handleVolunteerAssignment
    }: {
        event: DetailedManagedEvent,
        handleVolunteerAssignment: (userId: string | null, jobId: string) => void
    }) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [jobId, setJobId] = useState<string | null>(null);

    const assignVolunteerToJob = (userId: string | null) => {
        if (jobId) {
            handleVolunteerAssignment(userId, jobId);
            http.patch(`/auth/teams/${event.team_id}/events/${event.id}/jobs/${jobId}`, { volunteerId: userId })
                .then(response => {
                    console.debug('reassignment done')
                })
                .catch(e => console.error(e));
        } else
            console.error('userId and jobId should actually be existent!');
    }

    const getDisplayName = (userId: string) => {
        const r = event.volunteers.find(u => u.id === userId);
        if (r)
            return r.display_name;
        console.error('userId should actually be existent!');
        return `user ID: ${userId}`;
    };

    return (
        <View>
            <Text>Event Name</Text>
            <Text>{event.name}</Text>
            <Text>Team Id</Text>
            <Text>{event.team_id}</Text>
            <Text>Description</Text>
            <Text>{event.description}</Text>
            <Text>Start Date Time</Text>
            <Text>{event.start_datetime}</Text>
            <Text>Completed</Text>
            {event.complete ? <Text>Completed!</Text> : <Text>Incomplete</Text>}
            <Text>Jobs</Text>
            {event.jobs &&
                event.jobs.map(j => (
                    <View key={j.id}>
                        <Text>{j.type}</Text>
                        <Pressable onPress={() => {
                            setJobId(j.id);
                            setModalVisible(true);
                        }}>
                            <Text>Assign Volunteer</Text>
                            {j.user_id ? <Text>{getDisplayName(j.user_id)}</Text> : <Text>noone assigned</Text>}
                        </Pressable>
                    </View>
                ))
            }
            <Text>Volunteers</Text>
            {event.volunteers &&
                event.volunteers.map(v =>
                    <Text key={v.id}>{v.display_name}</Text>
                )
            }
            <VolunteerPicker
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                assignVolunteerToJob={assignVolunteerToJob}
                volunteers={event.volunteers} />
        </View>
    );
};