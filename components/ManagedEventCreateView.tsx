import React, { useState } from "react";
import { Button } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { LabelDateEditor, LabelLongTextEditor, LabelShortNumberEditor, LabelShortTextEditor, LabelTimeEditor, TopView } from "./basic/Containers";
import { sanitizeNumberInput } from "./basic/Utils";
import { DetailedManagedEventCreator, Event, } from '@/types';


export default function ManagedEventCreateView({ submitNewEvent }: { submitNewEvent: (event: DetailedManagedEventCreator) => Promise<void> }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [scorers, setScorers] = useState('0');
    const [officials, setOfficials] = useState('0');
    const initialDate = new Date();
    initialDate.setMinutes(0, 0, 0);
    const [startDatetime, setStartDatetime] = useState<Date>(initialDate);

    const [showModal, setShowModal] = useState(false);
    const [datetimeMode, setDatetimeMode] = useState('date');

    const showDateTimePicker = (mode: string) => {
        setDatetimeMode(mode);
        setShowModal(true);
    }

    const handleDatetimeChange = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
        setShowModal(false);
        if (selectedDate)
            setStartDatetime(selectedDate);
    };

    const handleCreateEvent = () => {
        const newEvent: Event = {
            id: '',
            teamId: '',
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
        submitNewEvent(newManagedEvent);

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
                openDateTimePicker={() => showDateTimePicker('date')} />

            <LabelTimeEditor
                label='Time'
                value={startDatetime}
                openDateTimePicker={() => showDateTimePicker('time')} />

            {showModal && (datetimeMode === 'date' ? (
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