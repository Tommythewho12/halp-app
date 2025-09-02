import { Button, StyleSheet, Text, View } from 'react-native';

type Team = {
    id: string | string[] | null,
    name: string | null,
    isSubscribed: boolean,
    isAdmin: boolean,
    handleSubscribe: () => void,
    handleUnsubscribe: () => void
};

export default function TeamViewer(team: Team) {

    return (
        <View>
            <Text>{team.name}</Text>
            {team.isSubscribed ? <Button title="Unsubscribe from team!" onPress={team.handleUnsubscribe} /> : <Button title="Subscribe to team" onPress={team.handleSubscribe} />}
            {team.isAdmin && <Text>You are the admin of this team!</Text>}
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