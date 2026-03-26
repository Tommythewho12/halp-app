import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { Event } from '@/types';
import { TopView, H1, H2 } from '@/components/Containers';
import { useUser } from '@/contexts/UsersContext';

export default function OpenEventsView({ events }: { events: Event[] }) {
    const router = useRouter();
    const { id, name, email } = useUser();

    const handlePress = (eventId: string) => {
        router.navigate({ pathname: '/(authenticated)/events/[event_id]', params: { event_id: eventId } });
    }

    const orderByDatetimeDesc = (events: Event[]) => {
        const newOrder = events.sort((a, b) => a.startDatetime.valueOf() - b.startDatetime.valueOf());
        return newOrder;
    };

    // const [eventz, setEventz] = useState(orderByDatetimeDesc(events));
    const orderedEvents = orderByDatetimeDesc(events);

    // TODO pull up un-/volunteering handler here to update this view


    return (
        <TopView>
            <H1>Hi {name}</H1>
            <H2>Nicht angemeldete Veranstaltungen</H2>
            <FlatList
                data={orderedEvents}

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
                        <Text>{item.startDatetime.toLocaleString()}</Text>
                        <Text>{item.description}</Text>
                    </Pressable>
                }
            />
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