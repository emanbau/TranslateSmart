
import React from 'react';
import { SafeAreaView, FlatList, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Languages from '../../assets/languages/Languages';

export default function LanguageList({ changerFunction, active, setActive }) {

    // FlatList Render Item for Each Language
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={(e) => {changerFunction(item.code); setActive();}}>
            <Text>{item.language}</Text>
        </TouchableOpacity>
    )

    const styles = StyleSheet.create({
        listContainer: {
            display: active ? 'flex' : 'none',
            backgroundColor: 'white',
            flexDirection: 'column',
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 5,
        }
    })

    return(
        <SafeAreaView style={styles.listContainer}>
            <FlatList
            data={Languages}
            renderItem={renderItem}
            keyExtractor={language => language.code}
            />
        </SafeAreaView>
    )
}
