import React from 'react';
import { Provider as PaperProvider, Button, TextInput, DefaultTheme, Card } from 'react-native-paper';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1E2634',       // Blue 600
    accent: '#AC8D53',        // Blue 400 5478BC
    background: '#F9FAFB',    // Neutral soft gray
    surface: '#FFFFFF',
    error: '#EF4444',         // Red 500
    text: '#1E293B',          // Slate 800
    disabled: '#E5E7EB',      // Gray 200
    placeholder: '#94A3B8',   // Slate 400
    textMain: '#AC1577',      //  Pink 600
    extra:'rgb(251, 95, 95)',//orange 500
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}
