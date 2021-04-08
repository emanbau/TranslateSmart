import React from 'react';
import { AppearanceProvider } from 'react-native-appearance'
import Index from './src/Index';
import ThemeProvider from './src/theme/ThemeProvider';

export default function App() {
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <Index />
      </ThemeProvider>
    </AppearanceProvider>
  );
}

