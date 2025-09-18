import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

import { TeamsProvider } from '@/contexts/TeamsContext';
import { EventsProvider } from '@/contexts/EventsContext';

export default function Layout() {
    // TODO remove display none at bottom
    return (
        <TeamsProvider>
            <EventsProvider>
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

                    </Drawer>
                </GestureHandlerRootView>
            </EventsProvider>
        </TeamsProvider>
    );
}
