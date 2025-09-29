import { Stack } from "expo-router";

import { useAuth } from "@/contexts/AuthContext";

export default function EventsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='index'
            />
            <Stack.Screen
                name='[event]'
            />
        </Stack>
    );
}