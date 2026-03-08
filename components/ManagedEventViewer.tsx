import { Button, Modal, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import http from '@/services/http-common';

import { LabelValue, H1, MyText, TopView, TitleAndId } from '@/components/basic/Containers'
import { DetailedManagedEvent, Job } from '@/types';
import VolunteerPicker from './VolunteerPicker';
import { useEvents } from '@/contexts/EventsContext';

export default function ManagedEventViewerr(
    {
        detailedEvent,
        handleVolunteerAssignment
    }: {
        detailedEvent: DetailedManagedEvent,
        handleVolunteerAssignment: (userId: string | null, jobId: string) => void
    }) {

    const { deleteEvent } = useEvents();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [jobId, setJobId] = useState<string | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

    const assignVolunteerToJob = (userId: string | null) => {
        if (jobId) {
            handleVolunteerAssignment(userId, jobId);
            http.patch(`auth/teams/${detailedEvent.event.teamId}/events/${detailedEvent.event.id}/jobs/${jobId}`, { volunteerId: userId })
                .then(response => {
                    console.debug('reassignment done')
                })
                .catch(e => console.error(e));
        } else
            console.error('userId and jobId should actually be existent!');
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
            <JobsList jobsList={detailedEvent.jobs} jobIdAssignment={(jobId) => setJobId(jobId)} modalVisibility={() => setModalVisible(true)} />
            <H1>Volunteers</H1>
            {detailedEvent.volunteers &&
                detailedEvent.volunteers.map(v =>
                    <Text key={v.id} style={v.assigned && { textDecorationLine: 'line-through' }}>{v.displayName}</Text>
                )
            }
            <H1>Bearbeiten</H1>
            <Button
                title='Veranstaltung löschen'
                color='#f00'
                onPress={() => setDeleteModalVisible(true)} />

            <Modal
                visible={deleteModalVisible}>
                <MyText>Veranstaltung wirklich löschen?</MyText>
                <Button
                    title='Ja, unwiederruflich löschen'
                    color='#f00'
                    onPress={handleDeleteEvent} />
                <Button
                    title='abbrechen'
                    color='#666'
                    onPress={() => setDeleteModalVisible(false)} />
            </Modal>
            <VolunteerPicker
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                assignVolunteerToJob={assignVolunteerToJob}
                volunteers={detailedEvent.volunteers.filter(v => !v.assigned)} />
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
                        <MyText style={{ flex: 1 }}>{job.userName} </MyText>
                        <Pressable style={{ flexShrink: 1 }} onPress={() => { jobIdAssignment(job.id); modalVisibility(); }}><Text>🪛</Text></Pressable>
                    </View>
                ))
            }
        </View>
    );
};