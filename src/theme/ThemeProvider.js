import React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { useColorScheme } from 'react-native-appearance';
import { darkColors, lightColors } from './ThemeColors';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

// Context for theme (current theme, colorset, change theme)
export const ThemeContext = createContext({
    isDark: false,
    colors: lightColors,
    font: 'Poppins-Regular',
    setScheme: () => {},
});

export default function ThemeProvider(props) {
    // Retrieves the set theme of the device
    const colorScheme = useColorScheme();
    
    // font import
    let [fontsLoaded] = useFonts({
        'Poppins-Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    });

    // Set state of the theme through boolean (allows re-rendering of app on theme change)
    const [isDark, setIsDark] = useState(colorScheme === "dark");

    // If the device theme is changed, re-renders app through isDark state change
    useEffect(() => {
        setIsDark(colorScheme === "dark");
    }, [colorScheme]);

    // Default Theme (Based on context)
    const defaultTheme = {
        // Theme State
        isDark,
        // Theme Colors
        colors: isDark ? darkColors : lightColors,
        // Font
        font: 'Poppins-Regular',
        // Override Theme Function (For theme switches in-App)
        setSceme: (scheme) => setIsDark(scheme === "dark"),
    };
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            // Context Provider for context value (when defaultTheme changes -> children re-render too)
            <ThemeContext.Provider value={defaultTheme}>
                {props.children}
            </ThemeContext.Provider>
        );
    }
};

export const useTheme = () => useContext(ThemeContext)