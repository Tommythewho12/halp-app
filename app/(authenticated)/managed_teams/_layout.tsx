import { Stack } from 'expo-router';

export default function ManagedTeamsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='index'
            />
            <Stack.Screen
                name='new'
            />
            <Stack.Screen
                name='[team_id]/index'
            />
            <Stack.Screen
                name='[team_id]/managed_events/[event_id]/index'
            />
        </Stack>
    );
}
