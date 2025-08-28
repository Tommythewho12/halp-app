import { Button, StyleSheet, Text, View } from 'react-native';

type Event = {
    id: string | string[] | null;
    name: string | null;
    startDatetime: string | null;
    description: string | null;
    teamId: number | null,
    isSubscribed: boolean,
    isAssigned: boolean,
    handleVolunteer: () => void
};

export default function EventViewer(event: Event) {

    return (
        <View>
            <Text>{event.name}</Text>
            <Text>{event.startDatetime}</Text>
            <Text>{event.description}</Text>
            {event.isSubscribed ? <Text>You are volunteering!</Text> : <Button title="Un-/Subscribe" onPress={event.handleVolunteer} />}
        </View>
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