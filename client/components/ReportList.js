import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, Pressable, TouchableOpacity, Platform} from 'react-native'
import {
    Entypo,
    Feather,
    Ionicons,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import Modal from 'react-native-modal';

const ReportList = props => {

    const [isSelected, setSelection] = useState(false);

    var color;
    if (props.complete == "Complete") {
        color = "#00D81E"
    } else {
        color = "#FF4545"
    }

    var source;
    if(!props.image) {
        source = require('../assets/noclientcontract.png')
    } else {
        source = props.image
    }

    return (
        <View>
            <Modal 
                animationIn="zoomIn"
                animationOut="zoomOut"
                isVisible={isSelected}
                transparent={true}
                onRequestClose={() => {
                    setSelection(!isSelected);
                }}
                hasBackdrop={false}
                coverScreen={true}
            >
                <View style={styles.headerPopup}>
                    <Entypo
                        name="chevron-thin-left" 
                        size={20} 
                        color="#D0DBE5"
                        style={styles.headerPopupChevron}
                        onPress={() => {
                            setSelection(false);
                        }}
                    />
                    <View style={styles.headerPopupRow}>
                        <TouchableOpacity 
                            style={styles.headerPopupSection}
                            onPress={() => {
                                
                            }}
                        >
                            <Feather 
                                name="eye" 
                                size={18} 
                                color="#D0DBE5" 
                                style={styles.headerPopupIcon} 
                            />
                            <Text style={styles.headerPopupText}>View</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerPopupSection}>
                            <MaterialCommunityIcons 
                                name="pencil-outline" 
                                size={18} 
                                color="#D0DBE5" 
                                style={styles.headerPopupIcon} 
                            />
                            <Text style={styles.headerPopupText}>Edit</Text>
                        </TouchableOpacity>  
                        <TouchableOpacity style={styles.headerPopupSection}>
                            <Feather 
                                name="trash-2" 
                                size={18} 
                                color="#D0DBE5" 
                                style={styles.headerPopupIcon} 
                            />
                            <Text style={styles.headerPopupText}>Trash</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Pressable
                onPress={() => {
                    setSelection(!isSelected)
                }}
            >
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        {isSelected ? (
                            <View style={styles.selectedContainer}>
                                <MaterialCommunityIcons 
                                    name="circle" 
                                    color="#D0DBE5"
                                    size={72}
                                    style={{
                                        marginLeft: -6,
                                        marginTop: Platform.OS === 'ios' ? -6 : 0
                                    }}
                                />
                                <Ionicons
                                    name="checkmark"
                                    color="#141824"
                                    size={40}
                                    style={{
                                        position: 'absolute'
                                    }}
                                />
                            </View>
                        ) :
                            <Image
                                source={source} 
                                fadeDuration={0}
                                style={styles.image}
                            /> 
                        }
                        
                    </View>
                    <View style={styles.textContainer}> 
                        <View style={styles.addressContainer}>
                            <Text style={styles.address}>
                                {props.address.length > 26 ? props.address.slice(0,26) + '...' : props.address}
                            </Text>
                            <Text style={styles.created}>{props.created}</Text>
                        </View>
                        <Text style={styles.name}>{props.name}</Text>
                        <Text style={[styles.complete, {color: color}]}>{props.complete}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '80%',
        paddingLeft: 15
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 4
    },
    address: {
        fontSize: 14,
        color: '#D0DBE5',
    },
    created: {
        fontSize: 11,
        color: '#D0DBE5'
    },
    name: {
        color: 'rgba(208, 219, 229, .75)',
        fontSize: 12,
        paddingBottom: 4
    },
    complete: {
        fontSize: 12
    },
    image: { 
        flex: 1,
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 100
    },
    headerPopup: {
        backgroundColor: '#282C3A',
        height: Platform.OS === 'ios' ? 90 : 70,
        flexDirection: 'row',
        paddingBottom: 10,
        marginHorizontal: -20,
        position: 'absolute',
        top: Platform.OS == 'ios' ? -20 : -30,
        width: '112%',
        alignItems: 'flex-end'
    },
    headerPopupSection: {
        flexDirection: 'row',
        paddingHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerPopupIcon: {
        paddingRight: 8
    },
    headerPopupChevron: {
        paddingLeft: 15,
        paddingBottom: 3
    },
    headerPopupText: {
        color: 'rgba(208,219,229,.88)',
        fontSize: 14
    },
    headerPopupRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '87%',
        paddingBottom: 5
    },
    selectedContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ReportList;