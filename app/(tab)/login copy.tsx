import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import ConnectionService from '../../services/connection.service';

export default function Login() {
  const [email, setEmail] = useState('tommythewho12@googlemail.com');
  const [password, setPassword] = useState('p');

  const handleLogin = () => {
    let success = ConnectionService.login(email, password);
    console.debug(success);
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Login
      </Text>

      <TextInput 
        style={styles.input}
        placeholder='Email'
        placeholderTextColor="#888"
        keyboardType='email-address'
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder='Password'
        placeholderTextColor='#888'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#f9fafc',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  }
});