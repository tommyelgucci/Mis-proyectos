import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from './src/i18n/LanguageContext';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  return (
    <LanguageProvider>
      <StatusBar style="light" />
      <DashboardScreen />
    </LanguageProvider>
  );
}
