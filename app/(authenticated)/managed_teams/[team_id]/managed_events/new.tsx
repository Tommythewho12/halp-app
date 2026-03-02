import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import http from '@/services/http-common';
import { useEvents } from '@/contexts/EventsContext';
import { LabelDateEditor, LabelTimeEditor, LabelLongTextEditor, LabelShortTextEditor, TopView, LabelShortNumberEditor } from '@/components/basic/Containers';

export default function NewManagedEvent() {
    const { team_id } = useLocalSearchParams<{ team_id?: string }>();

    const { addEvent } = useEvents();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const date = new Date();
    date.setMinutes(0, 0, 0);
    const [startDatetime, setStartDatetime] = useState<Date>(date);
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [scorers, setScorers] = useState('0');
    const [officials, setOfficials] = useState('0');

    const handleCreateEvent = async () => {
        await http.post(`auth/teams/${team_id}/events`,
            {
                eventName: name,
                dateTime: (startDatetime.valueOf()) / 1000,
                description: description,
                jobs: {
                    scorer: Number.parseInt(scorers),
                    official: Number.parseInt(officials)
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
                    start_datetime: startDatetime,
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
        <TopView>
            <LabelShortTextEditor
                label='Event Name'
                value={name}
                onChangeText={setName} />

            <LabelDateEditor
                label='Date'
                value={startDatetime}
                openDateTimePicker={setDateChange} />

            <LabelTimeEditor
                label='Time'
                value={startDatetime}
                openDateTimePicker={setTimeChange} />

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

            <LabelLongTextEditor
                label='Description'
                value={description}
                onChangeText={setDescription} />

            <LabelShortNumberEditor
                label='Scorers'
                value={scorers}
                onChangeNumber={(v) => setScorers(sanitizeNumberInput(v))} />

            <LabelShortNumberEditor
                label='Officials'
                value={officials}
                onChangeNumber={(v) => setOfficials(sanitizeNumberInput(v))} />

            <Button onPress={handleCreateEvent} title='Create' />
        </TopView>
    )
}