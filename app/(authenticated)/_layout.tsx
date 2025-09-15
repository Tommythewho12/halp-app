import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name='index'
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
                    name='subbed_teams'
                    options={{
                        title: 'Subbed Teams',
                        drawerLabel: 'Subbed Teams'
                    }}
                />
                <Drawer.Screen
                    name='managed_teams'
                    options={{
                        title: 'My Teams',
                        drawerLabel: 'My Teams'
                    }}
                />
                <Drawer.Screen
                    name='all_teams'
                    options={{
                        title: 'All Teams',
                        drawerLabel: 'All Teams'
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
                    name='teams'
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />
                <Drawer.Screen
                    name='events'
                    options={{
                        drawerItemStyle: { display: 'none' }
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
