import React, { useRef, useState } from "react";
import { Button, TextInput } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { LabelDateEditor, LabelTimeEditor, MultilineTextInputWithLabel, NumberInputWithLabel, ShortTextInputWithLabel, TopView } from '@/components/Containers';
import { DetailedManagedEventCreator, Event, } from '@/types';
import { sanitizeNumberInput } from "@/utils/Utils";


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

    const scorersRef = useRef<TextInput | null>(null);
    const officialsRef = useRef<TextInput | null>(null);

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
        // TODO validate input first!

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
            <ShortTextInputWithLabel
                placeholder="Event Name"
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

            <MultilineTextInputWithLabel
                placeholder='Description'
                value={description}
                onChangeText={setDescription}
                onSubmitEditing={() => scorersRef.current?.focus()} />
            <NumberInputWithLabel
                ref={scorersRef}
                placeholder='Scorers'
                value={scorers}
                onChangeText={(v) => setScorers(sanitizeNumberInput(v))}
                onSubmitEditing={() => officialsRef.current?.focus()} />
            <NumberInputWithLabel
                ref={officialsRef}
                placeholder='Officials'
                value={officials}
                onChangeText={(v) => setOfficials(sanitizeNumberInput(v))}
                onSubmitEditing={handleCreateEvent}
                returnKeyType='send' />

            <Button onPress={handleCreateEvent} title='Create' />
        </TopView>
    )
}