import { Button, Text } from 'react-native';

import { LabelValue, TitleAndId, TopView } from './basic/Containers';
import { DetailedEvent } from '@/types';

export default function EventView({
    detailedEvent,
    volunteerToEvent,
    unvolunteerFromEvent
}: {
    detailedEvent: DetailedEvent,
    volunteerToEvent: (id: string) => Promise<boolean>,
    unvolunteerFromEvent: (id: string) => Promise<boolean>
}) {

    return (
        <TopView>
            <TitleAndId title={detailedEvent.event.name} id={detailedEvent.event.id} />
            <LabelValue label='Datum' value={detailedEvent.event.startDatetime.toLocaleDateString()} />
            <LabelValue label='Uhrzeit' value={detailedEvent.event.startDatetime.toLocaleTimeString()} />
            <Text>Description</Text>
            <Text>{detailedEvent.event.description}</Text>
            {!detailedEvent.event.isAssigned ? (
                detailedEvent.event.isVolunteering ? (
                    <Button title='Withdraw from event!' onPress={() => unvolunteerFromEvent(detailedEvent.event.id)} />
                ) : (
                    <Button title='Sign up as a volunteer' onPress={() => volunteerToEvent(detailedEvent.event.id)} />
                )
            ) : (
                <Button title='Withdraw from event!' disabled />
            )}
        </TopView>
    );
};