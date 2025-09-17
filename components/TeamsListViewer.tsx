import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { Team } from '@/types';

export default function TeamsListViewer({ teams }: { teams: Team[] }) {
    const handlePress = (teamId: string | undefined) => {
        if (teamId === undefined) {
            // TODO throw Exception?
            console.error('team does not have an ID and cannot be navigated to')
            return;
        }
        router.navigate({ pathname: '/(authenticated)/teams/[team]', params: { team: teamId } });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={teams}
                renderItem={({ item }) =>
                    <Pressable
                        style={({ pressed }) => [
                            styles.eventItem,
                            pressed && styles.pressedItem,
                        ]}
                        onPress={() => handlePress(item.id)}
                    >
                        <Text style={styles.item}>
                            {item.name} (id:{item.id})
                        </Text>
                        {item.is_subscribed ? <Text>Supporting</Text> : null}
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