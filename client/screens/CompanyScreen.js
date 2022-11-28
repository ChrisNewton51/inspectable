import React, { useState, useEffect } from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    Platform, 
    TextInput, 
    ScrollView,
    TouchableOpacity,
    Button,
    Image
} from  'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';

const CompanyScreen = () => {

    // Dropdown 1
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'}
    ]);

    // Image Picker
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>                
                <View style={styles.imageContainer}>
                    <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                        <MaterialIcons name="circle" size={95} color="rgba(208,219,229,.55)" style={{position: 'absolute'}}/>
                        <FontAwesome5 name="home" size={40} color="#fff" />
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                </View>
                <Text style={styles.headerTitle}>Fake Company LLC</Text>
            </View>
            <Text style={styles.newReportTextFirst}>Inspector Info</Text>
            <View style={styles.halfContainer}>
                <TextInput 
                    style={styles.halfInput} 
                    placeholder="FIRST NAME"
                    placeholderTextColor='rgba(208,219,229,0.55)'
                />
                <TextInput 
                    style={styles.halfInput} 
                    placeholder="LAST NAME"
                    placeholderTextColor='rgba(208,219,229,0.55)'
                /> 
            </View>
            <View style={styles.fullContainer}>
                <TextInput
                    style={styles.fullInput}
                    placeholder="PHONE"
                    placeholderTextColor='rgba(208,219,229,0.55)'
                />
            </View>
            <Text style={styles.newReportText}>Office Location</Text>
            <View style={styles.fullContainer}>
                <TextInput
                    style={styles.fullInput}
                    placeholder="ADDRESS"
                    placeholderTextColor='rgba(208,219,229,0.55)'
                />
            </View>
            <View style={styles.halfContainerLast}>
                <TextInput 
                    style={styles.halfInput} 
                    placeholder="CITY"
                    placeholderTextColor='rgba(208,219,229,0.55)'
                />
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    theme="DARK"
                    placeholder="STATE"
                    containerStyle={{
                        width: '42%',
                        marginHorizontal: 10,
                        marginTop: 19
                    }}
                    style={{
                        height: 45,
                        borderColor: '#282C3A',
                        backgroundColor: '#282C3A',
                        borderRadius: 5,
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141824',
        height: '100%'
    },
    newReportTextFirst: {
        paddingTop: 5,
        marginTop: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#D0DBE5',
        fontSize: 16
    },
    newReportText: {
        paddingTop: 5,
        marginTop: 25,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#D0DBE5',
        fontSize: 16
    },
    halfContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    halfContainerLast: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 180
    },
    halfInput: {
        height: 45,
        width: '42%', 
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: '#282C3A',
        borderRadius: 5,
        paddingHorizontal: 15,
    },
    fullContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    fullInput: {
        height: 45,
        width: '90%', 
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: '#282C3A',
        borderRadius: 5,
        paddingHorizontal: 15
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS === 'ios' ? 30 : 0
    },
    imageButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 25
    },
    image: {
       width: 80, 
       height: 80, 
       borderRadius: 100,
       marginTop: -85
    },
    headerTitle: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff'
    },
    headerContainer: {
        
    }
});

export default CompanyScreen;