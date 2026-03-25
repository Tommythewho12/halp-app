import { forwardRef } from 'react';
import { Text, View, StyleSheet, Pressable, TextProps, ViewProps, TextInput, Modal, Button, TextInputProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '@/assets/styles'

export function TopView(props: ViewProps) {
    return <SafeAreaView {...props} style={[{ padding: 10 }, props.style]} />
}

export function MyText(props: TextProps) {
    return <Text {...props} style={[globalStyles.baseText, props.style]} />
};

export function H1(props: TextProps) {
    return <Text {...props} style={[globalStyles.h1, props.style]} />
};

export function H2(props: TextProps) {
    return <Text {...props} style={[globalStyles.h2, props.style]} />
};

export function IdText(props: TextProps) {
    return <Text {...props} style={[{ fontStyle: 'italic', fontSize: 20, color: '#999' }, props.style]} />
};

export function TitleAndId(
    {
        title,
        id
    }: {
        title: string,
        id: string | number
    }) {

    return (
        <H1>{title} <IdText>ID:{id}</IdText></H1>
    )
};

export function LabelValue(
    {
        label,
        value
    }: {
        label: string,
        value: string
    }) {

    return (
        <View style={localStyles.container}>
            <MyText style={localStyles.label}>{label}</MyText>
            <MyText style={localStyles.value}>{value}</MyText>
        </View>
    );
};

export const MyTextInput = forwardRef<TextInput, TextInputProps>(({ ...props }, ref) => {
    return (
        <TextInput
            ref={ref}
            {...props}
            style={[localStyles.inputField, props.style]} />
    )
});

export const BaseTextInputWithLabel = forwardRef<TextInput, TextInputProps>(({ ...props }, ref) => {
    return (
        <>
            <MyText style={localStyles.label}>{props.placeholder}</MyText>
            <MyTextInput
                ref={ref}
                selectTextOnFocus={true}
                submitBehavior='submit'
                returnKeyType='next'
                placeholderTextColor='#888'
                {...props} />
        </>
    )
});

export const PasswordInputWithLabel = forwardRef<TextInput, TextInputProps>(({ ...props }, ref) => {
    return (
        <BaseTextInputWithLabel
            ref={ref}
            secureTextEntry
            placeholder='Password'
            {...props} />
    )
});

export const EmailInputWithLabel = forwardRef<TextInput, TextInputProps>(({ ...props }, ref) => {
    return (
        <BaseTextInputWithLabel
            ref={ref}
            inputMode='email'
            placeholder='Email'
            {...props} />
    )
});

export const ShortTextInputWithLabel = forwardRef<TextInput, TextInputProps>(({ ...props }, ref) => {
    return (
        <BaseTextInputWithLabel
            ref={ref}
            {...props} />
    )
});

export const MultilineTextInputWithLabel = forwardRef<TextInput, TextInputProps>(({ ...props }, ref) => {
    return (
        <BaseTextInputWithLabel
            ref={ref}
            multiline
            numberOfLines={4}
            {...props} />
    )
});

export const NumberInputWithLabel = forwardRef<TextInput, TextInputProps>(({ ...props }, ref) => {
    return (
        <BaseTextInputWithLabel
            ref={ref}
            inputMode='numeric'
            {...props} />
    )
});

// TODO rework?
export function LabelDateEditor(
    {
        label, value, openDateTimePicker
    }: {
        label: string,
        value: Date,
        openDateTimePicker: () => void
    }) {

    return (
        <>
            <MyText style={localStyles.label}>{label}</MyText>
            <MyText
                style={localStyles.inputField}
                onPress={openDateTimePicker}>
                {value.toLocaleDateString()}
            </MyText>
        </>
    )
};

// TODO rework?
export function LabelTimeEditor(
    {
        label, value, openDateTimePicker
    }: {
        label: string,
        value: Date,
        openDateTimePicker: () => void
    }) {

    return (
        <>
            <MyText style={localStyles.label}>{label}</MyText>
            <MyText
                style={localStyles.inputField}
                onPress={openDateTimePicker}>
                {value.toLocaleTimeString()}
            </MyText>
        </>
    )
};

export function ItemTitleAndAddButton(
    {
        title,
        addItemEvent
    }: {
        title: string,
        addItemEvent: () => void
    }) {

    return (
        <View style={{ flexDirection: 'row' }}>
            <H2 style={{ flex: 1, height: 'auto' }}>{title}</H2>
            <Pressable
                style={{ minWidth: 30, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}
                onPress={addItemEvent}>
                <View>
                    <Text style={{ fontWeight: '900', color: 'white' }}>+</Text>
                </View>
            </Pressable>
        </View>
    )
};

export function DeleteModal({ visible, handleConfirm, handleCancel, text }: { visible: boolean, handleConfirm: () => void, handleCancel: () => void, text: string }) {
    return (
        <Modal
            animationType='none'
            transparent={true}
            visible={visible}
            onRequestClose={handleCancel}>
            <Pressable style={{ height: '100%', backgroundColor: 'black', opacity: 0.5 }} onPress={handleCancel} />
            <View style={{ position: 'absolute', height: '100%', justifyContent: 'center' }}>
                <View style={{
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    paddingVertical: 15,
                    paddingHorizontal: 35,
                    alignItems: 'center',
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5
                }}>
                    <MyText style={{ margin: 20 }}>{text}</MyText>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                        <Button
                            title='Löschen'
                            color='#f00'
                            onPress={handleConfirm} />
                        <Button
                            title='Abbrechen'
                            color='#777'
                            onPress={handleCancel} />
                    </View>
                </View>
            </View>
        </Modal>
    )
};

export function ButtonDefault({ title, onPress }: { title: string, onPress: any }) {
    return <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            globalStyles.pressableButton,
            pressed && globalStyles.pressableButton_pressed
        ]}>
        <Text style={globalStyles.pressableButtonText}>{title}</Text>
    </Pressable>
};

export function ButtonInverted({ title, onPress }: { title: string, onPress: any }) {
    return <Pressable
        onPress={onPress}
        style={({ pressed }) => [
            globalStyles.pressableButtonInverted,
            pressed && globalStyles.pressableButtonInverted_pressed
        ]}>
        <Text style={globalStyles.pressableButtonInvertedText}>{title}</Text>
    </Pressable>
};

const localStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    label: {
        fontSize: 16
    },

    value: {
        flex: 3,
        fontSize: 20,
        fontWeight: 'bold'
    },

    inputField: {
        backgroundColor: '#fdfdfd',
        marginBottom: 5
    },

    simpleButton: {
        backgroundColor: 'green'
    }
});