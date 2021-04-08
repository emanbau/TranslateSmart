import React from 'react';
import { View, Text, StatusBar, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        title: "More than a translator",
        text: "Understand Easier With TranslateSmart",
        image: require('../../assets/onboardinglight.png')
    },
]

export default function Onboard() {

    // Slide Render
    const renderItem = ({item}) => {
        return (
            <View>
                <Image source={item.image} />
                <Text>{item.title}</Text>
                <Text>{item.text}</Text>
            </View>
        )
    };

    // Data Key for Each Slide
    const keyExtractor = (item) => item.title;

    return(
        <View style={{flex: 1}}>
            <StatusBar translucent backgroundColor="transparent" />
            <AppIntroSlider
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                data={slides}
            />
        </View>
    )
}