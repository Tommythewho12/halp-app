import { useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';

import { ButtonDefault, ButtonInverted, EmailInputWithLabel, PasswordInputWithLabel, ShortTextInputWithLabel, TopView } from '@/components/Containers';
import AppPresentationView from './AppPresentationView';

export default function RegisterView(
    {
        handleRegistration
    }: {
        handleRegistration: (name: string, email: string, password: string) => Promise<boolean>
    }) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

    const emailRef = useRef<TextInput | null>(null);
    const passRef = useRef<TextInput | null>(null);
    const passConfirmRef = useRef<TextInput | null>(null);

    const submitRegistration = () => {
        handleRegistration(name, email, password);
    };

    return (
        <TopView>
            <KeyboardAvoidingView behavior='position'>
                <ScrollView>
                    <AppPresentationView />
                    <ShortTextInputWithLabel
                        placeholder='Name'
                        value={name}
                        onChangeText={setName}
                        onSubmitEditing={() => emailRef.current?.focus()} />
                    <EmailInputWithLabel
                        ref={emailRef}
                        value={email}
                        onChangeText={setEmail}
                        onSubmitEditing={() => passRef.current?.focus()} />
                    <PasswordInputWithLabel
                        ref={passRef}
                        value={password}
                        onChangeText={setPassword}
                        onSubmitEditing={() => passConfirmRef.current?.focus()} />
                    <PasswordInputWithLabel
                        ref={passConfirmRef}
                        value={passwordConfirmation}
                        onChangeText={setPasswordConfirmation}
                        onSubmitEditing={submitRegistration}
                        returnKeyType='send' />
                    <ButtonDefault
                        title='Registrieren'
                        onPress={submitRegistration} />
                    <ButtonInverted
                        title='Zurück zur Anmeldung'
                        onPress={() => router.back()} />
                </ScrollView>
            </KeyboardAvoidingView>
        </TopView>
    );
}