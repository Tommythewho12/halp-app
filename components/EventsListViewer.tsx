import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View, Alert } from 'react-native';

type EventsList = {
    events: Event[];
}

type Event = {
    id: string;
    name: string;
    start_datetime: string;
    description: string;
    team_id: number,
    is_subscribed: boolean,
    is_assigned: boolean
};

export default function EventsListViewer({ events }: EventsList) {
    const router = useRouter();
    const handlePress = (eventId: string) => {
        router.navigate({ pathname: '/(tab)/events/[event]', params: { event: eventId } });
    }

    // TODO pull up un-/volunteering handler here to update this view

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                renderItem={({ item }) =>
                    <Pressable
                        style={({ pressed }) => [
                            styles.eventItem,
                            pressed && styles.pressedItem,
                        ]}
                        onPress={() => handlePress(item.id)}
                    >
                        <Text style={styles.item}>
                            {item.name}
                        </Text>
                        <Text>{item.start_datetime}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.is_subscribed ? "subscribed" : "not subscribed"}</Text>
                        <Text>{item.is_assigned ? "assigned" : "not assigned"}</Text>
                    </Pressable>
                }
            />
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