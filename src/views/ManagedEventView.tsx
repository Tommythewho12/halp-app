import { useState } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import http from '@/services/http-common';

import { LabelValue, H1, MyText, TopView, TitleAndId, DeleteModal } from '@/components/Containers'
import { DetailedManagedEvent, Volunteer, Job } from '@/types';
import { useEvents } from '@/contexts/EventsContext';
import VolunteerPicker from '@/components/VolunteerPicker';

export default function ManagedEventView(
    {
        detailedEvent,
        handleVolunteerAssignment
    }: {
        detailedEvent: DetailedManagedEvent,
        handleVolunteerAssignment: (newUserId: string | null, jobId: string) => void
    }) {

    const { deleteEvent } = useEvents();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

    const jobsList: JobWithVolunteerName[] = [...detailedEvent.jobs].map(([id, job]) => {
        let volunteerName = "unassigned";
        if (job.userId)
            volunteerName = detailedEvent.volunteers.get(job.userId)?.displayName ?? "unassigned";
        return { job, volunteerName: volunteerName };
    });
    const volunteerList: Volunteer[] = [...detailedEvent.volunteers.values()];

    const assignVolunteerToJob = (newUserId: string | null) => {
        if (selectedJobId) {
            handleVolunteerAssignment(newUserId, selectedJobId);
        } else
            console.error('jobId must be defined');
    }

    const handleDeleteEvent = async () => {
        setDeleteModalVisible(false);
        await http.delete(`auth/teams/${detailedEvent.event.teamId}/events/${detailedEvent.event.id}`)
            .then(response => {
                deleteEvent(detailedEvent.event.id);
                console.debug('event deleted');
            }).catch(e => {
                console.error(e);
            });
        router.back();
    }

    return (
        <TopView style={{ flexDirection: 'column' }}>
            <TitleAndId title={detailedEvent.event.name} id={detailedEvent.event.id} />
            <LabelValue label="Datum" value={detailedEvent.event.startDatetime.toLocaleDateString()} />
            <LabelValue label="Uhrzeit" value={detailedEvent.event.startDatetime.toLocaleTimeString()} />
            <LabelValue label="Einrichtung abgeschlossen" value={detailedEvent.event.setupComplete ? "✅" : "❌"} />
            <Text>Description</Text>
            <Text>{detailedEvent.event.description}</Text>
            <JobsList jobsList={jobsList} setJobId={(jobId) => setSelectedJobId(jobId)} modalVisibility={() => setModalVisible(true)} />
            <H1>Volunteers</H1>
            {volunteerList &&
                volunteerList.map(v =>
                    <Text key={v.id} style={v.assigned && { textDecorationLine: 'line-through', color: '#999' }}>{v.displayName}</Text>
                )
            }
            <H1>Bearbeiten</H1>
            <Button
                title='Veranstaltung löschen'
                color='#f00'
                onPress={() => setDeleteModalVisible(true)} />

            <DeleteModal
                visible={deleteModalVisible}
                handleConfirm={handleDeleteEvent}
                handleCancel={() => setDeleteModalVisible(false)}
                text='Soll das Event wirklich unwiederruflich gelöscht werden?' />
            <VolunteerPicker
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                assignVolunteerToJob={assignVolunteerToJob}
                volunteers={volunteerList.filter(v => !v.assigned)} />
        </TopView>
    );
};

interface JobWithVolunteerName {
    job: Job,
    volunteerName: String
}

function JobsList({ jobsList, setJobId, modalVisibility }: { jobsList: JobWithVolunteerName[], setJobId: (jobId: string) => void, modalVisibility: () => void }) {
    return (
        <View>
            <H1>Jobs</H1>
            {
                jobsList && jobsList.map(job => (
                    <View key={job.job.id} style={{ flexDirection: 'row' }}>
                        <MyText style={{ flexShrink: 1 }}>{job.job.jobName} </MyText>
                        <MyText style={{ flex: 1 }}>{job.volunteerName} </MyText>
                        <Pressable style={{ flexShrink: 1 }} onPress={() => { setJobId(job.job.id); modalVisibility(); }}><Text>🪛</Text></Pressable>
                    </View>
                ))
            }
        </View>
    );
};