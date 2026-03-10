import { Button, StyleSheet, Text, View } from 'react-native';

import { H1, LabelValue, TitleAndId, TopView } from './basic/Containers';
import { Event } from '@/types';
import { useEvents } from '@/contexts/EventsContext';

export default function EventViewer({ event }: { event: Event }) {
    const { volunteerToEvent, unvolunteerFromEvent } = useEvents();

    return (
        <TopView>
            <TitleAndId title={event.name} id={event.id} />
            <LabelValue label='Datum' value={event.startDatetime.toLocaleDateString()} />
            <LabelValue label='Uhrzeit' value={event.startDatetime.toLocaleTimeString()} />
            <Text>Description</Text>
            <Text>{event.description}</Text>
            {event.isVolunteering ? (
                <Button title="Withdraw from event!" onPress={() => unvolunteerFromEvent(event.id)} />
            ) : (
                <Button title="Sign up as a volunteer" onPress={() => volunteerToEvent(event.id)} />
            )}
        </TopView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    eventItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        elevation: 2,
    },
    pressedItem: {
        backgroundColor: '#d0e0ff',
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    eventDetail: {
        fontSize: 14,
        color: '#555',
    },
});