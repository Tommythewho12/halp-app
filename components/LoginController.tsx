import React, { useState } from 'react';
import { router } from 'expo-router';

import http from '@/services/http-common';
import { useAuth } from '@/contexts/AuthContext';
import { is2XXStatus } from './basic/Utils';
import { LoadingModal } from './LoadingModal';
import LoginView from './LoginView';

export default function LoginController() {
    const { setTokens, isLoading } = useAuth();
    const [isLocalLoading, setLocalLoading] = useState(false);

    const handleLogin = async (email: string, password: string) => {
        // TODO go to global loading if makes sense
        setLocalLoading(true);
        try {
            // TODO move login logic into AuthContext
            const response = await http.post(`login`, {
                email: email,
                password: password
            });
            if (is2XXStatus(response.status)) {
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
                router.replace('/(authenticated)/events');
            } else {
                throw new Error('unable to login');
            }
        } catch (e) {
            console.error(e);
            setTokens({ accessToken: null, refreshToken: null });
        } finally {
            setLocalLoading(false);
        }
    };

    if (isLoading || isLocalLoading) {
        return <LoadingModal />
    }

    return <LoginView handleLogin={handleLogin} />;
}