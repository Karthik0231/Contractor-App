// src/navigation/AppNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { useTheme } from 'react-native-paper';
import Login from '../screens/Login';
import ContractList from '../screens/ContractList';
import AddContract from '../screens/AddContract'; // Import AddContract screen if needed

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
            headerShown:false, // Hide the header for HomeScreen
        }}
      />
      <Stack.Screen name="Login" component={Login} 
      options={{
        headerShown: false, // Hide the header for Login screen
      }}
      />

      <Stack.Screen
      name="Contracts"
      component={ContractList}
      options={{
          headerShown:false, // Hide the header for ContractList screen
      }}
        />

        <Stack.Screen
        name="AddContract"
        component={AddContract}
        options={{
headerStyle: {
                backgroundColor: '#1E2634', // blue dark
            },        }}
        />
    </Stack.Navigator>
  );
}
