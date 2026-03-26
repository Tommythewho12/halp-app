import { SplashScreen, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <SplashScreenController />
                <RootNavigator />
            </AuthProvider>
        </SafeAreaProvider>
    );
}

function RootNavigator() {
    const { accessToken } = useAuth();

    return (
        <Stack>
            <Stack.Protected guard={accessToken != null}>
                <Stack.Screen
                    name="(authenticated)"
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Protected>

            <Stack.Protected guard={accessToken == null}>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false
                    }} />
            </Stack.Protected>
        </Stack>
    )
}

function SplashScreenController() {
    const { isLoading } = useAuth();

    if (!isLoading) {
        SplashScreen.hideAsync();
    }

    return null;
}