import { createContext, useContext, useEffect, useState } from 'react';
import { isExpired } from 'react-jwt';
import * as SecureStore from 'expo-secure-store';

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
        const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN);
        if (accessToken != null && isExpired(accessToken)) {
            console.debug('access token is expired');
            // TODO request new Token
            accessToken = null;
        }
        setTokensState({ accessToken, refreshToken });
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

export const useAuth = () => useContext(AuthContext);