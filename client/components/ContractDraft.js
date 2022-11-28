import React, { useState } from 'react';
import {StyleSheet, View, Text, Image, Pressable, TouchableOpacity} from 'react-native'
import {
    Entypo,
    Feather,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import Modal from 'react-native-modal';

const ContractDraft = props => {

    const [outline, setOutline] = useState('#212433');
    const [isSelected, setSelection] = useState(false);
    const [trash, confirmTrash] = useState(false);

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
                            setOutline('#212433')
                        }}
                    />
                    <View style={styles.headerPopupRow}>
                        <TouchableOpacity style={styles.headerPopupSection}>
                            <MaterialCommunityIcons 
                                name="pencil-outline" 
                                size={18} 
                                color="#D0DBE5" 
                                style={styles.headerPopupIcon} 
                            />
                            <Text style={styles.headerPopupText}>Edit</Text>
                        </TouchableOpacity>  
                        <TouchableOpacity 
                            style={styles.headerPopupSection}
                            onPress={() => {
                                confirmTrash(true);
                            }}    
                        >
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
                <Modal
                    isVisible={trash}
                    transparent={true}
                    onRequestClose={() => {
                        confirmTrash(!trash);
                    }}
                    coverScreen={true}
                    hasBackdrop={true}
                    backdropColor="black"
                >
                    <View style={styles.confirmContainer}>
                        <View style={styles.confirmTrash}>
                            <Text style={styles.popupText}>Are you sure you want to delete this?</Text>
                            <View style={styles.confirmButtons}>
                                <TouchableOpacity 
                                    style={styles.confirmButton}
                                    onPress={() => {
                                        confirmTrash(false);
                                    }}    
                                >
                                    <Text style={styles.confirmText}>Confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.cancelButton}
                                    onPress={() => {
                                        confirmTrash(false);
                                    }}        
                                >
                                    <Text style={styles.cancelText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Modal>
            <Pressable
                onPress={() => {
                    if (isSelected) {
                        setSelection(!isSelected)
                        setOutline('#212433')
                    } else {
                        setSelection(!isSelected)
                        setOutline('#ff6905')
                    }
                }}
            >
                <View 
                    style={[
                        styles.container,
                        {
                            borderColor: outline
                        }
                    ]}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={props.image} 
                            fadeDuration={0}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            <Text style={[styles.title,{color: '#F73131'}]}>[Draft]</Text>
                            {props.title}
                        </Text>
                        <Text style={styles.created}>{props.created}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#212433',
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        borderRadius: 7,
        borderWidth: 1,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 0.16
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        width: '25%'
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '75%',
        paddingLeft: 15
    },
    title: {
        fontSize: 14,
        color: '#fff',
        paddingBottom: 8
    },
    created: {
        fontSize: 11,
        color: 'rgba(208,219,229,.55)'
    },
    image: {
        flex: 1,
        width: 60,
        height: 55,
        resizeMode: 'contain'
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
    confirmContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(20,24,36,0.49)'
    },
    confirmTrash: {
        backgroundColor: '#282C3A',
        paddingTop: 15,
        paddingHorizontal: 22,
        paddingBottom: 18,
        borderRadius: 7,
        width: '87%',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 0.16
    },
    confirmButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    popupText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 32,
        paddingBottom: 40
    },
    confirmButton: {
        paddingVertical: 8,
        paddingHorizontal: 30,
        borderRadius: 7,
        backgroundColor: '#fff'
    },
    confirmText: {
        color: '#282C3A'
    },
    cancelButton: {
        paddingVertical: 7,
        paddingHorizontal: 30,
        borderRadius: 7,
        backgroundColor: '#282C3A',
        borderColor: '#fff',
        borderWidth: 2
    },
    cancelText: {
        color: '#fff'
    }

});

export default ContractDraft;