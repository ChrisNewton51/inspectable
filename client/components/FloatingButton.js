import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const FloatingButton = props => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity 
            onPress={() => {
                navigation.navigate(props.screen)
            }}
            style={styles.float}
        >
            <Feather style={styles.floatIcon} name="edit-2" size={18} color="white" />
            <Text style={styles.floatText}>New</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    float: {
        flexDirection: 'row',
        position: 'absolute',
        width: 120,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 15,
        padding: 10,
        backgroundColor: '#ff6905',
        borderRadius: 70
    },
    floatIcon: {
        marginRight: 15
    },
    floatText: {
        color: 'white',
        fontSize: 18
    }
});

export default FloatingButton;