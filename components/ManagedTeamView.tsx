import { FlatList, Pressable, StyleSheet, Text, Button, Modal } from 'react-native';
import { router } from 'expo-router';

import { Team, Event } from '@/types';
import { TopView, H1, IdText, H2, ItemTitleAndAddButton, MyText, DeleteModal } from './basic/Containers';
import { useState } from 'react';
import { useTeams } from '@/contexts/TeamsContext';
import http from '@/services/http-common';

export default function ManagedTeamView({ team, events }: { team: Team, events: Event[] }) {

    const { deleteManagedTeam } = useTeams();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const handleOpenManagedEvent = (eventId: string) => {
        router.navigate({ pathname: `/(authenticated)/managed_teams/[team_id]/managed_events/[event_id]`, params: { team_id: team.id, event_id: eventId } });
    };

    const handleCreateNewManagedEvent = () => {
        router.navigate({ pathname: `/(authenticated)/managed_teams/[team_id]/managed_events/new`, params: { team_id: team.id } });
    };

    const handleDeleteTeam = async () => {
        setDeleteModalVisible(false);
        await http.delete(`auth/teams/${team.id}`)
            .then(response => {
                deleteManagedTeam(team.id);
            }).catch(e => {
                console.error(e);
            });
        router.back();
    }

    return (
        <TopView>
            <H1>{team.name} <IdText>ID:{team.id}</IdText></H1>
            <ItemTitleAndAddButton title='Veranstaltungen' addItemEvent={handleCreateNewManagedEvent} />
            <FlatList
                data={events}
                renderItem={({ item }) =>
                    <Pressable
                        style={({ pressed }) => [
                            styles.eventItem,
                            pressed && styles.pressedItem,
                        ]}
                        onPress={() => handleOpenManagedEvent(item.id)}
                    >
                        <Text style={styles.item}>
                            {item.name}
                        </Text>
                    </Pressable>
                }
            />
            <H2>Bearbeiten</H2>
            <Button
                title='Team löschen'
                color='red'
                onPress={() => setDeleteModalVisible(true)} />

            <DeleteModal
                visible={deleteModalVisible}
                handleConfirm={handleDeleteTeam}
                handleCancel={() => setDeleteModalVisible(false)}
                text='Soll das Team wirklich unwiederruflich gelöscht werden?' />
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