import { createContext, use, useEffect, useState } from 'react';
import { isExpired } from 'react-jwt';
import * as SecureStore from 'expo-secure-store';

import http from '@/services/http-common';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

let currentAccessToken: string | null = null;
let currentRefreshToken: string | null = null;

interface AuthTokens {
    accessToken: string | null;
    refreshToken: string | null;
}

interface AuthContextType extends AuthTokens {
    setTokens: (tokens: AuthTokens | null) => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    setTokens: () => { },
    isLoading: true,
});

export const getAccessToken = async (): Promise<string | null> => {
    if (!currentAccessToken)
        return null;

    if (!isExpired(currentAccessToken))
        return currentAccessToken;

    console.debug('access token expired; attempting refresh...');
    if (currentRefreshToken && !isExpired(currentRefreshToken)) {
        const newAccessToken = await refreshAccessToken(currentRefreshToken);
        if (newAccessToken) {
            currentAccessToken = newAccessToken;
            // await suggested for setItemAsync by AI
            SecureStore.setItemAsync(ACCESS_TOKEN, newAccessToken);
            console.debug('access token refreshed successfully');
            return newAccessToken;
        }
    }

    console.error('unable to refresh access token');
    return null;
};

const refreshAccessToken = async (refreshToken: string): Promise<string | null> => {
    try {
        const res = await http.post(`refresh-token`, {}, {
            headers: {
                Cookie: 'refreshToken=' + refreshToken,
            },
        });
        const accessToken = res.data.accessToken;
        console.debug('new access token: ', accessToken);
        return accessToken;
    } catch (e) {
        console.error('failed to refresh access token', e);
        return null;
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tokens, setTokensState] = useState<AuthTokens>({
        accessToken: null,
        refreshToken: null,
    });
    const [isLoading, setLoading] = useState(true);

    const setTokens = async (tokens: AuthTokens | null) => {
        if (tokens) {
            await SecureStore.setItemAsync(ACCESS_TOKEN, tokens.accessToken || '');
            await SecureStore.setItemAsync(REFRESH_TOKEN, tokens.refreshToken || '');
            setTokensState(tokens);
            currentAccessToken = tokens.accessToken;
            currentRefreshToken = tokens.refreshToken;
        } else {
            await SecureStore.deleteItemAsync(ACCESS_TOKEN);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN);
            setTokensState({ accessToken: null, refreshToken: null });
            currentAccessToken = null;
            currentRefreshToken = null;
        }
    };

    const loadTokens = async () => {
        let accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN);
        let refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN);
        console.debug('accessToken loaded from secure store:', accessToken);
        console.debug('refreshToken loaded from secure store:', refreshToken);

        if (!accessToken || accessToken.length == 0) {
            console.debug('access token is empty');
        } else {
            if (isExpired(accessToken)) {
                console.debug('access token is expired');
                if (refreshToken != null && refreshToken.length > 0 && !isExpired(refreshToken)) {
                    accessToken = await refreshAccessToken(refreshToken);
                    await setTokens({ accessToken, refreshToken });
                    console.debug('tokens: ', accessToken, refreshToken);
                }
            } else {
                console.debug('access token still valid');
                setTokensState({ accessToken, refreshToken });
                currentAccessToken = accessToken;
                currentRefreshToken = refreshToken;
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        loadTokens();
    }, []);

    return (
        <AuthContext.Provider value={{ ...tokens, setTokens, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => use(AuthContext);