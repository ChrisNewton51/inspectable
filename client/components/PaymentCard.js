import React from 'react';
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PaymentCard = props => {
    return(
        <View style={styles.container}>
            <FontAwesome 
                name="credit-card-alt" 
                size={35} 
                color="#ffffff" 
                style={styles.icon}
            />
            <View style={styles.column}>
                <Text style={styles.primaryText}>
                    Debit Card
                </Text>
                <Text style={styles.secondaryText}>
                    Ends in 1234
                </Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.primaryText}>
                    Billed Monthly
                </Text>
                <Text style={styles.secondaryText}>
                    $40.00
                </Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.button}>Remove</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#282C3A',
        marginHorizontal: 15,
        paddingHorizontal: 15,
        paddingVertical: 9,
        marginBottom: 30
    },
    primaryText: {
        color: '#fff',
        fontSize: 13,
    },
    secondaryText: {
        color: 'rgba(208,219,229,0.72)',
        fontSize: 11
    },
    column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingRight: 20
    },  
    button: {
        color: '#ff6905',
        fontSize: 13,
    }
});

export default PaymentCard;