import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

import { ButtonDefault, ButtonInverted, LabelPasswordEditor, LabelShortTextEditor, TopView } from './basic/Containers';
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

    const submitRegistration = () => {
        handleRegistration(name, email, password);
    };

    return (
        <TopView>
            <KeyboardAvoidingView behavior='position'>
                <ScrollView>
                    <AppPresentationView />
                    <LabelShortTextEditor label='Name' value={name} onChangeText={setName} />
                    <LabelShortTextEditor label='Email' value={email} onChangeText={setEmail} />
                    <LabelPasswordEditor label='Passwort' value={password} onChangeText={setPassword} />
                    <LabelPasswordEditor label='Passwort wiederholen' value={passwordConfirmation} onChangeText={setPasswordConfirmation} />
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