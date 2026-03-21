import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { ButtonDefault, ButtonInverted, LabelPasswordEditor, LabelShortTextEditor } from './basic/Containers';
import AppPresentationView from './AppPresentationView';

export default function LoginView(
    {
        handleLogin
    }: {
        handleLogin: (email: string, password: string) => Promise<void>
    }) {
    const [email, setEmail] = useState('tommythewho12@googlemail.com');
    const [password, setPassword] = useState('p');

    const submitLogin = async () => {
        handleLogin(email, password);
    };

    return (
        <>
            <AppPresentationView />
            <LabelShortTextEditor
                label='Email'
                value={email}
                onChangeText={setEmail} />
            <LabelPasswordEditor
                label='Password'
                value={password}
                onChangeText={setPassword} />

            <ButtonDefault
                onPress={submitLogin}
                title='Anmelden' />
            <ButtonInverted
                onPress={() => router.navigate(`/registration`)}
                title='Noch nicht registriert?' />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#f9fafc',
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 32,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        marginBottom: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#4f46e5',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    }
});