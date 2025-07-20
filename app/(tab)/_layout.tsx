import { Tabs } from "expo-router";

import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "@/services/AuthContext";

export default function TabLayout() {
  const { accessToken } = useAuth();

  

  return (
    <Tabs>
      <Tabs.Protected guard={accessToken != null}>
        <Tabs.Screen 
          name="index"
          options={{
            title: "Events",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons size={28} name={focused ? "calendar" : "calendar-outline"} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="teams"
          options={{
            title: "Teams",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons size={28} name={focused ? "people" : "people-outline"} color={color} />
            ),
          }}
        />
        <Tabs.Screen 
          name="managed-teams"
          options={{
            title: "Managed Teams",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons size={28} name={focused ? "briefcase" : "briefcase-outline"} color={color} />
            ),
          }}
        />
      </Tabs.Protected>
      <Tabs.Protected guard={accessToken == null}>
          <Tabs.Screen name="login"/>
      </Tabs.Protected>
    </Tabs>
  );
}
