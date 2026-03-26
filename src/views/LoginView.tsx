import { useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';

import { ButtonDefault, ButtonInverted, PasswordInputWithLabel, EmailInputWithLabel } from '@/components/Containers';
import AppPresentationView from './AppPresentationView';

export default function LoginView(
    {
        handleLogin
    }: {
        handleLogin: (email: string, password: string) => Promise<void>
    }) {
    const [email, setEmail] = useState('tommythewho12@googlemail.com');
    const [password, setPassword] = useState('p');
    const inputRef = useRef<TextInput | null>(null);

    const submitLogin = () => {
        handleLogin(email, password)
    };

    return (
        <KeyboardAvoidingView behavior='position'>
            <ScrollView>
                <AppPresentationView />
                <EmailInputWithLabel
                    value={email}
                    onChangeText={setEmail}
                    onSubmitEditing={() => inputRef.current?.focus()} />
                <PasswordInputWithLabel
                    ref={inputRef}
                    value={password}
                    onChangeText={setPassword}
                    onSubmitEditing={submitLogin}
                    returnKeyType='send' />

                <ButtonDefault
                    onPress={submitLogin}
                    title='Anmelden' />

                <ButtonInverted
                    onPress={() => router.navigate(`/registration`)}
                    title='Noch nicht registriert?' />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}