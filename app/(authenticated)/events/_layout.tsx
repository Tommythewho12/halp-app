import { Tabs, Stack } from "expo-router";

import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "@/services/AuthContext";

export default function TabLayout() {
    const { accessToken, isLoading } = useAuth();

    if (isLoading) {
        // TODO loading or splash screen
    }

    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
                name="events/inquiring"
                options={{
                    title: "My Events",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={28} name={focused ? "calendar" : "calendar-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="events/index"
                options={{
                    title: "New Events",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={28} name={focused ? "people" : "people-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="[event]"
                options={{
                    href: null
                }}
            />
        </Tabs>
    );
}