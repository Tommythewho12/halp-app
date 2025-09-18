import { Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { ManagedTeam } from '@/types';

export default function ManagedTeamViewer(team: ManagedTeam) {

    const handleOpenManagedEvent = (eventId: string) => {
        router.navigate({ pathname: '/(authenticated)/managed_teams/[id]/managed_events/[id]', params: { id: eventId } });
    };

    const handleCreateNewManagedEvent = () => {
        router.navigate({ pathname: '/(authenticated)/managed_teams/new' });
    };

    return (
        <View>
            <Text>Team Name</Text>
            <Text>{team.name}</Text>
            <Text>Events</Text>
            <Button
                onPress={handleCreateNewManagedEvent}
                title='Create new Event' />
            <FlatList
                data={team.events}
                renderItem={({ item }) =>
                    <Pressable onPress={() => handleOpenManagedEvent(item.id)}>
                        <Text>{item.name}</Text>
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