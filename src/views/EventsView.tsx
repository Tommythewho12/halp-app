import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

import { Event } from '@/types';
import { useUser } from '@/contexts/UserContext';
import { H1, H2, MyText, TopView } from '@/components/Containers';
import { EventListItemComponent } from '@/components/EventComponents';
import { useEffect, useState } from 'react';

export default function EventsView({ events }: { events: Event[] }) {
    const router = useRouter();
    const userCtx = useUser();
    const [userName, setUserName] = useState<string | undefined>(undefined);

    const handlePress = (eventId: string) => {
        router.navigate({ pathname: '/(authenticated)/events/[event_id]', params: { event_id: eventId } });
    }

    const orderByDatetimeDesc = (events: Event[]) => {
        const newOrder = events.sort((a, b) => a.startDatetime.valueOf() - b.startDatetime.valueOf());
        return newOrder;
    };

    useEffect(() => {
        if (!userCtx || userCtx.isLoading) return;

        setUserName(userCtx.user?.name);
    }, [userCtx]);

    return (
        <TopView>
            <H1>Hi {userName}</H1>
            <MyText>Meine angemeldeten Veranstaltungen</MyText>
            <FlatList
                data={orderByDatetimeDesc(events)}
                renderItem={({ item }) =>
                    <EventListItemComponent
                        event={item}
                        onPress={() => handlePress(item.id)} />
                }
            />
        </TopView>
    );
};