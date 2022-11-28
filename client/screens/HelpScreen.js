import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const HelpScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.helpText}>Help Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141824',
        height: '100%'
    },
    helpText: {
        paddingTop: 30,
        textAlign: 'center',
        color: '#D0DBE5'
    }
});

export default HelpScreen;