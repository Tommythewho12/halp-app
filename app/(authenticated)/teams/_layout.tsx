import { Stack } from "expo-router";

import { useAuth } from "@/contexts/AuthContext";

export default function TeamsLayout() {
    const { isLoading } = useAuth();

    if (isLoading) {
        // TODO loading or splash screen
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='index'
                options={{
                    title: 'All Teams'
                }}
            />
            <Stack.Screen
                name='[team]'
                options={{
                    title: 'event%'
                }}
            />
        </Stack>
    );
}