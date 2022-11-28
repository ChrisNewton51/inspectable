import React, {useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
    FontAwesome5, 
    MaterialCommunityIcons,
    AntDesign, 
    Feather, 
    Ionicons,
    Entypo,
    MaterialIcons
} from '@expo/vector-icons';
import CarouselCards from '../components/CarouselCards';
import { connect } from 'react-redux';
import { resetReport } from '../redux/actions/reportAction'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({user, resetReport}) => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <View style={{
                backgroundColor: '#282C3A',
                borderRadius: 10,
                paddingHorizontal: 20,
                marginBottom: 0,
                height: 47,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '90%',
                shadowColor: 'transparent',
                marginHorizontal: 20,
                marginTop: Platform.OS === 'ios' ? 70 : 40
            }}>
                <Text style={{
                    color: '#ffffff',
                    fontWeight: '300',
                    fontSize: 16
                }}>Welcome, {user.fullName}</Text>
                <View style={{marginTop: -25}}>
                    <MaterialIcons 
                        name="circle" 
                        size={22} 
                        color="#fff"
                        onPress={() => {navigation.navigate('Help')}} 
                        style={{
                            marginRight: 10,
                            zIndex: 1,
                            position: 'absolute',
                            top: 0,
                            right: 0
                        }}    
                    />
                    <Entypo 
                        name="help-with-circle" 
                        size={24} 
                        color="#ff6905"
                        onPress={() => {navigation.navigate('Help')}} 
                        style={{
                            marginRight: 10,
                            zIndex: 1,
                            position: 'absolute',
                            top: 0,
                            right: 0
                        }}    
                    />
                </View>
            </View>
            <ScrollView contentContainerStyle={{flexGrow:1, justifyContent: 'space-between', backgroundColor: '#141824'}} > 
                <View style={styles.quickLinks}>
                    <View style={styles.homeRow}>
                        <TouchableOpacity 
                            onPress={() => {
                                resetReport()
                                navigation.navigate('NewReport')
                            }}
                        >
                            <View style={styles.homeButton}>
                            <Image
                                source={require('../assets/icons/new-report.png')}
                                fadeDuration={0}
                                style={{ width: 32, height: 41 }}
                            />
                            </View>
                            <Text style={styles.homeText}>New Report</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Contracts')} //'Contracts' -> 'ContractList' has transition-no header
                        >
                            <View style={styles.homeButton}>
                            <Image
                                source={require('../assets/icons/contract.png')}
                                fadeDuration={0}
                                style={{ width: 32, height: 43 }}
                            />
                            </View>
                            <Text style={styles.homeText}>Contracts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => {
                                navigation.navigate("Reports")
                            }}
                        >
                            <View style={styles.homeButton}>
                            <Image
                                source={require('../assets/icons/reports.png')}
                                fadeDuration={0}
                                style={{ width: 32.5, height: 43 }}
                            />
                            </View>
                            <Text style={styles.homeText}>Reports</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.homeRow}>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('TemplateListScreen')}
                        >
                            <View style={styles.homeButton}>
                                <Image
                                    source={require('../assets/icons/templates-home.png')}
                                    fadeDuration={0}
                                    style={{ width: 35, height: 35 }}
                                />
                            </View>
                            <Text style={styles.homeText}>Templates</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <View style={styles.homeButton}>
                            <Image
                                source={require('../assets/icons/company.png')} 
                                fadeDuration={0}
                                style={{ width: 33, height: 38 }}
                            />
                            </View>
                            <Text style={styles.homeText}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navigation.navigate('Clients')}
                        >
                            <View style={styles.homeButton}>
                            <Image
                                source={require('../assets/icons/clients.png')} 
                                fadeDuration={0}
                                style={{ width: 40, height: 28 }}
                            />
                            </View>
                            <Text style={styles.homeText}>Clients</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.emptySpace}>
                    <Text style={styles.recent}>Recent</Text>
                    <CarouselCards />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141824',
        height: '100%'
    },
    quickLinks: {
        marginTop: Platform.OS === 'ios' ? 20 : 20
    },  
    homeButton: {
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        width: 65,
        height: 65,
        backgroundColor: '#282C3A',
        borderRadius: 7,
        marginHorizontal: 25,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: '#000',
        elevation: 5,
        shadowRadius: 6,
        shadowOpacity: .16
    },
    homeText: {
        paddingTop: 5,
        textAlign: 'center',
        color: '#D0DBE5',
        fontSize: 12
    },
    homeRow: {
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    homeIcon: {
        color: '#D0DBE5',
        fontWeight: '100',
    },
    contractIcon: {
        color: '#D0DBE5',
    },
    emptySpace: {
        flexGrow: 1,
        justifyContent:'center'
    },
    recent: {
        marginTop: 25,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        marginLeft: Platform.OS === 'ios' ? 39 : 35, 
        marginBottom: 10
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = { 
    resetReport
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);