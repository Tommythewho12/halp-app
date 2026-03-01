import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';

import globalStyles from '../assets/styles'
import { LabelValue, H1, MyText, TopView } from '@/components/basic/Containers'
import http from '@/services/http-common';
import { DetailedManagedEvent, Job } from '@/types';
import VolunteerPicker from './VolunteerPicker';

export default function ManagedEventViewerr(
    {
        event,
        handleVolunteerAssignment
    }: {
        event: DetailedManagedEvent,
        handleVolunteerAssignment: (userId: string | undefined, jobId: string) => void
    }) {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [jobId, setJobId] = useState<string | null>(null);

    const assignVolunteerToJob = (userId: string | undefined) => {
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
        <TopView style={{ flexDirection: 'column' }}>
            <H1 style={globalStyles.h1}>{event.name} <Text style={{ fontStyle: 'italic', fontSize: 20, color: '#999' }}>ID:{event.team_id}</Text></H1>
            <Text>Description</Text>
            <Text>{event.description}</Text>
            <LabelValue label="Datum" value={event.start_datetime.toLocaleDateString()} />
            <LabelValue label="Uhrzeit" value={event.start_datetime.toLocaleTimeString()} />
            <LabelValue label="Einrichtung abgeschlossen" value={event.complete ? "✅" : "❌"} />
            <JobsList jobsList={event.jobs} jobIdAssignment={(jobId) => setJobId(jobId)} modalVisibility={() => setModalVisible(true)} />
            <Text>Volunteers</Text>
            {event.volunteers &&
                event.volunteers.map(v =>
                    <Text key={v.id} style={v.assigned && { textDecorationLine: 'line-through' }}>{v.displayName}</Text>
                )
            }
            <VolunteerPicker
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                assignVolunteerToJob={assignVolunteerToJob}
                volunteers={event.volunteers.filter(v => !v.assigned)} />
        </TopView>
    );
};

function JobsList({ jobsList, jobIdAssignment, modalVisibility }: { jobsList: Job[], jobIdAssignment: (jobId: string) => void, modalVisibility: () => void }) {
    return (
        <View>
            <H1>Jobs</H1>
            {
                jobsList && jobsList.map(job => (
                    <View key={job.id} style={{ flexDirection: 'row' }}>
                        <MyText style={{ flexShrink: 1 }}>{job.jobName} </MyText>
                        <MyText style={{ flex: 1, backgroundColor: 'red' }}>{job.userName} </MyText>
                        <Pressable style={{ flexShrink: 1 }} onPress={() => { jobIdAssignment(job.id); modalVisibility(); }}><Text>🪛</Text></Pressable>
                    </View>
                ))
            }
        </View>
    );
};