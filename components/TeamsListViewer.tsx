import { FlatList, Pressable, StyleSheet, Text, View, Alert } from 'react-native';

type TeamsList = {
    teams: Team[];
}

type Team = {
    name: string;
};

export default function TeamsListViewer( {teams}: TeamsList ) {
    const handlePress = (teams: Team) => {
        Alert.alert('Event selected', `${teams.name}`);
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={teams}
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