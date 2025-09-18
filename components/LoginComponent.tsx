import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import http from '@/services/http-common';
import { useAuth } from '@/contexts/AuthContext';

export const LoginComponent = () => {
    const { accessToken, refreshToken, setTokens, isLoading } = useAuth();
    const [email, setEmail] = useState('tommythewho12@googlemail.com');
    const [password, setPassword] = useState('p');
    const [isLocalLoading, setLocalLoading] = useState(false);

    const handleLogin = async () => {
        setLocalLoading(true);
        await http.post(`login`, { email: email, password: password })
            .then(response => {
                const accessToken = response.data.accessToken;
                const cookieHeader = response.headers['set-cookie'];
                let refreshToken = null;
                if (cookieHeader) {
                    cookieHeader.forEach(cookieString => {
                        if (cookieString.startsWith('refreshToken=')) {
                            refreshToken = cookieString.substring(cookieString.indexOf('=') + 1, cookieString.indexOf(';'));
                        }
                    })
                }
                setTokens({ accessToken, refreshToken });
            })
            .catch(e => {
                console.error(e);
                setTokens({ accessToken: null, refreshToken: null });
            })
            .finally(() => setLocalLoading(false))
        if (accessToken) {
            router.replace('/(authenticated)/events');
        }
    };

    if (isLoading || isLocalLoading) {
        return <Text>Loading...</Text>
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Login
            </Text>

            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor="#888"
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='#888'
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>
                    Sign In
                </Text>
            </TouchableOpacity>
        </View>
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