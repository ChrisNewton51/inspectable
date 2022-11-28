import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Platform, View, Animated} from 'react-native';

import ClientsScreen from '../screens/ClientsScreen';
import CompanyScreen from '../screens/CompanyScreen';
import ContractListScreen from '../screens/ContractListScreen';
import HomeScreen from '../screens/HomeScreen';
import NewReportScreen from '../screens/NewReportScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReportListScreen from '../screens/ReportListScreen';
import TemplateListScreen from '../screens/TemplateListScreen';
import ContractEditorScreen from '../screens/ContractEditorScreen';
import TemplateEditorScreen from '../screens/TemplateEditorScreen';
import ClientContractsScreen from '../screens/ClientContractsScreen';
import ContractTrashScreen from '../screens/ContractTrashScreen';
import ReportTrashScreen from '../screens/ReportTrashScreen';
import TemplateTrashScreen from '../screens/TemplateTrashScreen';
import HelpScreen from '../screens/HelpScreen';
import ReportEditorScreen from '../screens/ReportEditorScreen';
import ViewClientContractScreen from '../screens/ViewClientContractScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import {
    MaterialIcons, 
    MaterialCommunityIcons,
    FontAwesome5, 
    FontAwesome,
    Foundation, 
    AntDesign, 
    Feather, 
    Ionicons,
    Entypo
} from '@expo/vector-icons';

import ContractDrawerContent from './ContractDrawerContent';
import ReportDrawerContent from './ReportDrawerContent';
import TemplateDrawerContent from './TemplateDrawerContent';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Drawer Icon //
const HeaderLeft = () => {
    const navigation = useNavigation();
    return (
        <MaterialIcons 
            name="menu" 
            size={24} 
            style={{
                marginLeft: 35,
                color:'#ffffff',
                position: 'absolute',
                top: Platform.OS === 'ios' ? 32 : 16,
                zIndex: 1
            }} 
            onPress={() => {navigation.openDrawer()}} />
    );
}
// Back Arrow //
const BackLeft = () => {
    const navigation = useNavigation();
    return (
        <Entypo
            name="chevron-thin-left" 
            size={20} 
            style={{
                marginLeft: 35,
                color:'#ffffff',
                position: 'absolute',
                top: Platform.OS === 'ios' ? 33 : 18,
                zIndex: 1
            }} 
            onPress={() => {navigation.goBack()}} 
        />
    )
}

// Animations //
const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          })
        : 0
    );
  
    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  screen.width, // Focused, but offscreen in the beginning
                  0, // Fully focused
                  screen.width * -0.3, // Fully unfocused
                ],
                extrapolate: 'clamp',
              }),
              inverted
            ),
          },
        ],
      },
    };
};

// Home Navigation //
const HomeHeaderRight = props => {
    return (
        <View>
            <MaterialIcons 
                name="circle" 
                size={22} 
                color="#fff"
                onPress={() => {props.navigation.navigate('Home', {screen: 'Help'})}} 
                style={{
                    marginRight: 42,
                    marginTop: Platform.OS === 'ios' ? 32 : 18,
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
                onPress={() => {props.navigation.navigate('Home', {screen: 'Help'})}} 
                style={{
                    marginRight: 40,
                    marginTop: Platform.OS === 'ios' ? 29 : 15,
                    zIndex: 1,
                    position: 'absolute',
                    top: 0,
                    right: 0
                }}    
            />
        </View>
    );
}
const NewReportRight = props => {
    return (
        <Feather 
            name="edit" 
            size={22} 
            color="#ff6905"
            onPress={() => props.navigation.navigate('Reports', {screen: 'TemplateListScreen'})}
            style={{
                marginRight: 37,
                marginTop: Platform.OS === 'ios' ? 31 : 17,
                zIndex: 20,
                position: 'absolute',
                top: 0,
                right: 0
            }}    
        />
)
}
function HomeNavigator(props) {
    return (
        <Stack.Navigator 
            mode='modal' 
            screenOptions={{headerLeft:null, unmountOnBlur: true, cardStyleInterpolator: forSlide}} //...TransitionPresets.SlideFromRightIOS
        >
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="NewReport" 
                component={NewReportScreen} 
                options={{
                    headerLeft: () => ( <BackLeft /> ),
                    headerRight: () => ( <NewReportRight navigation={props.navigation} /> ),
                    title: "New Report",
                    headerStyle: {
                        backgroundColor: '#141824',
                        shadowColor: 'transparent', 
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0,
                        shadowOffset: {
                            width: 0,
                            height: 3
                        },
                        shadowColor: '#000',
                        elevation: Platform.OS === 'ios' ? 0 : 0,
                        shadowRadius: 8,
                        shadowOpacity: .2,
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerBackTitleStyle: {opacity: 0},
                    headerTintColor: '#ffffff'
                }}
            />
            <Stack.Screen 
                name="ReportEditorScreen" 
                component={ReportEditorScreen} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="ViewClientContractScreen" 
                component={ViewClientContractScreen} 
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen 
                name="ContractList" 
                component={ContractNavigator} 
                options = {{

                }}
            />
            <Stack.Screen 
                name="Company" 
                component={CompanyScreen} 
                options={{
                    headerLeft: () => ( <BackLeft /> ),
                    title: "CompanyName",
                    headerStyle: {
                       backgroundColor: '#141824',
                       shadowColor: 'transparent'
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerTintColor: '#ffffff'
                }}
            />
            <Stack.Screen name="ReportList" component={ReportNavigator} options={{headerShown: false}}/>
            <Stack.Screen 
                name="Clients" 
                component={ClientsScreen} 
                options={{
                    headerShown: false,
                }}     
            />
            <Stack.Screen 
                name="Help" 
                component={HelpScreen}
                options={{
                    headerLeft: () => ( <BackLeft /> ),
                    title: "Help",
                    headerStyle: {
                       backgroundColor: '#141824',
                       shadowColor: 'transparent'
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerTintColor: '#ffffff'
                }}
            /> 
            <Stack.Screen 
                name="TemplateListScreen" 
                component={TemplateNavigator}
                options={{
                    headerShown: false,
                    drawerIcon: config => <MaterialCommunityIcons name="pencil-box-multiple-outline" color='#d0dbe5' size={24} />,
                    title: 'Templates'
                }}
            />
        </Stack.Navigator>
    );
};

// Contracts Drawer Navigation //
function ContractListNavigator() {
    return (
        <Stack.Navigator screenOptions={{ unmountOnBlur: true, headerLeft: () => <HeaderLeft /> }} >
            <Stack.Screen 
                name="ContractListScreen" 
                component={ContractListScreen} 
                options={{
                    title: "Contracts",
                    headerStyle: {
                       backgroundColor: '#141824',
                       shadowColor: 'transparent'
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerTintColor: '#ffffff'
                }}
            />
            <Stack.Screen 
                name="ContractEditorScreen" 
                component={ContractEditorScreen} 
                options={{
                    headerShown: false,
                    headerLeft: () => ( <BackLeft /> ),
                    title: "New Contract",
                    headerStyle: {
                       backgroundColor: '#141824',
                       shadowColor: 'transparent'
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        borderColor: '#707070',
                        borderTopWidth: 0.3,
                        borderBottomWidth: 0.3,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerTintColor: '#ffffff'
                }}
            />
        </Stack.Navigator>
    );
};

function ClientContractsNavigator() {
    return (
        <Stack.Navigator screenOptions={{ unmountOnBlur: true, headerLeft: () => <HeaderLeft /> }} >
            <Stack.Screen 
                name="ClientContractsScreen" 
                component={ClientContractsScreen} 
                options={{
                    headerShown: false,
                }} 
                />
        </Stack.Navigator>
    );
};

function ContractTrashNavigator() {
    return (
        <Stack.Navigator screenOptions={{ unmountOnBlur: true, headerLeft: () => <HeaderLeft /> }} >
            <Stack.Screen 
                name="ContractTrashScreen" 
                component={ContractTrashScreen} 
                options={{
                    title: "Trash",
                    headerStyle: {
                       backgroundColor: '#141824',
                       shadowColor: 'transparent'
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerTintColor: '#ffffff'
                }}
            />
        </Stack.Navigator>
    );
};

function ContractNavigator() {
    return  (
        <Drawer.Navigator 
            drawerStyle={{backgroundColor: '#282C3A'}}
            drawerContentOptions={{
                activeBackgroundColor: '#212433', 
                inactiveBackgroundColor: '#282C3A', 
                activeTintColor: '#ffffff',
                inactiveTintColor: '#d0dbe5',
                
                }}
            screenOptions={({ navigation, route }) => ({ unmountOnBlur: true })}
            drawerContent={(props) => <ContractDrawerContent {...props} />} 
        >
            <Drawer.Screen 
                name="AllContracts" 
                component={ContractListNavigator}
                options={{
                    drawerIcon: config => <Foundation name="page-multiple" color= '#d0dbe5' size={24} />,
                    title: 'All Contracts',
                    
                }}
            />
            <Drawer.Screen 
                name="ClientContracts" 
                component={ClientContractsNavigator} 
                options={{
                    drawerIcon: config => <FontAwesome5 name="file-contract" color='#d0dbe5' size={24} />,
                    title: 'Client Contracts'
                }}
            />
            <Drawer.Screen 
                name="ContractTrash" 
                component={ContractTrashNavigator} 
                options={{
                    drawerIcon: config => <Feather name="trash-2" color='#d0dbe5' size={24} />,
                    title: 'Trash'
                }}
            />
        </Drawer.Navigator>
    );
};

// Reports Drawer Navigation //
function ReportListNavigator(props) {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                unmountOnBlur: true,
                headerLeft: () => <HeaderLeft />
            }} >
            <Stack.Screen 
                name="ReportListScreen" 
                component={ReportListScreen}  
                options={{
                    headerShown: false,
                }} 
            />
        </Stack.Navigator>
    );
};

function ReportTrashNavigator(props) {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                unmountOnBlur: true,
                headerLeft: () => <HeaderLeft />
            }} >
            <Stack.Screen 
                name="ReportTrashScreen" 
                component={ReportTrashScreen} 
                options={{
                    title: "Trash",
                    headerStyle: {
                       backgroundColor: '#141824',
                       shadowColor: 'transparent'
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerTintColor: '#ffffff'
                }}
                />
        </Stack.Navigator>
    );
};

function ClientsNavigator(props) {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                unmountOnBlur: true,
                headerLeft: () => <HeaderLeft />
            }} >
             <Stack.Screen 
                name="ClientsScreen" 
                component={ClientsScreen} 
                options={{
                    headerShown: false
                }}
                />
        </Stack.Navigator>
    );
};

function ReportNavigator(props) {
    return  (
        <Drawer.Navigator
            drawerStyle={{backgroundColor: '#282C3A'}}
            drawerContentOptions={{
                activeBackgroundColor: '#212433',
                inactiveBackgroundColor: '#282C3A',
                activeTintColor: '#ffffff',
                inactiveTintColor: '#d0dbe5'
            }}
            screenOptions={({ navigation, route }) => ({ unmountOnBlur: true })}
            drawerContent={(props) => <ReportDrawerContent {...props} />} >
            <Drawer.Screen 
                name="AllReports" 
                component={ReportListNavigator}
                options={{
                    drawerIcon: config => <MaterialCommunityIcons name="newspaper-variant-multiple-outline" color='#d0dbe5' size={24} />,
                    title: 'All Reports'
                }}
            />
            <Drawer.Screen 
                name="Clients" 
                component={ClientsNavigator}
                options={{
                    drawerIcon: config => <MaterialCommunityIcons name="account-group-outline" color='#d0dbe5' size={24} />,
                    title: 'Clients'
                }}
            />
            <Drawer.Screen 
                name="ReportTrash" 
                component={ReportTrashNavigator}
                options={{
                    drawerIcon: config => <Feather name="trash-2" color='#d0dbe5' size={24} />,
                    title: 'Trash'
                }}
            />
        </Drawer.Navigator>
    );
};

// Templates Drawer Navigation //
function TemplateListNavigator() {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                unmountOnBlur: true,
                headerLeft: () => <HeaderLeft />
            }} >
            <Stack.Screen 
                name="TemplateListScreen" 
                component={TemplateListScreen} 
                options={{
                    title: "Templates",
                    headerStyle: {
                       backgroundColor: '#141824',
                       shadowColor: 'transparent'
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerTintColor: '#ffffff'
                }}
            />
            <Stack.Screen 
                name="TemplateEditorScreen" 
                component={TemplateEditorScreen}
                options={{
                    headerShown: false,
                    headerLeft: () => ( <BackLeft /> ),
                    title: "",
                    headerStyle: {
                       backgroundColor: '#141824',
                       shadowColor: 'transparent'
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerTintColor: '#ffffff'
                }}
            /> 
        </Stack.Navigator>
    );
};

function TemplateTrashNavigator() {
    return (
        <Stack.Navigator 
            screenOptions={{ 
                unmountOnBlur: true,
                headerLeft: () => <HeaderLeft />
            }} >
            <Stack.Screen 
                name="TemplateTrashScreen" 
                component={TemplateTrashScreen} 
                options={{
                    title: "Trash",
                    headerStyle: {
                       backgroundColor: '#141824',
                       shadowColor: 'transparent'
                    },
                    headerTitleContainerStyle: {
                        flex: 1,
                        backgroundColor: '#282C3A',
                        borderRadius: 10,
                        paddingHorizontal: 20,
                        marginBottom: 10,
                        height: 47,
                        justifyContent: 'center',
                        width: '90%',
                        position: 'absolute',
                        zIndex: Platform.OS === 'ios' ? -1 : 0,
                        top: Platform.OS === 'ios' ? -30 : 5,
                        marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                        marginLeft: Platform.OS === 'ios' ? 20 : -53,
                        marginTop: Platform.OS === 'ios' ? 50 : 0
                    },
                    headerTitleStyle: {
                        color: '#ffffff',
                        fontWeight: '300',
                        fontSize: 17,
                        textAlign: 'center'
                    },
                    headerTintColor: '#ffffff'
                }}
                />
        </Stack.Navigator>
    );
};

function TemplateNavigator() {
    return (
        <Drawer.Navigator 
            drawerStyle={{backgroundColor: '#282C3A'}}
            drawerContentOptions={{
                activeBackgroundColor: '#212433',
                inactiveBackgroundColor: '#282C3A',
                activeTintColor: '#ffffff',
                inactiveTintColor: '#d0dbe5'
            }}
            screenOptions={({ navigation, route }) => ({ unmountOnBlur: true })}
            drawerContent={(props) => <TemplateDrawerContent {...props} />} >
            <Drawer.Screen 
                name="AllTemplates" 
                component={TemplateListNavigator}
                options={{
                    drawerIcon: config => <MaterialCommunityIcons name="pencil-box-multiple-outline" color='#d0dbe5' size={24} />,
                    title: 'Templates'
                }}
            />
            <Drawer.Screen 
                name="TemplateTrash" 
                component={TemplateTrashNavigator}
                options={{
                    drawerIcon: config => <Feather name="trash-2" color='#d0dbe5' size={24} />,
                    title: 'Trash'
                }}
            />
        </Drawer.Navigator>
    );
};
function ProfileNavigator() {
    return (
        <Stack.Navigator screenOptions={{ unmountOnBlur: true, headerLeft: () => <BackLeft /> }}>
            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    title: "Profile",
                    headerStyle: {
                        backgroundColor: '#141824',
                        shadowColor: 'transparent'
                     },
                     headerTitleContainerStyle: {
                         flex: 1,
                         backgroundColor: '#282C3A',
                         borderRadius: 10,
                         paddingHorizontal: 20,
                         marginBottom: 10,
                         height: 47,
                         justifyContent: 'center',
                         width: '90%',
                         position: 'absolute',
                         zIndex: Platform.OS === 'ios' ? -1 : 0,
                         top: Platform.OS === 'ios' ? -30 : 5,
                         marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                         marginLeft: Platform.OS === 'ios' ? 20 : -53,
                         marginTop: Platform.OS === 'ios' ? 50 : 0
                     },
                     headerTitleStyle: {
                         color: '#ffffff',
                         fontWeight: '300',
                         fontSize: 17,
                         textAlign: 'center'
                     },
                     headerTintColor: '#ffffff'
                 }}
                />
        </Stack.Navigator>
    );
};

function MainNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    let iconName, iconColor;

                    iconColor = focused ? '#ff6905' : 'rgba(208,219,229,.55)';

                    if(route.name == "Home") {
                        return <AntDesign name="home" size={24} color={iconColor} />
                    } else if(route.name == "Contracts") {
                        return <MaterialCommunityIcons name="file-document-edit-outline" size={26} color={iconColor} />
                    } else if(route.name == "Profile") {
                        return <AntDesign name="user" size={25} color={iconColor} />
                    } else if (route.name == "Reports") {
                        return <AntDesign name="filetext1" size={24} color={iconColor} />
                    }
                    
                    

                    
                },
            })}
            tabBarOptions={{
                activeTintColor: '#ff6905',
                inactiveTintColor: '#d0dbe5',
                style: 
                {
                    backgroundColor: '#282c3a',
                    height: Platform.OS === 'ios' ? 75 : 60,
                    borderTopWidth: 0,
                    paddingBottom: Platform.OS === 'ios' ? 25 : 10, 
                    paddingTop: 10,
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeNavigator} />
            <Tab.Screen name="Contracts" component={ContractNavigator} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
            <Tab.Screen name="Reports" component={ReportNavigator} />
        </Tab.Navigator>
    );
}

//App Navigation (Tab Navigation)
function AppNavigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Main"
                    component={MainNavigator}
                    options={{headerShown: false, headerLeft: null}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;