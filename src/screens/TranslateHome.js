import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useState } from 'react';

export default function TranslateHome() {
    
    // Text to translate state
    const [text, setText] = useState('');
    // Source language state
    const [source, setSource] = useState('');
    // Target Language State
    const [targetLanguage, setTargetLanguage] = useState('') 

    return (
        <View>
            <StatusBar barStyle='default'/>
        </View>
    )
}