import { Text, View, StyleSheet, Pressable, TextProps, ViewProps } from 'react-native';

import globalStyles from '@/assets/styles'

export function TopView(props: ViewProps) {
    return <View {...props} style={[{ padding: 10 }, props.style]} />
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

export function LabelValueListSelector_WIP(
    {
        label, value, listItems
    }: {
        label: string,
        value: string,
        listItems: string[]
    }) {

    return (
        <View style={localStyles.container}>
            <Text style={localStyles.label}>{label}</Text>
            <Pressable onPress={() => {

            }}>
                <Text style={localStyles.value}>{value}</Text>
            </Pressable>
        </View>
    )
};

const localStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },

    label: {
        flex: 1,
        fontSize: 16
    },

    value: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold'
    }
})