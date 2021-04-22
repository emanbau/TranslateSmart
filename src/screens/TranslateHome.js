import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image, StatusBar, StyleSheet, TextInput, } from 'react-native';
import { useState, useEffect } from 'react';
import Languages from '../../assets/languages/Languages';
import DismissKeyboard from '../components/DismissKeyboard';
import Key from '../../assets/key/Key';
import { useTheme } from '../theme/ThemeProvider';
import LanguageSwitch from '../../assets/languageswitch2x.png';
import LanguageList from '../components/LanguageList';

export default function TranslateHome() {


    // Mapping Languages for Target Select
    const mappedLanguages = Languages.map(language => {
        return language.code
    })
    
    // Text to Translate & Input Value State
    const [text, setText] = useState('');
    // Source Langauge State
    const [source, setSource] = useState('en');
    // Target Language State
    const [targetLanguage, setTargetLanguage] = useState('es')
    // Translated Text State
    const [translated, setTranslated] = useState('Translation')



    // These are for the LanguageList component for changing languages
    // Activate the Language List State
    const [languageListActive, setLanguageListActive] = useState(false);
    // Change Language List State 
    const activateLanguageList = () => {
        setLanguageListActive(!languageListActive);
    }
    // Switch changer function between Source and Target Language
    const [changeWhat, setChangeWhat] = useState(null);
    const changeWhatSource = (e) => {
        setChangeWhat('src');
    }
    const changeWhatTarget = (e) => {
        setChangeWhat('target');
    }


    // FOR CHANGING SOURCE AND TARGET LANGUAGE
    // Change Source Language
    const sourceChange = (code) => {
        setSource(code);
    }
    // Change Target Language
    const targetChange = (code) => {
        setTargetLanguage(code);
    }
    

    // Form Text to Translate Handle Change
    const handleChange = (e) => {
        setText(e);
    }

    
    // Switch Source and Target Language
    const languageSwitch = (e) => {
        let stack = source;
        setSource(targetLanguage);
        setTargetLanguage(stack);
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

    // Styles and Theme Import
    const {isDark, colors, font} = useTheme();


    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },

        heading: {
            fontFamily: font,
            fontSize: 22,
            marginTop: 75,
        },  

        selectLanguageContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
            marginBottom: 10,
        },

        selectLanguageButtonSource: {
            fontFamily: font,
            fontSize: 16,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 4,
            paddingBottom: 4,
            marginRight: 10,
        },

        selectLanguageButtonTarget: {
            fontFamily: font,
            fontSize: 16,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 4,
            paddingBottom: 4,
            marginLeft: 10,
        },

        languageSwitchImage: {
            width: 20,
            resizeMode: 'contain',
        },

        inputFormContainer: {
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            height: '40%',
            borderRadius: 15,
            shadowOffset:{  width: 3,  height: 7,  },
            shadowColor: 'black',
            shadowOpacity: 0.16,
            shadowRadius: 22,
        },

        inputFormSource: {
            borderBottomWidth: 0.5,
            borderBottomColor: '#707070',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: colors.background,
            width: '100%',
            height: '50%',
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 15,
            paddingRight: 15,
            fontFamily: font,
            fontSize: 16,
            marginTop: 0,
            marginBottom: 0,
        },

        inputFormTarget: {
            borderTopWidth: 0.5,
            borderTopColor: '#707070',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            backgroundColor: colors.background,
            width: '100%',
            height: '50%',
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 15,
            paddingRight: 15,
            fontFamily: font,
            fontSize: 16,
            marginTop: 0,
            marginBottom: 0,
        }
    });


    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <StatusBar barStyle='default'/>

                <LanguageList 
                changerFunction={changeWhat === 'src' ? sourceChange : targetChange} 
                active={languageListActive} 
                setActive={activateLanguageList}
                />

                <Text style={styles.heading}>TranslateSmart</Text>

                <View style={styles.selectLanguageContainer}>
                    <TouchableOpacity onPress={(e) => {changeWhatSource(e); activateLanguageList(e)}}>
                        <Text style={styles.selectLanguageButtonSource}>{Languages[mappedLanguages.indexOf(source)].language}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={languageSwitch}>
                        <Image 
                        source={LanguageSwitch}
                        style={styles.languageSwitchImage}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={(e) => {changeWhatTarget(e); activateLanguageList(e);}}>
                        <Text style={styles.selectLanguageButtonTarget}>{Languages[mappedLanguages.indexOf(targetLanguage)].language}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputFormContainer}>
                    <TextInput 
                    style={styles.inputFormSource}
                    placeholder='Enter text'
                    placeholderTextColor={colors.placeholder}
                    value={text}
                    onChangeText={handleChange}
                    multiline
                    numberOfLines={5}
                    />

                    <TextInput
                    style={styles.inputFormTarget}
                    placeholder='Translation'
                    placeholderTextColor={colors.placeholder}
                    disabled
                    value={translated}
                    multiline
                    numberofLines={5}
                    />
                </View>

            </View>
        </DismissKeyboard>
    )
}

