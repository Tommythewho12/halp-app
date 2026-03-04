import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View, Alert } from 'react-native';

import { EventListItemDto } from '@/types';
import { useState } from 'react';
import { TopView, H1, H2 } from './basic/Containers';
import { useUser } from '@/contexts/UsersContext';

export default function ManagedEventsListViewer({ events }: { events: EventListItemDto[] }) {
    const router = useRouter();
    const { id, name, email } = useUser();

    const handlePress = (eventId: string) => {
        router.navigate({ pathname: '/(authenticated)/events/[event]', params: { event: eventId } });
    }

    const orderByDatetimeDesc = (events: EventListItemDto[]) => {
        const newOrder = events.sort((a, b) => a.start_datetime.valueOf() - b.start_datetime.valueOf());
        return newOrder;
    };

    const [eventz, setEventz] = useState(orderByDatetimeDesc(events));

    // TODO pull up un-/volunteering handler here to update this view


    return (
        <TopView>
            <H1>Hi {name}</H1>
            <H2>Veranstaltungen</H2>
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
                        <Text>{new Date(item.start_datetime).toLocaleString()}</Text>
                        <Text>{item.start_datetime}</Text>
                        <Text>{item.description}</Text>
                        <Text>{item.is_subscribed ? "subscribed" : "not subscribed"}</Text>
                        <Text>{item.is_assigned ? "assigned" : "not assigned"}</Text>
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