import React, { useState, useEffect } from 'react';
import {
    StyleSheet, 
    View, 
    FlatList, 
    Platform,
    TextInput,
    RefreshControl,
    ActivityIndicator
} from 'react-native';
import {
    Entypo,
    Feather,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    AntDesign
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { fetchClients, searchClients, getUserClients } from '../redux/actions/clientAction';
import { connect, useDispatch, useSelector } from 'react-redux';
import filter from 'lodash.filter';

import Client from '../components/Client';
 
const ClientsScreen = ({user, clients, searchClients}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {search} = useSelector(state => state.clients)
    const clnts = user.clients
    const [refreshing, setRefreshing] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const [query, setQuery] = useState('');

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    useEffect(() => { 
        setIsLoading(true);
        dispatch(getUserClients(clnts))
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, [dispatch]) 

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(getUserClients(clnts))
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const contains = ({ firstName, lastName, reports }, query) => {
        for(var i = 0; i < reports.length; i++) {
            if(reports[i].address.toLowerCase().includes(query)) {
                return true;
            }
        }

        if (firstName.toLowerCase().includes(query) || lastName.toLowerCase().includes(query)) {
            return true;
        }
      
        return false;
    };

    const handleSearch = text => {
        const formattedQuery = text;
        const filteredData = filter(clients, user => {
            return contains(user, formattedQuery);
        });
        searchClients(filteredData)
        setQuery(text);
    };

    return (
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
                                <Entypo
                                    name="chevron-thin-left" 
                                    size={20} 
                                    style={{
                                        marginLeft: 17,
                                        color:'#ffffff',
                                        position: 'absolute',
                                    }} 
                                    onPress={() => {navigation.goBack()}} 
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
                                    placeholder="Search clients"
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
                    style={styles.reportList}
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

                        return (
                            <Client 
                                name={item.firstName.trim() + " " + item.lastName.trim()}
                                email={item.email}
                                phone={item.phoneNumber}
                                reports={item.reports}
                            />
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
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141824',
        height: '100%',
    },
    clientsContainer: {
        marginTop: Platform.OS === 'ios' ? 55 : 25,
        marginBottom: 30
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
});

const mapStateToProps = (state, ownProps) => {
    return {
        clients: state.clients.clients,
        user: state.user.user
    }
}

const mapDispatchToProps = {
    fetchClients,
    searchClients
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientsScreen);