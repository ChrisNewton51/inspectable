import React from 'react';
import {View, StyleSheet, ImageBackground } from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {Drawer} from 'react-native-paper';
import {
    FontAwesome5, 
    AntDesign, 
    Feather, 
    Ionicons, 
    MaterialCommunityIcons
} from '@expo/vector-icons';

const ReportDrawerContent = (props) => {
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.topContent}>
                        <ImageBackground 
                            style={styles.topImage}
                            source={require('../assets/Logo.png')}
                        />
                        <Ionicons name="ios-close" size={22} onPress={() => props.navigation.closeDrawer()} color='#ffffff' />
                    </View>
                    <Drawer.Section style={styles.drawerSection}>
                    <DrawerItemList {...props} /> 
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color}) => (
                        <FontAwesome5
                            name="question-circle" 
                            color='#d0dbe5'
                            size={24}
                        />
                    )}
                    label="Help"
                    labelStyle={{color: '#d0dbe5'}}
                    onPress={() => {props.navigation.navigate('Home', {screen: 'Help'}); props.navigation.closeDrawer()}}
                />
            </Drawer.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#d0dbe5'
    },
    topImage: {
        width: 110,
        height: 25,
    },
    drawerContent: {
      flex: 1,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        borderTopWidth: 0.5,
        borderTopColor: '#d0dbe5'
    }
});

export default ReportDrawerContent;
