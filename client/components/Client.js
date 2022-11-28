import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native'

const Client = props => {

    var phoneNum = String(props.phone);
    if (phoneNum.length != 14) {
        var newPhone = "(" + phoneNum.slice(0,3) + ") " + phoneNum.slice(3,6) + "-" + phoneNum.slice(6,10);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text selectable={true} style={styles.name}>{props.name}</Text>
                <Text selectable={true} style={styles.email}>{props.email}</Text>
                <Text selectable={true}style={styles.email}>{newPhone}</Text>
            </View>
            <Text selectable={true}style={styles.label}>Reports</Text>
            <FlatList
                data={props.reports}
                keyExtractor={(item) => item.address}    
                renderItem={({item, index}) => { 
                    return (
                        <View style={styles.reports}>
                            <Text selectable={true} style={styles.report}>{item.address}</Text>
                            <Text selectable={true} style={styles.report}>{item.date}</Text>
                        </View>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 25,
        paddingHorizontal: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: '#000',
        elevation: 5,
        shadowRadius: 6,
        shadowOpacity: .16,
        backgroundColor: '#212433',
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 7
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        color: '#D0DBE5'
    },
    email: {
        fontSize: 11,
        textAlign: 'center',
        color: 'rgba(208,219,229,0.75)'
    },
    label: {
        fontSize: 12,
        color: '#ff6905',
        paddingBottom: 6,
        paddingTop: 12
    },
    reports: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    report: {
        color: '#D0DBE5',
        fontSize: 12,
        paddingBottom: 5
    }
});

export default Client;