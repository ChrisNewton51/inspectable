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
    createTemplate, 
    fetchTemplates,
    editTemplate, 
    duplicateTemplate,
    trashTemplate,
    changeCurrentId,
    changeUserId,
    getUserTemplates
} from '../redux/actions/templateAction';
import { updateUser } from '../redux/actions/authAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    Entypo,
    Feather,
    Ionicons,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import Modal from 'react-native-modal';

var templateId, currentIndex;

const TemplateListScreen = ({user, template, createTemplate, editTemplate, duplicateTemplate, trashTemplate, changeCurrentId, updateUser}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {templates} = useSelector(state => state.templateList)
    const temps = user.templates;
    
    const [refreshing, setRefreshing] = useState(false)
    const [select, setSelect] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 


    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getUserTemplates(temps))
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        dispatch(getUserTemplates(temps))
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
                    setOpenModal(!openModal)
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
                                duplicateTemplate(templateId, user.id, user)
                                setSelect()
                                setRefreshing(true);
                                dispatch(getUserTemplates(temps))
                                wait(500).then(() => setRefreshing(false))
                                setOpenModal(false)
                            }}
                        >
                            <Ionicons
                                name="duplicate-outline" 
                                size={18} 
                                color="#D0DBE5" 
                                style={styles.headerPopupIcon} 
                            />
                            <Text style={styles.headerPopupText}>Duplicate</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.headerPopupSection}
                            onPress={() => {
                                navigation.navigate("TemplateEditorScreen")
                                setOpenModal(false);
                                editTemplate(templateId)
                                setSelect()
                            }}    
                        >
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
                                trashTemplate(templateId, user.id, user)
                                setSelect()
                                setRefreshing(true);
                                dispatch(getUserTemplates(temps))
                                wait(500).then(() => setRefreshing(false))
                                setOpenModal(false)
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
            </Modal>
            
            <View style={styles.container}>
                { !isLoading ? (
                    <FlatList
                        style={styles.templateList}
                        contentContainerStyle={{
                            paddingTop: 20
                        }}
                        data={templates}
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
                            var outline;
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
                                <View>
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
                                            changeCurrentId(item._id)
                                        }}
                                    >
                                        <View style={styles.imageContainer}>
                                            <Image
                                                source={require('../assets/icons/templates-home.png')} 
                                                fadeDuration={0}
                                                style={styles.image}
                                            />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.title}>{item.template.title}</Text>
                                            <Text style={styles.created}>{item.template.created}</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            )
                        }}
                    />
                ) : (
                    <View style={styles.centered}>
                        <ActivityIndicator 
                            size="large" 
                            color="#ffffff"
                        />
                    </View>
                )}
                <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate("TemplateEditorScreen")
                        createTemplate(template, user.id, user)
                    }}
                    style={styles.float}
                >
                    <Feather style={styles.floatIcon} name="edit-2" size={18} color="white" />
                    <Text style={styles.floatText}>New</Text>
                </TouchableOpacity>
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
        marginTop: Platform.OS === 'ios' ? 25 : 5,
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
        width: 45,
        height: 45,
        resizeMode: 'contain',
        opacity: 0.6
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
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        template: state.template,
        user: state.user.user
    }
}

const mapDispatchToProps = { 
    createTemplate, 
    editTemplate, 
    duplicateTemplate,
    trashTemplate,
    changeCurrentId,
    changeUserId,
    updateUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateListScreen);