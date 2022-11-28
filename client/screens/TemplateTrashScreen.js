import React, { useState, useEffect } from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    RefreshControl,
    Pressable,
    Image,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    fetchTemplateTrash, 
    deleteTemplate, 
    templateNotTrash, 
    emptyTemplateTrash,
    getUserTempTrash
} from '../redux/actions/templateAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    Entypo,
    MaterialIcons
} from '@expo/vector-icons';
import Modal from 'react-native-modal';

var templateId, currentIndex;

const TemplateTrashScreen = ({user, deleteTemplate, templateNotTrash, emptyTemplateTrash}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {trash} = useSelector(state => state.templateList)

    const [refreshing, setRefreshing] = useState(false)
    const [select, setSelect] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [trashM, confirmTrash] = useState(false);
    const [empty, confirmEmpty] = useState(false);


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getUserTempTrash(user.templatetrash))
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getUserTempTrash(user.templatetrash))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }, [dispatch])

    return (
        <View>
            <Modal 
                animationIn="zoomIn"
                animationOut="zoomOut"
                isVisible={openModal}
                transparent={true}
                onRequestClose={() => {
                  
                }}
                hasBackdrop={false}
                coverScreen={true}
                style={{margin:0}}
            >
                <View style={styles.headerPopup}>
                    <Entypo
                        name="chevron-thin-left" 
                        size={20} 
                        color="#D0DBE5"
                        style={styles.headerPopupChevron}
                        onPress={() => {
                            setOpenModal(false);
                            setSelect()
                        }}
                    />
                    <View style={styles.headerPopupRow}>
                        <TouchableOpacity 
                            style={styles.headerPopupSection}
                            onPress={() => {
                                templateNotTrash(templateId, user.id, user)
                                setSelect()
                                setOpenModal(false);
                                setRefreshing(true);
                                dispatch(getUserTempTrash(user.templatetrash))
                                wait(500).then(() => setRefreshing(false))
                            }}
                        >
                            <MaterialIcons
                                name="move-to-inbox" 
                                size={22} 
                                color="#D0DBE5" 
                                style={styles.headerPopupIcon} 
                            />
                            <Text style={styles.headerPopupText}>Not Trash</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.headerPopupSection}
                            onPress={() => {
                                confirmTrash(true)
                            }}
                        >
                            <Entypo
                                name="cross" 
                                size={22} 
                                color="#D0DBE5" 
                                style={styles.headerPopupIcon} 
                            />
                            <Text style={styles.headerPopupText}>Delete Forever</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    isVisible={trashM}
                    transparent={true}
                    onRequestClose={() => {
                        confirmTrash(!trashM);
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
                                        deleteTemplate(templateId, user.id, user)
                                        setSelect()
                                        confirmTrash(false);
                                        setOpenModal(false);
                                        setRefreshing(true);
                                        dispatch(getUserTempTrash(user.templatetrash))
                                        wait(500).then(() => setRefreshing(false))
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
            <Modal
                isVisible={empty}
                transparent={true}
                onRequestClose={() => {
                    confirmEmpty(!empty);
                }}
                coverScreen={true}
                hasBackdrop={true}
                backdropColor="black"
            >
                <View style={styles.confirmContainer}>
                    <View style={styles.confirmTrash}>
                        <Text style={styles.popupText}>Are you sure you want to empty trash?</Text>
                        <View style={styles.confirmButtons}>
                            <TouchableOpacity 
                                style={styles.confirmButton}
                                onPress={() => {
                                    emptyTemplateTrash(user.id, user)
                                    setSelect()
                                    confirmEmpty(false);
                                    setOpenModal(false);
                                    setRefreshing(true);
                                    dispatch(getUserTempTrash(user.templatetrash))
                                    wait(500).then(() => setRefreshing(false))
                                }}    
                            >
                                <Text style={styles.confirmText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.cancelButton}
                                onPress={() => {
                                    confirmEmpty(false);
                                }}        
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            
            <View style={styles.container}>
                { !isLoading ? (
                    <View style={{flex: 1}}>
                        <View style={{marginTop: 45, alignItems: 'center'}}>
                            <Text style={{color: 'rgba(208,219,229,0.65)', textAlign: 'center'}}>Items in the trash will be deleted after 30 days</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    confirmEmpty(true)
                                }}
                            >
                                <Text style={{marginTop: 10,textAlign: 'center', color: '#ff6905',}}>Empty Trash Now</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            style={styles.templateList}
                            contentContainerStyle={{
                                paddingTop: 10
                            }}
                            data={trash}
                            keyExtractor={item => item._id}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={['#ff6905']}
                                    tintColor='white'
                                />
                            }
                            renderItem={({item, index}) => { 
                                var outline, selected;
                                if (item._id == select) {
                                    selected = true;
                                    outline = '#ff6905'
                                    templateId = item._id
                                    currentIndex = index;
                                } else {
                                    selected = false;
                                    outline = '#212433'
                                }
                                return (
                                    <Pressable 
                                        style={[
                                            styles.listingContainer,
                                            {
                                                borderColor: outline
                                            }
                                        ]}
                                        onPress={() => {
                                            setOpenModal(true);
                                            setSelect(item._id)
                                        }}
                                    >
                                        <View style={styles.imageContainer}>
                                            <Image
                                                source={require('../assets/icons/contracts-home.png')} 
                                                fadeDuration={0}
                                                style={styles.image}
                                            />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.title}>{item.template.title}</Text>
                                            <Text style={styles.created}>{item.template.created}</Text>
                                        </View>
                                    </Pressable>
                                )
                            }}
                        />
                    </View>
                ) : (
                    <View style={styles.centered}>
                        <ActivityIndicator 
                            size="large" 
                            color="#ffffff"
                        />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141824',
        height: '100%',
    },
    templateList: {
        marginTop: Platform.OS === 'ios' ? 25 : 5
    },
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
    },
    listingContainer: {
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
        height: Platform.OS === 'ios' ? 120 : 70,
        flexDirection: 'row',
        paddingBottom: 10,
        position: 'absolute',
        top: 0,
        width: '100%',
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
    centered: {
        justifyContent: 'center',
        alignItems: 'center', 
        flex: 1
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

const mapStateToProps = (state, ownProps) => {
    return {
        template: state.template,
        user: state.user.user
    }
}

const mapDispatchToProps = { deleteTemplate, templateNotTrash, emptyTemplateTrash }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateTrashScreen);