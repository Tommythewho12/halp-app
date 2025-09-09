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
                name="all_teams"
                options={{
                    title: "Alle Teams",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={28} name={focused ? "calendar" : "calendar-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="subbed_teams"
                options={{
                    title: "Subbed Teams",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons size={28} name={focused ? "people" : "people-outline"} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="[team]"
                options={{
                    href: null
                }}
            />
        </Tabs>
    );
}