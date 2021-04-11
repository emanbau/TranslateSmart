import React from 'react';
import { View, Text, StatusBar, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Input, IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import Languages from '../../assets/languages/Languages';
import DismissKeyboard from '../components/DismissKeyboard';
import Key from '../../assets/key/Key';

export default function TranslateHome() {

    // Mapping Languages for Target Select
    const mappedLanguages = Languages.map(language => {
        return (
            <SelectItem title={language.language} value={language.code} key={language.code}/>
        )
    })
    
    // Text to Translate & Input Value State
    const [text, setText] = useState('');
    // Source Langauge State
    const [source, setSource] = useState('en');
    // Target Language State
    const [targetLanguage, setTargetLanguage] = useState('es')
    // Translated Text State
    const [translated, setTranslated] = useState('Translation')



    // Source Language ItemIndex State for Select Form
    const [selectedSourceIndex, setSelectedSourceIndex] = useState(new IndexPath(20));

    // Target Language ItemIndex State for Select Form
    const [selectedTargetIndex, setSelectedTargetIndex] = useState(new IndexPath(85));

    // Change Source Language
    const sourceChange = (e) => {
        setSource(e);
    }
    
    // Form Text to Translate Handle Change
    const handleChange = (e) => {
        setText(e);
    }


    // Change Target Language
    const targetChange = (e) => {
        setTargetLanguage(e);
    }


    // Translate API Request
    useEffect(() => {
        fetch(`https://translation.googleapis.com/language/translate/v2?key=${Key}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                q: text,
                target: targetLanguage,
                source: source,
            })
        })
        .then(data => data.json())
        .then(data => setTranslated(data["data"]["translations"][0]["translatedText"]))
        .catch(err => console.log(err))
    })


    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <StatusBar barStyle='default'/>
                
                <Layout style={styles.form}>
                    <Select
                    selectedIndex={selectedSourceIndex}
                    onSelect={(index) => {setSelectedSourceIndex(index); sourceChange(Languages[index['row']].code)}}
                    value={Languages[selectedSourceIndex['row']].language}
                    >
                        {mappedLanguages}
                    </Select>
                </Layout>
        
                <Layout style={styles.form}>
                    <Select
                    selectedIndex={selectedTargetIndex}
                    onSelect={(index) => {setSelectedTargetIndex(index); targetChange(Languages[index['row']].code)}}
                    value={Languages[selectedTargetIndex['row']].language}
                    >
                        {mappedLanguages}
                    </Select>
                </Layout>

                <Input 
                placeholder='Enter text'
                value={text}
                onChangeText={handleChange}
                />

                <Input 
                placeholder='Translation'
                disabled
                value={translated}
                />

            </View>
        </DismissKeyboard>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    form: {
        width: '40%',
    },
  });