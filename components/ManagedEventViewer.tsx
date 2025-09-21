import { Text, View } from 'react-native';

import { DetailedManagedEvent, ManagedEvent } from '@/types';

export default function ManagedEventViewerr({ event }: { event: DetailedManagedEvent }) {
    const getDisplayName = (userId: string) => {
        return event.volunteers.find(u => u.id === userId)?.display_name;
    };

    return (
        <View>
            <Text>Event Name</Text>
            <Text>{event.name}</Text>
            <Text>Team Id</Text>
            <Text>{event.team_id}</Text>
            <Text>Description</Text>
            <Text>{event.description}</Text>
            <Text>Start Date Time</Text>
            <Text>{event.start_datetime}</Text>
            <Text>Completed?</Text>
            {event.complete ? <Text>Completed!</Text> : <Text>Incomplete</Text>}
            <Text>Jobs</Text>
            {event.jobs &&
                event.jobs.map(j => (
                    <Text id={j.id}>{j.type}</Text>
                ))
            }
            <Text>Volunteers</Text>
            {event.volunteers &&
                event.volunteers.map(v =>
                    <Text id={v.id}>{v.display_name}</Text>
                )
            }
        </View>
    );
};