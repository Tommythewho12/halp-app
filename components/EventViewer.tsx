import { Button, StyleSheet, Text, View } from 'react-native';

type Event = {
    id: string | string[] | null;
    name: string | null;
    start_datetime: string | null;
    description: string | null;
    team_id: number | null,
    isUserVolunteer: boolean,
    handleVolunteer: () => void
};

export default function EventViewer(event: Event) {

    return (
        <View>
            <Text>{event.name}</Text>
            <Text>{event.start_datetime}</Text>
            <Text>{event.description}</Text>
            {event.isUserVolunteer && <Text>You are volunteering!</Text>}
            <Button title="Un-/Subscribe" onPress={event.handleVolunteer} />
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