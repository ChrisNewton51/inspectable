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
    ActivityIndicator,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    createClientContract
} from '../redux/actions/contractAction';
import { 
    fetchClientContracts, 
    searchCC, 
    viewContract,
    markSigned,
    changeSign,
    changeContractId
} from '../redux/actions/clientContractAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    Entypo,
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    AntDesign
} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import filter from 'lodash.filter';

var contractId, currentSign;

const ClientContractScreen = ({searchCC, viewContract, markSigned, clientContract, changeSign, changeContractId}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {clientcontracts} = useSelector(state => state.CCList)
    const {search} = useSelector(state => state.CCList)

    const [refreshing, setRefreshing] = useState(false)
    const [select, setSelect] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [query, setQuery] = useState('');

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
 
    useEffect(() => {
        setIsLoading(true);
        dispatch(fetchClientContracts())
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [dispatch]) 
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(fetchClientContracts())
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const contains = ({ address, clientFirstName, clientLastName }, query) => {
        if (address.includes(query) || clientFirstName.includes(query) || clientLastName.includes(query)) {
            return true;
        }
        return false;
    };

    const handleSearch = text => {
        const formattedQuery = text;
        const filteredData = filter(clientcontracts, user => {
            return contains(user, formattedQuery);
        });
        searchCC(filteredData)
        setQuery(text);
    };

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
                                markSigned(currentSign, contractId)
                                setSelect()
                                setOpenModal(false);
                            }}    
                        >
                            <AntDesign 
                                name="checkcircleo" 
                                size={18} 
                                color="#D0DBE5" 
                                style={styles.headerPopupIcon} 
                            />
                            <Text style={styles.headerPopupText}>Mark {clientContract.signed === "Signed" ? "Unsigned" : "Signed"}</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={styles.headerPopupSection}
                            onPress={() => {
                                navigation.navigate("ViewClientContractScreen")
                                setOpenModal(false);
                                viewContract(contractId)
                                setSelect()
                            }}    
                        >
                            <MaterialCommunityIcons 
                                name="pencil-outline" 
                                size={18} 
                                color="#D0DBE5" 
                                style={styles.headerPopupIcon} 
                            />
                            <Text style={styles.headerPopupText}>View</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            </Modal>
            
            <View style={styles.container}>
                { !isLoading ? (
                    <FlatList
                        ListHeaderComponent={
                            <View>
                                <View
                                    style={{
                                        display: 'flex',
                                        backgroundColor: '#282C3A',
                                        justifyContent: 'center',
                                        padding: 10,
                                        paddingHorizontal: 50,
                                        marginVertical: 10,
                                        borderRadius: 10,
                                        shadowOffset: {
                                            width: 0,
                                            height: 3
                                        },
                                        shadowColor: 'black',
                                        shadowRadius: 6,
                                        shadowOpacity: 0.16,
                                        marginTop: 20,
                                        width: '90%',
                                        position: 'absolute',
                                        zIndex: 9999,
                                        height: 47,
                                        marginHorizontal: 20,
                                    }}
                                >
                                    <MaterialIcons 
                                        name="menu" 
                                        size={24} 
                                        style={{
                                            marginLeft: 17,
                                            color:'#ffffff',
                                            position: 'absolute',
                                        }} 
                                        onPress={() => {navigation.openDrawer()}} 
                                    />
                                    <TextInput
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        clearButtonMode="always"
                                        value={query}
                                        blurOnSubmit={false}
                                        removeClippedSubviews={false}
                                        onChangeText={(queryText) => {
                                            handleSearch(queryText)
                                        }}
                                        placeholder="Search client contracts"
                                        placeholderTextColor='rgba(208,219,229,0.55)'
                                        style={{ 
                                            backgroundColor: '#282C3A',
                                            color: "#fff", 
                                            paddingHorizontal: 20 }}
                                    />
                                    <AntDesign 
                                        name="search1" 
                                        size={20} 
                                        color="#D0DBE5" 
                                        style={{
                                            right: 17,
                                            position: 'absolute',
                                        }}
                                    />
                                </View>
                                <View style={{height: 80}}></View>
                            </View>
                        }
                        contentContainerStyle={{
                            paddingTop: 35,
                            paddingBottom: 100,
                        }}
                        data={search}
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
                                contractId = item._id
                                currentSign = item.signed
                                
                            } else {
                                selected = false;
                                outline = '#212433'
                            }
 
                            if (item.signed == 'Signed') {
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
                                        changeSign(item.signed)
                                        changeContractId(item._id)
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
                                        <Text style={[styles.complete, {color: completeColor}]}>{item.signed}</Text>
                                    </View>
                                </Pressable>
                            )
                        }}
                    />
                ) : (
                    <View style={styles.centered}>
                        <ActivityIndicator 
                            style={{marginTop: 200}}
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
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        report: state.report.report,
        clientContract: state.clientContract
    }
}

const mapDispatchToProps = { 
    createClientContract, 
    searchCC,
    viewContract,
    markSigned,
    changeSign,
    changeContractId
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientContractScreen);