import { createContext, use, useEffect, useState } from 'react';
import { isExpired } from 'react-jwt';
import * as SecureStore from 'expo-secure-store';

import http from "../http-common";

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

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
    setTokens: () => {},
    isLoading: true,
});

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
        } else {
            await SecureStore.deleteItemAsync(ACCESS_TOKEN);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN);
            setTokensState({ accessToken: null, refreshToken: null });
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
                    setTokens({ accessToken, refreshToken });
                }
            } else {
                console.debug('access token still valid');
                setTokensState({ accessToken, refreshToken });
            }
        }
        setLoading(false);
    };

    const refreshAccessToken = async (refreshToken:string) => {
        let accessToken = null;
        await http.post(`refresh-token`, {
            headers: {
                Cookie: "refreshToken=" + refreshToken
            }})
            .then(res => {
                accessToken = res.data.accessToken;;
                console.debug('new access token via refresh', accessToken);
            })
            .catch(e => {
                console.error('failed to refresh access token');
            });
        return accessToken;
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