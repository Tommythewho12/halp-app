import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useEvents } from '@/contexts/EventsContext';
import { LabelDateEditor, LabelTimeEditor, LabelLongTextEditor, LabelShortTextEditor, TopView, LabelShortNumberEditor } from '@/components/basic/Containers';
import { DetailedManagedEventCreator, Event, } from '@/types';
import { isNumber } from '@/components/basic/Utils';

export default function NewManagedEventController() {
    const { team_id } = useLocalSearchParams<{ team_id?: string }>();

    const { addEvent } = useEvents();
    const [teamId, setTeamId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const date = new Date();
    date.setMinutes(0, 0, 0);
    const [startDatetime, setStartDatetime] = useState<Date>(date);
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [scorers, setScorers] = useState('0');
    const [officials, setOfficials] = useState('0');

    // validate team_id parameter on view load
    useEffect(() => {
        if (team_id === undefined) {
            throw new Error('team_id parameter must be defined');
        } else {
            setTeamId(team_id);
        }
    }, [team_id]);

    const handleCreateEvent = async () => {
        const newEvent: Event = {
            id: '',
            teamId: teamId,
            name: name,
            description: description,
            startDatetime: startDatetime,
            setupComplete: false,
            isAssigned: false,
            isVolunteering: false
        };
        const newManagedEvent: DetailedManagedEventCreator = {
            event: newEvent,
            scorers: parseInt(scorers),
            officials: parseInt(officials)
        };
        const response: boolean = await addEvent(newManagedEvent);
        if (response) {
            router.back();
        }
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
        let newNumber: string = number.replace(`/[^0-9]/g`, '');
        if (isNumber(newNumber))
            return newNumber
        else
            return '0'
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