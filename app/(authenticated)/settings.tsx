import { router, useLocalSearchParams } from 'expo-router';
import { View, Button } from 'react-native';
import { useAuth } from '@/services/AuthContext';

export default function Settings() {
    const { setTokens } = useAuth();

    const handleLogout = () => {
        setTokens({ accessToken: null, refreshToken: null });
        router.replace('/login');
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={handleLogout} title='Logout' />
        </View>
    );
}
