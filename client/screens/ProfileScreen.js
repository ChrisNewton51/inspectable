import React, {useState, useEffect} from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    ScrollView, 
    TouchableOpacity, 
    Image, 
    Platform,
    TextInput,
    Alert
} from 'react-native';
import { AntDesign, MaterialIcons, Entypo } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import PaymentCard from '../components/PaymentCard';
import { connect } from 'react-redux';
import { logoutUser, changePassword, checkPassword } from '../redux/actions/authAction';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({user, logoutUser, changePassword, checkPassword}) => {

    const navigation = useNavigation();

    // Image Picker
    const [image, setImage] = useState(null);
    const [changeP, setChangeP] = useState(false);
    const [currentP, setCurrentP] = useState('');
    const [newP, setNewP] = useState('');
    const [confirmNewP, setConfirmNewP] = useState('');
    const [changeSuccess, setChangeSuccess] = useState('');

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
                    <View style={styles.imageButton}>
                        <MaterialIcons name="circle" size={85} color="rgba(208,219,229,.55)" style={{position: 'absolute'}}/>
                        <AntDesign name="user" size={30} color="#fff" />
                    </View>
                    {/*image && <Image source={{ uri: image }} style={styles.image} />*/}
                </View>
                <Text style={styles.headerTitle}>{user.fullName}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.text}>{user.email}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Password</Text>
                    <View style={[styles.text, {flexDirection: 'row'}]}>
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                        <MaterialIcons name="circle" size={9} color="#D0DBE5" />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setChangeP(!changeP)
                            if(changeP) {
                                setChangeSuccess(false)
                            }
                        }}
                    >
                        <Text style={[styles.button, {textAlign: 'left', paddingLeft: 12}]}>{!changeP ? 'Change' : 'Close'}</Text>
                    </TouchableOpacity>
                </View>
                {changeP ? (
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {changeSuccess ? (<Text style={{color:'white'}}>Password successfully changed</Text>) : null}
                        <TextInput 
                            style={styles.changeInput}
                            placeholder="Current Password"
                            secureTextEntry={true}
                            placeholderTextColor='rgba(208,219,229,0.55)'
                            onChangeText={(text) => {
                                setCurrentP(text)
                            }}
                        />
                        <TextInput 
                            style={styles.changeInput}
                            placeholder="New Password"
                            secureTextEntry={true}
                            placeholderTextColor='rgba(208,219,229,0.55)'
                            onChangeText={(text) => {
                                setNewP(text)
                            }}
                        />
                        <TextInput 
                            style={styles.changeInput}
                            placeholder="Confirm New Password"
                            secureTextEntry={true}
                            placeholderTextColor='rgba(208,219,229,0.55)'
                            onChangeText={(text) => {
                                setConfirmNewP(text)
                            }}
                        />
                        <TouchableOpacity
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#ff6905',
                                width: 165,
                                marginVertical: 20,
                                textAlign: 'center',
                                paddingVertical: 8,
                                borderRadius: 6                            
                            }}
                            onPress={() => {
                                var checkP; 
                                if (!currentP || !newP || !confirmNewP) {
                                    alert("Please fill in all fields")
                                } else {
                                    checkPassword(user.email, currentP)
                                        .then(test => {
                                            if (!test) {
                                                alert("Invalid current password")
                                            } else if (newP.length < 6) {
                                                alert("Password length needs to be longer than 6")
                                            } else if (newP !== confirmNewP) {
                                                alert("Passwords do not match");
                                            } else {
                                                changePassword(user.email, currentP, newP, confirmNewP)
                                                setChangeSuccess(true);
                                            }
                                        })
                                }
                            }}
                        >
                            <Text style={{
                                color: 'white',
                            }}>Change Password</Text>
                        </TouchableOpacity>
                    </View>
                ) : null }
                <View style={styles.row}>
                    <Text style={styles.label}>Phone</Text>
                    <Text style={styles.text}>{user.phone}</Text>
                </View>
                <View style={[styles.row, {marginBottom: 15, justifyContent: 'space-between'}]}>
                    <Text style={styles.label}>Billing</Text>
                    <Text style={styles.emptyText}></Text>
                    <TouchableOpacity>
                        <Text style={styles.button}>Add Payment</Text>
                    </TouchableOpacity>
                </View>
                <PaymentCard />
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
                width: '100%'
            }}>
                <TouchableOpacity 
                    style={styles.company}
                    onPress={() => {
                        navigation.navigate("Login")
                        logoutUser();
                    }}    
                >
                    <Text style={styles.companyText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141824',
        height: '100%'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },
    imageButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 25
    },
    image: {
       width: 71, 
       height: 71, 
       borderRadius: 100,
       marginTop: -75
    },
    headerTitle: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 10,
        color: '#fff'
    },
    headerContainer: {
        marginTop: Platform.OS === 'ios' ? 37 : 12,
        flexDirection: 'column',
        alignItems: 'center'
    },
    company: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282C3A',
        width: 105,
        textAlign: 'center',
        paddingVertical: 8,
        borderRadius: 6
    },
    companyText: {
        color: '#f73131',
        fontSize: 15
    },
    body: {
        flexDirection: 'column',
        marginTop: 40
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 25
    },
    label: {
        fontWeight: '500',
        fontSize: 13,
        color: '#fff',
        width: 85
    },
    text: {
        color: '#D0DBE5',
        textAlign: 'left',
        width: 190
    },
    emptyText: {
        width: 70
    },
    button: {
        color: '#ff6905',
        fontSize: 13
    },
    changeInput: {
        height: 40,
        width: '70%', 
        marginTop: 10,
        marginHorizontal: 10,
        backgroundColor: '#282C3A',
        borderRadius: 5,
        paddingHorizontal: 15,
        color: "#fff"
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = { 
    logoutUser,
    changePassword,
    checkPassword
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileScreen);