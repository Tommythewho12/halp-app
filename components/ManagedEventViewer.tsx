import { Pressable, Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';

import styles from '../assets/styles'
import { LabelValue } from '@/components/basic/Containers'
import http from '@/services/http-common';
import { DetailedManagedEvent, Job } from '@/types';
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
            http.patch(`auth/teams/${event.team_id}/events/${event.id}/jobs/${jobId}`, { volunteerId: userId })
                .then(response => {
                    console.debug('reassignment done')
                })
                .catch(e => console.error(e));
        } else
            console.error('userId and jobId should actually be existent!');
    }

    return (
        <View style={{ backgroundColor: 'gray', flexDirection: 'column' }}>
            <Text style={styles.h1}>{event.name}</Text>
            <Text>Team Id</Text>
            <Text>{event.team_id}</Text>
            <Text>Description</Text>
            <Text>{event.description}</Text>
            <LabelValue label="Datum" value={event.start_datetime.toLocaleDateString()} />
            <LabelValue label="Uhrzeit" value={event.start_datetime.toLocaleTimeString()} />
            <LabelValue label="Einrichtung abgeschlossen" value={event.complete ? "✅" : "❌"} />
            <JobsList jobsList={event.jobs} />
            <Text>Jobs</Text>
            {event.jobs &&
                event.jobs.map(j => (
                    <View key={j.id}>
                        <Text>{j.jobName}</Text>
                        <Pressable onPress={() => {
                            setJobId(j.id);
                            setModalVisible(true);
                        }}>
                            <Text>Assign Volunteer</Text>
                            {j.userName ? <Text>{j.userName}</Text> : <Text>noone assigned</Text>}
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

function JobsList({ jobsList }: { jobsList: Job[] }) {
    return (
        <View>
            <Text style={styles.h1}>Jobs</Text>
            {
                jobsList && jobsList.map(job => (
                    <View key={job.id}>
                        <Text>{job.jobName}</Text>
                        <Text>{job.userName}</Text>
                    </View>
                ))
            }
        </View>
    );
};

const localStyles = StyleSheet.create({
    labelValue: {
        flexDirection: 'row'
    },
    labelValue_label: {

    }
})