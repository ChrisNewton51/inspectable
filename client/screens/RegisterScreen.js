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
    Alert,
    ImageBackground,
    FlatList
} from 'react-native'; 
import {Formik} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
    AntDesign, 
    MaterialIcons, 
    Entypo, 
    Feather, 
    FontAwesome, 
    Ionicons 
} from '@expo/vector-icons'
import * as authAction from '../redux/actions/authAction';
import DropDownPicker from 'react-native-dropdown-picker';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const formSchema = yup.object({
    fullName: yup.string().required().min(3),
    email: yup.string().email().required(),
    phone: yup.string().min(10).max(10).required().matches(phoneRegExp, 'Phone number is not valid'),
    password: yup.string().required().min(6),
});

const RegisterScreen = navData => {

    const dispatch = useDispatch();

    const [secQuest, setSecQuest] = useState(false);
    const [height, setHeight] = useState(50)
    const [height2, setHeight2] = useState(50)
    const [height3, setHeight3] = useState(50)

    // Dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'What city were you born in?', value: 'What city were you born in?'},
      {label: "What is your oldest sibling's middle name?", value: "What is your oldest sibling's middle name?"},
      {label: 'What was the first concert you attended?', value: 'What was the first concert you attended?'},
      {label: 'What was the make and model of your first car?', value: 'What was the make and model of your first car?'},
      {label: 'In what city or town did your parents meet?', value: 'In what city or town did your parents meet?'},
      {label: "What is the name of a college you applied to but didn't attend?", value: "What is the name of a college you applied to but didn't attend?"}
    ]);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        {label: 'What city were you born in?', value: 'What city were you born in?'},
        {label: "What is your oldest sibling's middle name?", value: "What is your oldest sibling's middle name?"},
        {label: 'What was the first concert you attended?', value: 'What was the first concert you attended?'},
        {label: 'What was the make and model of your first car?', value: 'What was the make and model of your first car?'},
        {label: 'In what city or town did your parents meet?', value: 'In what city or town did your parents meet?'},
        {label: "What is the name of a college you applied to but didn't attend?", value: "What is the name of a college you applied to but didn't attend?"}
    ]);
    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [items3, setItems3] = useState([
        {label: 'What city were you born in?', value: 'What city were you born in?'},
        {label: "What is your oldest sibling's middle name?", value: "What is your oldest sibling's middle name?"},
        {label: 'What was the first concert you attended?', value: 'What was the first concert you attended?'},
        {label: 'What was the make and model of your first car?', value: 'What was the make and model of your first car?'},
        {label: 'In what city or town did your parents meet?', value: 'In what city or town did your parents meet?'},
        {label: "What is the name of a college you applied to but didn't attend?", value: "What is the name of a college you applied to but didn't attend?"}
    ]);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding": "height"} 
            style={{ flex: 1, width: '100%', height: '100%' }}
        >
            <ImageBackground 
                source={require('../assets/login-image.png')} 
                resizeMode="cover" 
                style={styles.image} 
            >
                <ScrollView style={{flex: 1, height: '100%'}}>
                    <Formik
                        initialValues={{
                            fullName: "",
                            email: "",
                            phone: "",
                            password: "",
                            question1: "",
                            answer1: "",
                            question2: "",
                            answer2: "",
                            question3: "",
                            answer3: "",
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            if(values.password !== values.confirmpassword) {
                                Alert.alert('Passwords do not match')
                            } else if(!values.answer1 || !values.answer2 || !values.answer3 || !values.question1 || !values.question2 || !values.question3) { 
                                Alert.alert("You must pick 3 questions and answer them") 
                            } else if (values.question1 == values.question2 || values.question1 == values.question3 || values.question3 == values.question2) {
                                Alert.alert("The 3 questions must be unique")
                            } else { dispatch(authAction.registerUser(values))
                                    .then(async result => {
                                        if(result.success) {
                                            try {
                                                await AsyncStorage.setItem('token', result.token);
                                                navData.navigation.navigate('Main');
                                            } catch(err) {
                                                console.log(err);
                                            }
                                        } else {
                                            Alert.alert('Registration failed. Try Again')
                                        }
                                    })
                                    .catch(err => console.log(err));
                            }
                        }}
                    >
                        {(props) => (
                            <View style={styles.container}>
                                <Text style={styles.title}>Inspectable</Text>
                                {secQuest ? (
                                    <View>
                                        <View style={styles.inputContainer}>
                                            <DropDownPicker
                                                open={open}
                                                value={value}
                                                items={items}
                                                setOpen={setOpen}
                                                setValue={setValue}
                                                setItems={setItems}
                                                theme="DARK"
                                                max={100}
                                                zIndex={10000}
                                                placeholder="Security Question"
                                                onChangeValue={props.handleChange('question1')}
                                                onOpen={() => {
                                                    setHeight(250)
                                                }}
                                                onClose={() => {
                                                    setHeight(50)
                                                }}
                                                containerStyle={{
                                                    zIndex: 100,
                                                    elevation: 100,
                                                    marginVertical: 15,
                                                    width: 300,
                                                    height: height,
                                                }}
                                                textStyle={{color: 'white'}}
                                                style={[styles.input, {width: 300, borderColor: 'rgba(0,0,0,0)'}]}
                                            />
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.icon}>
                                                <MaterialIcons name="question-answer" size={21} color="white" />
                                            </View>
                                            <TextInput 
                                                style={styles.input}
                                                placeholder="Answer"
                                                placeholderTextColor="#fff"
                                                onChangeText={props.handleChange('answer1')}
                                                value={props.values.answer1}
                                                onBlur={props.handleBlur('answer1')}
                                            />
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <DropDownPicker
                                                open={open2}
                                                value={value2}
                                                items={items2}
                                                setOpen={setOpen2}
                                                setValue={setValue2}
                                                setItems={setItems2}
                                                theme="DARK"
                                                max={100}
                                                zIndex={10000}
                                                placeholder="Security Question"
                                                onChangeValue={props.handleChange('question2')}
                                                onOpen={() => {
                                                    setHeight2(250)
                                                }}
                                                onClose={() => {
                                                    setHeight2(50)
                                                }}
                                                containerStyle={{
                                                    zIndex: 100,
                                                    elevation: 100,
                                                    marginVertical: 15,
                                                    width: 300,
                                                    height: height2,
                                                }}
                                                textStyle={{color: 'white'}}
                                                style={[styles.input, {width: 300, borderColor: 'rgba(0,0,0,0)'}]}
                                            />
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.icon}>
                                                <MaterialIcons name="question-answer" size={21} color="white" />
                                            </View>
                                            <TextInput 
                                                style={styles.input}
                                                placeholder="Answer"
                                                placeholderTextColor="#fff"
                                                onChangeText={props.handleChange('answer2')}
                                                value={props.values.answer2}
                                                onBlur={props.handleBlur('answer2')}
                                            />
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <DropDownPicker
                                                open={open3}
                                                value={value3}
                                                items={items3}
                                                setOpen={setOpen3}
                                                setValue={setValue3}
                                                setItems={setItems3}
                                                theme="DARK"
                                                max={100}
                                                zIndex={10000}
                                                placeholder="Security Question"
                                                onChangeValue={props.handleChange('question3')}
                                                onOpen={() => {
                                                    setHeight3(250)
                                                }}
                                                onClose={() => {
                                                    setHeight3(50)
                                                }}
                                                containerStyle={{
                                                    zIndex: 100,
                                                    elevation: 100,
                                                    marginVertical: 15,
                                                    width: 300,
                                                    height: height3,
                                                }}
                                                textStyle={{color: 'white'}}
                                                style={[styles.input, {width: 300, borderColor: 'rgba(0,0,0,0)'}]}
                                            />
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.icon}>
                                                <MaterialIcons name="question-answer" size={21} color="white" />
                                            </View>
                                            <TextInput 
                                                style={styles.input}
                                                placeholder="Answer"
                                                placeholderTextColor="#fff"
                                                onChangeText={props.handleChange('answer3')}
                                                value={props.values.answer3}
                                                onBlur={props.handleBlur('answer3')}
                                            />
                                        </View>
                                        <TouchableOpacity 
                                            style={[styles.button, {marginTop: 20}]}
                                            onPress={props.handleSubmit}
                                        >
                                            <Text style={styles.buttonText}>REGISTER</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setSecQuest(false);
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
                                ) : (
                                    <View>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.icon}>
                                                <FontAwesome name="user" size={21} color="white" />
                                            </View>
                                            <TextInput 
                                                style={styles.input}
                                                placeholder="Full Name"
                                                placeholderTextColor="#fff"
                                                onChangeText={props.handleChange('fullName')}
                                                value={props.values.fullName}
                                                onBlur={props.handleBlur('fullName')}
                                            />
                                        </View>
                                        <Text style={styles.error}>{props.touched.fullName && props.errors.fullName}</Text>
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
                                                <FontAwesome name="phone" size={21} color="white" />
                                            </View>
                                            <TextInput 
                                                style={styles.input}
                                                placeholder="Phone"
                                                placeholderTextColor="#fff"
                                                keyboardType="number-pad"
                                                onChangeText={props.handleChange('phone')}
                                                value={props.values.phone}
                                                onBlur={props.handleBlur('phone')}
                                            />
                                        </View>
                                        <Text style={styles.error}>{props.touched.phone && props.errors.phone}</Text>
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
                                        <View style={styles.inputContainer}>
                                            <View style={styles.icon}>
                                                <FontAwesome name="lock" size={21} color="white" />
                                            </View>
                                            <TextInput 
                                                style={styles.input}
                                                placeholder="Confirm Password"
                                                placeholderTextColor="#fff"
                                                secureTextEntry={true}
                                                onChangeText={props.handleChange('confirmpassword')}
                                                value={props.values.confirmpassword}
                                                onBlur={props.handleBlur('confirmpassword')}
                                            />
                                        </View>
                                        <Text style={styles.error}>{props.touched.confirmpassword && props.errors.confirmpassword}</Text>
                                        <TouchableOpacity
                                            style={styles.button}
                                            onPress={() => {
                                                setSecQuest(true)
                                            }}
                                        >
                                            <Text style={styles.buttonText}>NEXT</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                <View style={styles.registerContainer}>
                                    <Text style={styles.registerText}>Have an account?</Text>
                                    <TouchableOpacity
                                        onPress={() => navData.navigation.navigate('Login')}
                                    >
                                        <Text style={styles.registerButton}> Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
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
        color: 'white',
        fontSize: 14,
        marginVertical: 0,
    },
    button: {
        width: 300,
        backgroundColor: "#FFFFFF",
        borderRadius: 7,
        marginVertical: 10,
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
        marginBottom: 60,
        marginTop: 60,
        fontFamily: 'sfprodisplay'
    }
});

export default RegisterScreen;