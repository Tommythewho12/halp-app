import { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';

import { MyText } from './basic/Containers';

export default function ExperimentalView() {
    const [input, setInput] = useState('');

    // TODO improve KeyboardAvoidingView
    return (
        <KeyboardAvoidingView behavior='position'>
            <ScrollView>
                <MyText>fukc off</MyText>
                <TextInput
                    placeholder='moin'
                    keyboardType='default'
                    value={input}
                    onChangeText={setInput}
                />
                <MyText>fukc off</MyText>
                <TextInput
                    placeholder='moin'
                    keyboardType='default'
                    value={input}
                    onChangeText={setInput}
                />
                <MyText>fukc off</MyText>
                <TextInput
                    placeholder='moin'
                    keyboardType='default'
                    value={input}
                    onChangeText={setInput}
                />
                <MyText>fukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc off</MyText>
                <TextInput
                    placeholder='moin'
                    keyboardType='default'
                    value={input}
                    onChangeText={setInput}
                />

                <MyText>fukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc offfukc</MyText>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};