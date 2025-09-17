import { SplashScreen, Stack } from "expo-router";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

export default function RootLayout() {
    return (
        <AuthProvider>
            <SplashScreenController />
            <RootNavigator />
        </AuthProvider>
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
                <Stack.Screen name="login" />
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