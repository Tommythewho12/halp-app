import { Stack } from "expo-router";

import { useAuth } from "@/services/AuthContext";

export default function EventsLayout() {
    const { accessToken, isLoading } = useAuth();

    if (isLoading) {
        // TODO loading or splash screen
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='index'
                options={{
                    title: 'My Events'
                }}
            />
            <Stack.Screen
                name='[event]'
                options={{
                    title: 'event%'
                }}
            />
            <Stack.Screen
                name="new"
                options={{
                    title: 'Create new Event'
                }}
            />
        </Stack>
    );
}