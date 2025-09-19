import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import http from '@/services/http-common';
import { useEvents } from '@/contexts/EventsContext';

export default function NewManagedEvent() {
    const { team_id } = useLocalSearchParams<{ team_id?: string }>();

    const { addEvent } = useEvents();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDatetime, setStartDatetime] = useState<Date>(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [cleaners, setCleaners] = useState('0');

    const handleCreateTeam = async () => {
        await http.post(`/auth/teams/${team_id}/events`,
            {
                eventName: name,
                dateTime: startDatetime.toString(),
                description: description,
                jobs: {
                    cleaner: Number.parseInt(cleaners)
                }
            })
            .then(response => {
                if (!team_id)
                    throw new Error('team_id must be available but was not');
                addEvent({
                    id: response.data.id,
                    team_id: team_id,
                    name: name,
                    description: description,
                    start_datetime: startDatetime.toString(),
                    complete: false
                });
            }).catch(e => {
                console.error(e);
            });
        router.back();
    };

    const handleDatetimeChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        const currentDate = selectedDate;
        setShow(false);
        if (currentDate) {
            setStartDatetime(currentDate);
        }
    };

    const setDateChange = () => {
        setMode('date');
        setShow(true);
    };

    const setTimeChange = () => {
        setMode('time');
        setShow(true);
    };

    const sanitizeNumberInput = (number: string) => {
        return number.replace(`/[^0-9]/g`, "");
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Event Name</Text>
            <TextInput
                placeholder='Event Name'
                keyboardType='default'
                value={name}
                onChangeText={setName}
            />
            <Text>Description</Text>
            <TextInput
                placeholder='Description'
                keyboardType='default'
                value={description}
                onChangeText={setDescription}
            />
            <Text>Start Date</Text>
            <Text onPress={setDateChange}>{startDatetime.toDateString()}</Text>

            <Text>Start Time</Text>
            <Text onPress={setTimeChange}>{startDatetime.toTimeString()}</Text>

            {show && (mode === 'date' ? (
                <DateTimePicker
                    testID='dateTimePicker'
                    value={startDatetime}
                    mode='date'
                    onChange={handleDatetimeChange} />
            ) : <DateTimePicker
                testID='dateTimePicker2'
                value={startDatetime}
                mode='time'
                is24Hour={true}
                onChange={handleDatetimeChange} />
            )}

            <Text>Cleaners</Text>
            <TextInput
                placeholder='0'
                keyboardType='number-pad'
                value={cleaners}
                onChangeText={(v) => setCleaners(sanitizeNumberInput(v))}
            />

            <Button onPress={handleCreateTeam} title='Create' />
        </View>
    )
}