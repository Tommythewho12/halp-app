import { FlatList, Pressable, StyleSheet, Text, View, Alert } from 'react-native';

type EventsList = {
    events: Event[];
}

type Event = {
    id: number;
    name: string;
    start_datetime: string;
    description: string;
    team_id: number
};

export default function EventsListViewer( {events}: EventsList ) {
    const handlePress = (event: Event) => {
        Alert.alert('Event selected', `${event.name}`);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                renderItem={({item}) => 
                    <Pressable
                        style={({ pressed }) => [
                            styles.eventItem,
                            pressed && styles.pressedItem,
                        ]}
                        onPress={() => handlePress(item)}
                    >
                        <Text style={styles.item}>
                            {item.name}
                        </Text>
                        <Text>{item.start_datetime}</Text>
                        <Text>{item.description}</Text>
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