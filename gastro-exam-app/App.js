import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageProvider } from './src/i18n/LanguageContext';
import { theme } from './src/theme';
import DashboardScreen from './src/screens/DashboardScreen';
import QuizScreen from './src/screens/QuizScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import FlashcardsScreen from './src/screens/FlashcardsScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.bg,
    card: theme.colors.surface,
    text: theme.colors.milk,
    border: theme.colors.border,
    primary: theme.colors.crema,
  },
};

export default function App() {
  return (
    <LanguageProvider>
      <StatusBar style="light" />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Wirtepatent" component={QuizScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Sca" component={FlashcardsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}
