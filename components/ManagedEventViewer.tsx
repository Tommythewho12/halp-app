import { Button, Modal, Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

import globalStyles from '../assets/styles'
import { LabelValue, H1, MyText, TopView, IdText, TitleAndId } from '@/components/basic/Containers'
import http from '@/services/http-common';
import { DetailedManagedEvent, Job } from '@/types';
import VolunteerPicker from './VolunteerPicker';
import { useEvents } from '@/contexts/EventsContext';

export default function ManagedEventViewerr(
    {
        event,
        handleVolunteerAssignment
    }: {
        event: DetailedManagedEvent,
        handleVolunteerAssignment: (userId: number | undefined, jobId: number) => void
    }) {

    const { deleteEvent } = useEvents();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [jobId, setJobId] = useState<number | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

    const assignVolunteerToJob = (userId: number | undefined) => {
        if (jobId) {
            handleVolunteerAssignment(userId, jobId);
            http.patch(`auth/teams/${event.teamId}/events/${event.id}/jobs/${jobId}`, { volunteerId: userId })
                .then(response => {
                    console.debug('reassignment done')
                })
                .catch(e => console.error(e));
        } else
            console.error('userId and jobId should actually be existent!');
    }

    const handleDeleteEvent = async () => {
        setDeleteModalVisible(false);
        await http.delete(`auth/teams/${event.teamId}/events/${event.id}`)
            .then(response => {
                deleteEvent(event.id);
            }).catch(e => {
                console.error(e);
            });
        router.back();
    }

    return (
        <TopView style={{ flexDirection: 'column' }}>
            <TitleAndId title={event.name} id={event.id} />
            <LabelValue label="Datum" value={event.startDatetime.toLocaleDateString()} />
            <LabelValue label="Uhrzeit" value={event.startDatetime.toLocaleTimeString()} />
            <LabelValue label="Einrichtung abgeschlossen" value={event.complete ? "✅" : "❌"} />
            <Text>Description</Text>
            <Text>{event.description}</Text>
            <JobsList jobsList={event.jobs} jobIdAssignment={(jobId) => setJobId(jobId)} modalVisibility={() => setModalVisible(true)} />
            <H1>Volunteers</H1>
            {event.volunteers &&
                event.volunteers.map(v =>
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
                volunteers={event.volunteers.filter(v => !v.assigned)} />
        </TopView>
    );
};

function JobsList({ jobsList, jobIdAssignment, modalVisibility }: { jobsList: Job[], jobIdAssignment: (jobId: number) => void, modalVisibility: () => void }) {
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