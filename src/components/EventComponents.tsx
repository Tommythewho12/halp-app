import { Pressable, View, StyleSheet, Text, PressableProps, Animated } from "react-native";

import { Event } from "@/types";
import { H2, MyText } from "./Containers";


export function EventListItemComponent({ event, ...pressableProps }: { event: Event } & PressableProps) {
    return (
        <>
            <Pressable
                style={({ pressed }) => [
                    {
                        paddingBottom: 10,
                        alignItems: 'center'
                    },
                    pressed && styles.pressedItem,
                ]}
                {...pressableProps}>
                <View style={styles.container}>
                    <H2 numberOfLines={1}>{event.name}</H2>
                    <Text>{event.teamName}</Text>
                    <Text>{event.startDatetime.toLocaleTimeString()}</Text>
                </View>
            </Pressable>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        paddingTop: 0,
        paddingBottom: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 5,
        shadowOffset: { width: 5, height: 5 }
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