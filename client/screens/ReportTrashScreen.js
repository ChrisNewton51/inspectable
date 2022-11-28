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
    fetchReportTrash, 
    deleteReport, 
    reportNotTrash, 
    emptyReportTrash,
    changeReportId,
    findTrashReport,
    getUserRepTrash
} from '../redux/actions/reportAction';
import { fetchClients, updateClient, deleteClient } from '../redux/actions/clientAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    Entypo,
    MaterialIcons,
    MaterialCommunityIcons,
    Ionicons
} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { add } from 'lodash';

var reportId, currentIndex;
var addresses = [];

const ReportTrashScreen = ({user, deleteReport, reportNotTrash, emptyReportTrash, changeReportId, clients, findTrashReport, report, fetchClients, updateClient, deleteClient}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {trash} = useSelector(state => state.reportList)
    const repTrash = user.reporttrash
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
        dispatch(getUserRepTrash(repTrash))
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        setIsLoading(true);
        fetchClients();
        dispatch(getUserRepTrash(repTrash))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }, [dispatch])

    for(var i = 0; i < clients.length; i++) {
        addresses[i] = clients[i].reports;
    }

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
                                reportNotTrash(reportId, user.id, user)
                                setSelect()
                                setRefreshing(true);
                                setOpenModal(false);
                                dispatch(getUserRepTrash(repTrash))
                                wait(1000).then(() => setRefreshing(false));
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
                                        for (var j = 0; j < clients.length; j++) {
                                            if (report.clientEmail.toLowerCase().trim() == clients[j].email.toLowerCase().trim()) {
                                                
                                                var newClient = clients[j];
                                                var address = addresses[j];
                                                if (clients[j].reports.length > 1) {
                                                    for(var k = 0; k < address.length; k++) {
                                                        if (address[k].address.toLowerCase().trim().replace(/ /g, '') == report.address.toLowerCase().trim().replace(/ /g, '')) {
                                                            address.splice(k,1);
                                                            newClient.reports = address;
                                                            updateClient(clients[j]._id, newClient)
                                                        }
                                                    }
                                                    deleteReport(reportId, currentIndex, user.id, user)
                                                } else {
                                                    deleteClient(clients[j]._id, user.id, user)
                                                    deleteReport(reportId, currentIndex, user.id, user)
                                                }
                                            } 
                                        }
                                        setSelect()
                                        confirmTrash(false);
                                        setOpenModal(false);
                                        setRefreshing(true);
                                        dispatch(getUserRepTrash(repTrash))
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
                                    for (var p = 0; p < trash.length; p++) {
                                        findTrashReport(trash[p]._id);
                                        for (var j = 0; j < clients.length; j++) {
                                            if (report.clientEmail.toLowerCase().trim() == clients[j].email.toLowerCase().trim()) {
                                                var newClient = clients[j];
                                                var address = addresses[j];
                                                if (clients[j].reports.length > 1) {
                                                    for(var k = 0; k < address.length; k++) {
                                                        if (address[k].address.toLowerCase().trim().replace(/ /g, '') == report.address.toLowerCase().trim().replace(/ /g, '')) {
                                                            address.splice(k,1);
                                                            newClient.reports = address;
                                                            updateClient(clients[j]._id, newClient)
                                                        }
                                                    }
                                                    deleteReport(trash[p]._id)
                                                } else {
                                                    deleteClient(clients[j]._id)
                                                    deleteReport(trash[p]._id)
                                                }
                                            } 
                                        }
                                    }
                                    setSelect()
                                    confirmEmpty(false);
                                    setOpenModal(false);
                                    setRefreshing(true);
                                    dispatch(getUserRepTrash(repTrash))
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
                            { /*<TouchableOpacity
                                onPress={() => {
                                    confirmEmpty(true)
                                }}
                            >
                                <Text style={{marginTop: 10,textAlign: 'center', color: '#ff6905',}}>Empty Trash Now</Text>
                            </TouchableOpacity> */ }
                        </View>
                        <FlatList
                            style={styles.reportList}
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
                                var itemTop = -10 + (index + 1) * 85;
                                var outline, selected, completeColor;
                                if (item._id == select) {
                                    selected = true;
                                    outline = '#ff6905'
                                    reportId = item._id
                                    currentIndex = index;
                                } else {
                                    selected = false;
                                    outline = '#212433'
                                }
    
                                if (item.completed == 'Completed') {
                                    completeColor = '#00D81E'
                                } else {
                                    completeColor = '#F73131'
                                }
    
                                return (
                                    <Pressable 
                                        style={[
                                            styles.listingContainer,
                                            {
                                                borderColor: outline,
                                                left: -5
                                            }
                                        ]}
                                        onPress={() => {
                                            setOpenModal(true);
                                            setSelect(item._id)
                                            findTrashReport(item._id);
                                            changeReportId(item._id)
                                        }}
                                    >
                                        <View style={styles.imageContainer}>
                                            {selected ? (
                                                <View style={styles.selectedContainer}>
                                                    <MaterialCommunityIcons 
                                                        name="circle" 
                                                        color="#D0DBE5"
                                                        size={72}
                                                        style={{
                                                            marginLeft: 0,
                                                            marginTop: -8
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
                                                    source={{uri: item.image }} 
                                                    style={styles.image}
                                                />
                                            }
                                        </View>
                                        <View style={styles.textContainer}> 
                                            <View style={styles.addressContainer}>
                                                <Text style={styles.address}>
                                                    {item.address.length > 23 ? item.address.slice(0,23) + '...' : item.address}
                                                </Text>
                                                <Text style={styles.created}>{item.date}</Text>
                                            </View>
                                            <Text style={styles.name}>{item.clientFirstName} {item.clientLastName}</Text>
                                            <Text style={[styles.complete, {color: completeColor}]}>{item.completed}</Text>
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
        paddingHorizontal: 5,
        width: '25%'
    },
    textContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '80%',
        paddingLeft: 15,
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
        fontSize: 10,
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
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    headerPopup: {
        backgroundColor: '#282C3A',
        height: 110,
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
    selectedContainer: {
        justifyContent: 'center',
        alignItems: 'center'
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
        report: state.report,
        clients: state.clients.clients,
        user: state.user.user
    }
}

const mapDispatchToProps = { 
    deleteReport, 
    reportNotTrash, 
    emptyReportTrash, 
    changeReportId,
    fetchClients,
    findTrashReport,
    updateClient,
    deleteClient
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportTrashScreen);