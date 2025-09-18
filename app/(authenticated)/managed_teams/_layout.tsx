import { Stack } from 'expo-router';

export default function ManagedTeamsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='index'
                options={{
                    title: 'My Managed Teams'
                }}
            />
            <Stack.Screen
                name='new'
                options={{
                    title: 'Create new Team'
                }}
            />
            <Stack.Screen
                name='[id]'
                options={{
                    title: 'My Managed Team'
                }}
            />
        </Stack>
    );
}
