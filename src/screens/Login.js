import React, { useState } from 'react';
import { View, Text, Alert, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { ToastAndroid } from 'react-native';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      ToastAndroid.show('Please enter email and password', ToastAndroid.SHORT);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Contracts');
    }, 1000);
  };

  return (
    <>
      <StatusBar barStyle="light-content"/>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-primary justify-center items-center px-6"
      >
        <Card className="w-full max-w-md bg-surface p-6 rounded-2xl shadow-lg">
          <Text className="text-2xl font-bold text-center text-textMain mb-2">
            Welcome Back
          </Text>
          <Text className="text-center text-placeholder mb-6">
            Sign in to manage your contracts
          </Text>

          {/* Email Input */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            className="mb-4"
            theme={{
              colors: {
                primary: '#2563EB',
                surfaceVariant: '#E5E7EB',
                background: '#FFFFFF',
              }
            }}
            textColor="#1E293B"
          />

          {/* Password Input */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            className="mb-6"
            theme={{
              colors: {
                primary: '#2563EB',
                surfaceVariant: '#E5E7EB',
                background: '#FFFFFF',
              }
            }}
            textColor="#1E293B"
          />

          {/* Sign In Button */}
          <Button
            icon="login"
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            className="rounded-full"
            buttonColor="#2563EB"
            contentStyle={{
              paddingVertical: 10,
              borderRadius: 999,
            }}
            labelStyle={{
              fontSize: 16,
              fontWeight: '600',
              color: 'white',
            }}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Card>
      </KeyboardAvoidingView>
    </>
  );
}
