import React from 'react';
import { AppearanceProvider } from 'react-native-appearance'
import Index from './src/Index';
import ThemeProvider from './src/theme/ThemeProvider';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';


export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <AppearanceProvider>
        <ThemeProvider>
          <Index />
        </ThemeProvider>
      </AppearanceProvider>
    </ApplicationProvider>
  );
}

