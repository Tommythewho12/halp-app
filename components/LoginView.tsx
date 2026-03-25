import { useState } from 'react';
import { router } from 'expo-router';

import { ButtonDefault, ButtonInverted, LabelEmailEditor, LabelPasswordEditor } from './basic/Containers';
import AppPresentationView from './AppPresentationView';

export default function LoginView(
    {
        handleLogin
    }: {
        handleLogin: (email: string, password: string) => Promise<void>
    }) {
    const [email, setEmail] = useState('tommythewho12@googlemail.com');
    const [password, setPassword] = useState('p');

    return (
        <>
            <AppPresentationView />
            <LabelEmailEditor
                label='Email'
                value={email}
                onChangeText={setEmail} />
            <LabelPasswordEditor
                label='Password'
                value={password}
                onChangeText={setPassword} />

            <ButtonDefault
                onPress={() => handleLogin(email, password)}
                title='Anmelden' />
            <ButtonInverted
                onPress={() => router.navigate(`/registration`)}
                title='Noch nicht registriert?' />
        </>
    );
}