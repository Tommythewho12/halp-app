import { router } from 'expo-router';
import { Text, View, Pressable } from 'react-native';
import { useState } from 'react';

import TestService from '../../services/test.service';
import { clearTokens } from '../../services/secure-store.service';
import { useAuth } from '@/services/AuthContext';

export default function Index() {
  const { setTokens } = useAuth();
  const [text, setText] = useState("no data retrieved yet!");

  const handlePress = () => {
    TestService.get()
      .then(response => {
        setText(response.data);
      })
      .catch(e => {
        console.log(e);
        setText(e.message);
      })
  }

  const handleLogout = () => {
    setTokens({ accessToken: null, refreshToken: null });
    router.replace('/login');
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Pressable
        onPress={() => handlePress()}
      >
        <Text>Test</Text>
      </Pressable>
      <Text>{text}</Text>
      <Pressable 
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}
