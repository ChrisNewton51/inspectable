import React, {useState} from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    ScrollView, 
    KeyboardAvoidingView, 
    Image,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert
} from 'react-native'; 
import {Formik} from 'formik';
import * as yup from 'yup';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons, Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons'

import * as authAction from '../redux/actions/authAction';

const formSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6)
});

const LoginScreen = ({user}) => {

    const navigation = useNavigation();

    const [showMain, setShowMain] = useState(true);
    const [checkEmailM, setCheckEmailM] = useState(false);
    const [cEmail, setCEmail] = useState('');
    const [questAcc, setQuestAcc] = useState('');
    const [showQuest, setShowQuest] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [answer3, setAnswer3] = useState('');
    const [newP, setNewP] = useState('');
    const [confirmNewP, setConfirmNewP] = useState('');
    const [forgotSuccess, setForgotSuccess] = useState(false);

    const dispatch = useDispatch();
    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding": "height"} 
            style={{ flex: 1 }}
        >
            <ImageBackground 
                source={require('../assets/login-image.png')} 
                resizeMode="cover" 
                style={styles.image} 
            >
                {questAcc ? (
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>
                        <Text style={[styles.title, {marginBottom: 40}]}>Inspectable</Text>
                        <Text style={styles.info}>Enter new password</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.icon}>
                                <FontAwesome name="lock" size={21} color="white" />
                            </View>
                            <TextInput 
                                style={styles.input}
                                placeholder="New Password"
                                secureTextEntry={true}
                                value={newP}
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                onChangeText={(text) => {
                                    setNewP(text)
                                }}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.icon}>
                                <FontAwesome name="lock" size={21} color="white" />
                            </View>
                            <TextInput 
                                style={styles.input}
                                placeholder="Confirm New Password"
                                secureTextEntry={true}
                                value={confirmNewP}
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                onChangeText={(text) => {
                                    setConfirmNewP(text)
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                if (!newP || !confirmNewP) {
                                    alert("Please fill in all fields")
                                } else {
                                    if (newP.length < 6) {
                                        alert("Password length needs to be longer than 6")
                                    } else if (newP !== confirmNewP) {
                                        alert("Passwords do not match");
                                    } else {
                                        dispatch(authAction.forgotPassword(cEmail.trim(), newP, confirmNewP))
                                            .then(() => {
                                                setQuestAcc(false);
                                                setShowMain(true);
                                                setForgotSuccess(true);
                                            })
                                        
                                    }
                                }
                            }}
                        >
                            <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setShowQuest(true)
                                setQuestAcc(false);
                            }}
                            style={{
                                flexDirection: 'row', 
                                justifyContent: 'center',
                                alignItems: 'center' ,
                                marginVertical: 15
                            }}
                        >
                            <Entypo name="chevron-small-left" size={22} color="white" />
                            <Text style={{color: 'white'}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                ): null }

                {showQuest ? (
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>
                        <Text style={[styles.title, {marginBottom: 40}]}>Inspectable</Text>
                        <Text style={styles.question}>{questions[0]}</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.icon}>
                                <MaterialIcons name="question-answer" size={21} color="white" />
                            </View>
                            <TextInput 
                                style={styles.input}
                                placeholder="Answer"
                                placeholderTextColor="#fff"
                                value={answer1}
                                onChangeText={(text) => {
                                    setAnswer1(text)
                                }}
                            />
                        </View>
                        <Text style={styles.question}>{questions[1]}</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.icon}>
                                <MaterialIcons name="question-answer" size={21} color="white" />
                            </View>
                            <TextInput 
                                style={styles.input}
                                placeholder="Answer"
                                placeholderTextColor="#fff"
                                value={answer2}
                                onChangeText={(text) => {
                                    setAnswer2(text)
                                }}
                            />
                        </View>
                        <Text style={styles.question}>{questions[2]}</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.icon}>
                                <MaterialIcons name="question-answer" size={21} color="white" />
                            </View>
                            <TextInput 
                                style={styles.input}
                                placeholder="Answer"
                                value={answer3}
                                placeholderTextColor="#fff"
                                onChangeText={(text) => {
                                    setAnswer3(text)
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                dispatch(authAction.checkQuestions(cEmail.trim(), answer1.trim(), answer2.trim(), answer3.trim()))
                                    .then((data) => {
                                        if(data) {
                                            setQuestAcc(true)
                                            setShowQuest(false)
                                        } else {
                                            Alert.alert('One of the answers are incorrect')
                                        }
                                    })
                            }}
                        >
                            <Text style={styles.buttonText}>NEXT</Text>
                        </TouchableOpacity>
                        <View style={styles.registerContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    
                                }}
                            >
                                <Text style={{color: 'white', fontSize: 12}}>Still can't log in?</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                setShowQuest(false);
                                setCheckEmailM(true);
                            }}
                            style={{
                                flexDirection: 'row', 
                                justifyContent: 'center',
                                alignItems: 'center' ,
                                marginVertical: 15
                            }}
                        >
                            <Entypo name="chevron-small-left" size={22} color="white" />
                            <Text style={{color: 'white'}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                
                {checkEmailM ? (
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>
                        <Text style={styles.title}>Inspectable</Text>
                        <Text style={styles.info}>Enter the email associated with your account</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.icon}>
                                <Ionicons name="mail" size={21} color="white" />
                            </View>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Email"
                                value={cEmail}
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                onChangeText={(text) => {
                                    setCEmail(text)
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                dispatch(authAction.checkEmail(cEmail))
                                    .then((data) => {
                                        if(data.success) {
                                            setCheckEmailM(false)
                                            setShowQuest(true)
                                            setQuestions([data.question1, data.question2, data.question3])
                                        } else {
                                            Alert.alert('Email is not associated to an account')
                                        }
                                    })
                            }}
                        >
                            <Text style={styles.buttonText}>NEXT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setCheckEmailM(false);
                                setShowMain(true)
                            }}
                            style={{
                                flexDirection: 'row', 
                                justifyContent: 'center',
                                alignItems: 'center' ,
                                marginVertical: 15
                            }}
                        >
                            <Entypo name="chevron-small-left" size={22} color="white" />
                            <Text style={{color: 'white'}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

                {showMain ? (
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            dispatch(authAction.loginUser(values))
                                .then(async result => {
                                    if(result.success) {
                                        try {
                                            await AsyncStorage.setItem('token', result.token)
                                            navigation.navigate('Main');
                                        } catch(err) { 
                                            console.log(err);
                                        }
                                    } else {
                                        Alert.alert(result.message);
                                    }
                                })
                                .catch(err => console.log(err));
                            
                        }}
                    >
                        {(props) => (
                            <View style={styles.container}>
                                <Text style={styles.title}>Inspectable</Text>
                                {forgotSuccess ? (<Text style={styles.info}>Password successfully changed</Text>) : null}
                                <View style={styles.inputContainer}>
                                    <View style={styles.icon}>
                                        <Ionicons name="mail" size={21} color="white" />
                                    </View>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Email"
                                        placeholderTextColor="#fff"
                                        keyboardType="email-address"
                                        onChangeText={props.handleChange('email')}
                                        value={props.values.email}
                                        onBlur={props.handleBlur('email')}
                                    />
                                </View>
                                <Text style={styles.error}>{props.touched.email && props.errors.email}</Text>
                                <View style={styles.inputContainer}>
                                    <View style={styles.icon}>
                                        <FontAwesome name="lock" size={21} color="white" />
                                    </View>
                                    <TextInput 
                                        style={styles.input}
                                        placeholder="Password"
                                        placeholderTextColor="#fff"
                                        secureTextEntry={true}
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                        onBlur={props.handleBlur('password')}
                                    />
                                </View>
                                <Text style={styles.error}>{props.touched.password && props.errors.password}</Text>
                                <View style={styles.registerContainer}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCheckEmailM(true);
                                            setShowMain(false);
                                        }}
                                    >
                                        <Text style={{color: 'white', fontSize: 12}}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity 
                                        style={styles.button}
                                        onPress={props.handleSubmit}
                                    >
                                        <Text style={styles.buttonText}>LOGIN</Text>
                                    </TouchableOpacity>
                                    <View style={styles.registerContainer}>
                                        <Text style={styles.registerText}>Need an account?</Text>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('Register')}
                                        >
                                            <Text style={styles.registerButton}> Register</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    </Formik>
                ) : null}
            </ImageBackground>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        alignItems: "center",
        marginBottom: 40,
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        position: 'absolute'
    },
    input: {
        width: 250,
        backgroundColor: "rgba(236,236,236,.36)",
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        paddingHorizontal: 16,
        height: 50,
        fontSize: 14,
        marginVertical: 10,
        color: "white"
    },
    button: {
        width: 300,
        backgroundColor: "#FFFFFF",
        borderRadius: 7,
        marginBottom: 10,
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#493F37",
        textAlign: "center",
        fontFamily: 'sfprodisplay'
    },
    registerContainer: {
        alignItems: "flex-end",
        justifyContent: "center",
        paddingVertical: 16,
        flexDirection: "row",
    },
    registerText: {
        color: 'rgba(255,255,255,0.66)',
        fontSize: 12,
        fontFamily: 'sfprodisplay'
    },
    registerButton: {
        color: "#ffffff",
        fontSize: 13,
        fontWeight: "bold",
    },
    error: {
        color: 'red'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        display: 'flex',
        backgroundColor: "rgba(236,236,236,.36)",
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7
    },
    title: {
        color: 'white',
        fontSize: 43,
        marginBottom: 90,
        fontFamily: 'sfprodisplay'
    },
    info: {
        color: 'white',
        paddingBottom: 20,
        maxWidth: 270,
        lineHeight: 25,
        textAlign: 'center',
        fontSize: 14
    },
    question: {
        color: 'white',
        fontSize: 15,
        paddingVertical: 7,
        marginTop: 10
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = { 
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);