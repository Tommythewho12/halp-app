import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
    // TODO remove display none at bottom
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name='events'
                    options={{
                        title: 'My Events',
                        drawerLabel: 'My Events'
                    }}
                />
                <Drawer.Screen
                    name='open_events'
                    options={{
                        title: 'Open Events',
                        drawerLabel: 'Open Events'
                    }}
                />
                <Drawer.Screen
                    name='teams'
                    options={{
                        title: 'All Teams',
                        drawerLabel: 'All Teams'
                    }}
                />
                <Drawer.Screen
                    name='managed_teams'
                    options={{
                        title: 'My Managed Teams',
                        drawerLabel: 'My Managed Teams'
                    }}
                />
                <Drawer.Screen
                    name='settings'
                    options={{
                        title: 'Settings',
                        drawerLabel: 'Settings'
                    }}
                />

                <Drawer.Screen
                    name='managed'
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />            </Drawer>
        </GestureHandlerRootView>
    );
}
