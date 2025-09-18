import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function ManagedEventViewer() {
    const searchParams = useLocalSearchParams();
    const eventId = searchParams.id;

    return (
        <Text>This is a text inside Managed Event Viewer! ID: {eventId}</Text>
    )
};