import React, { useState, useEffect } from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    Platform, 
    TextInput, 
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    KeyboardAvoidingView,
    ActivityIndicator
} from  'react-native';
import Modal from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { connect, useSelector, useDispatch } from 'react-redux';
import { getUserTemplates } from '../redux/actions/templateAction';
import { changeMainField, createReport } from '../redux/actions/reportAction';
import { createClient, updateClient, getUserClients } from '../redux/actions/clientAction';
import {useNavigation} from '@react-navigation/native';
import { 
    createClientContract, 
    changeMainFieldC,
    getContract
 } from '../redux/actions/clientContractAction';
import { getUserContracts } from '../redux/actions/contractAction';

var emails = [];

const NewReportScreen = ({ user, report, clients, templateList, contractList, clientContract, changeMainField, createReport, createClient, updateClient, createClientContract, changeMainFieldC, getContract }) => {

    // Navigation //
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [tempSelected, setTempSelect] = useState(false);
    const [selectedTemp, setSelectedTemp] = useState('TEMPLATE');
    const [contSelected, setContSelect] = useState(false);
    const [selectedCont, setSelectedCont] = useState('CONTRACT');
    const [stateSelected, setStateSelect] = useState(false);
    const [selectedState, setSelectedState] = useState('STATE');
    const [phoneNum, setPhoneNum] = useState('');
    const [emptyFields, setEmptyFields] = useState(false);
    const [tHeight, setTHeight] = useState(70);
    const [cHeight, setCHeight] = useState(70);
    const [sHeight, setSHeight] = useState(70);
    const [isLoading, setIsLoading] = useState(false);

    const {templates} = useSelector(state => state.templateList)
    const {contracts} = useSelector(state => state.contractList)
    const temps = user.templates;
    const clnts = user.clients;
    const conts = user.contracts;
    // Dropdown
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
      {label: 'AL', value: 'AL'},
      {label: 'AK', value: 'AK'},
      {label: 'AZ', value: 'AZ'},
      {label: 'CA', value: 'CA'},
      {label: 'CO', value: 'CO'},
      {label: 'CT', value: 'CT'},
      {label: 'DE', value: 'DE'},
      {label: 'FL', value: 'FL'},
      {label: 'GA', value: 'GA'},
      {label: 'HI', value: 'HI'},
      {label: 'ID', value: 'ID'},
      {label: 'IL', value: 'IL'},
      {label: 'IN', value: 'IN'},
      {label: 'IA', value: 'IA'},
      {label: 'KS', value: 'KS'},
      {label: 'KY', value: 'KY'},
      {label: 'LA', value: 'LA'},
      {label: 'ME', value: 'ME'},
      {label: 'MD', value: 'MD'},
      {label: 'MA', value: 'MA'},
      {label: 'MI', value: 'MI'},
      {label: 'MN', value: 'MN'},
      {label: 'MS', value: 'MS'},
      {label: 'MO', value: 'MO'},
      {label: 'MT', value: 'MT'},
      {label: 'NR', value: 'NE'},
      {label: 'NV', value: 'NV'},
      {label: 'NH', value: 'NH'},
      {label: 'NJ', value: 'NJ'},
      {label: 'NM', value: 'NM'},
      {label: 'NY', value: 'NY'},
      {label: 'NC', value: 'NC'},
      {label: 'ND', value: 'ND'},
      {label: 'OH', value: 'OH'},
      {label: 'OK', value: 'OK'},
      {label: 'OR', value: 'OR'},
      {label: 'PA', value: 'PA'},
      {label: 'RI', value: 'RI'},
      {label: 'SC', value: 'SC'},
      {label: 'SD', value: 'SD'},
      {label: 'TN', value: 'TN'},
      {label: 'TX', value: 'TX'},
      {label: 'UT', value: 'UT'},
      {label: 'VT', value: 'VT'},
      {label: 'VA', value: 'VA'},
      {label: 'WA', value: 'WA'},
      {label: 'WV', value: 'WV'},
      {label: 'WI', value: 'WI'},
      {label: 'WY', value: 'WY'},
    ]);

    // Datepicker
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        changeMainField('date', selectedDate.toString().slice(4,15))
        changeMainFieldC('date', selectedDate.toString().slice(4,15))
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => { showMode('date') };
    
    var string;
    if (Platform.OS === 'ios') {
        string = 'DATE';
    } else {
        string = date.toString().slice(4,15);
    }

    // Image Picker
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        setIsLoading(true);
        dispatch(getUserTemplates(temps))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        dispatch(getUserClients(clnts))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        dispatch(getUserContracts(conts))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        requestPermission()
    }, []);

    if (clients.length > 0) {
        for(var i = 0; i < clients.length; i++) {
            var email = clients[i].email;
            emails[i] = email.toLowerCase().trim();
        }
    }
    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setImage(result.uri);
            changeMainField('image', result.uri)
            changeMainFieldC('image', result.uri)
        }
    };
    
    function buildCC(clientFirstName, clientLastName, email, phone, address, city, state, price, date, contract) {
        var field;

        for(var k = 0; k < contract.field_list.length; k++) {
            field = contract.field_list[k];
            switch(field.field) {
                case 'name':
                    field.firstName = clientFirstName;
                    field.lastName = clientLastName;
                    break;
                case 'email': 
                    field.email = email;
                    break;
                case 'phone': 
                    field.phone = phone;
                    break;
                case 'address': 
                    field.city = city;
                    field.state1 = state;
                    field.streetAddress = address;
                    break;
                case 'price': 
                    field.price = price;
                    break;
                case 'date': 
                    field.date = date;
                    break;
                default:
                    break;
            }
        }
        return contract;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{width: '100%'}}
        >
            <Modal 
                animationIn="zoomIn"
                animationOut="zoomOut"
                isVisible={emptyFields}
                onRequestClose={() => {
                    setEmptyFields(false)
                }}
                transparent={true}
                hasBackdrop={true}
                coverScreen={false}                    
                backdropColor="rgba(0,0,0,.5)"
                style={{margin: 0}}
            >
                <View style={styles.confirmContainer}>
                    <View style={styles.confirmTrash}>
                        <Text style={styles.popupText}>Required fields are empty</Text>
                        <View style={styles.confirmButtons}>
                            <TouchableOpacity 
                                style={styles.confirmButton}
                                onPress={() => {
                                    setEmptyFields(false);
                                }}    
                            >
                                <Text style={styles.confirmText}>Okay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView style={styles.container}>
                { !isLoading ? (
                    <View>
                        <View style={[styles.titleContainer, {marginTop: Platform.OS === 'ios' ? 50 : 20}]}>
                            <Text style={styles.newReportTextFirst}>Template</Text>
                            <FontAwesome5 name="asterisk" size={7} style={{paddingLeft: 5, paddingTop: 7}} color="#C90011" />
                        </View>
                        <View style={{height: tHeight}}>
                            <View style={{
                                width: '90%',
                                marginHorizontal: 20,
                                marginTop: 19,
                                height: 45,
                                borderColor: '#282C3A',
                                backgroundColor: '#282C3A',
                                borderRadius: 5,
                                justifyContent: 'center',
                                paddingLeft: 15
                            }}>
                                <Text 
                                    style={{
                                        color: '#D0D8E6'
                                    }}
                                >{selectedTemp}</Text>
                                { !tempSelected ? (
                                    <Ionicons 
                                        name="chevron-down" 
                                        size={25} 
                                        color="rgba(208,219,229,0.75)"
                                        style={{
                                            position: 'absolute',
                                            right: 15,
                                        }} 
                                        onPress={() => {
                                            setTempSelect(true);
                                            setTHeight(250);
                                            getUserTemplates(temps);
                                        }}
                                    />
                                ) : 
                                    <Ionicons 
                                        name="chevron-up" 
                                        size={25} 
                                        color="rgba(208,219,229,0.75)"
                                        style={{
                                            position: 'absolute',
                                            right: 15,
                                        }} 
                                        onPress={() => {
                                            setTempSelect(false);
                                            setTHeight(70);
                                        }}
                                    />
                                }
                            </View>
                            { tempSelected ? (
                                <View style={{alignItems: 'center', zIndex: 90000, elevation: 1000, height: Platform.OS === 'ios' ? 0 : 180}}>
                                    <FlatList
                                        style={{
                                            maxHeight: 180,
                                            backgroundColor: '#2C303F',
                                            width: '90%',
                                            position: 'absolute',
                                            borderWidth: 1,
                                            borderColor: 'black',
                                            borderBottomRightRadius: 5,
                                            borderBottomLeftRadius: 5,
                                            elevation: 1000
                                        }}
                                        contentContainerStyle={{
                                            paddingVertical: 10
                                        }}
                                        data={templates}
                                        keyExtractor={(item) => item.id} 
                                        renderItem={({item, index}) => { 
                                            return (
                                                <TouchableOpacity
                                                    style={{
                                                        height: 40,
                                                        paddingHorizontal: 15,
                                                        justifyContent: 'center'
                                                    }}
                                                    onPress={() => {
                                                        setTempSelect(false)
                                                        setTHeight(70)
                                                        setSelectedTemp(item.template.title)
                                                        changeMainField('template', item._id)
                                                    }}
                                                >
                                                    <Text style={{color: '#D0D8E3'}}>{item.template.title}</Text>
                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>
                            ) : null }
                        </View>
                        <View style={[styles.titleContainer, {marginTop: 20}]}>
                            <Text style={styles.newReportTextFirst}>Contract</Text>
                            <FontAwesome5 name="asterisk" size={7} style={{paddingLeft: 5, paddingTop: 7}} color="#C90011" />
                        </View>
                        <View style={{height: cHeight}}>
                            <View style={{
                                width: '90%',
                                marginHorizontal: 20,
                                marginTop: 19,
                                height: 45,
                                borderColor: '#282C3A',
                                backgroundColor: '#282C3A',
                                borderRadius: 5,
                                justifyContent: 'center',
                                paddingLeft: 15
                            }}>
                                <Text 
                                    style={{
                                        color: '#D0D8E6'
                                    }}
                                >{selectedCont}</Text>
                                { !contSelected ? (
                                    <Ionicons 
                                        name="chevron-down" 
                                        size={25} 
                                        color="rgba(208,219,229,0.75)"
                                        style={{
                                            position: 'absolute',
                                            right: 15,
                                        }} 
                                        onPress={() => {
                                            setContSelect(true);
                                            getUserTemplates(temps);
                                            setCHeight(250);
                                        }}
                                    />
                                ) : 
                                    <Ionicons 
                                        name="chevron-up" 
                                        size={25} 
                                        color="rgba(208,219,229,0.75)"
                                        style={{
                                            position: 'absolute',
                                            right: 15,
                                        }} 
                                        onPress={() => {
                                            setContSelect(false);
                                            setCHeight(70);
                                        }}
                                    />
                                }
                            </View>
                            { contSelected ? (
                                <View style={{alignItems: 'center', zIndex: 90000, elevation: 1000, height: Platform.OS === 'ios' ? 0 : 180}}>
                                    <FlatList
                                        style={{
                                            maxHeight: 180,
                                            backgroundColor: '#2C303F',
                                            width: '90%',
                                            position: 'absolute',
                                            borderWidth: 1,
                                            borderColor: 'black',
                                            borderBottomRightRadius: 5,
                                            borderBottomLeftRadius: 5,
                                            elevation: 1000
                                        }}
                                        contentContainerStyle={{
                                            paddingVertical: 10
                                        }}
                                        data={contracts}
                                        keyExtractor={(item) => item.id} 
                                        renderItem={({item, index}) => { 
                                            return (
                                                <TouchableOpacity
                                                    style={{
                                                        height: 40,
                                                        paddingHorizontal: 15,
                                                        justifyContent: 'center'
                                                    }}
                                                    onPress={() => {
                                                        setContSelect(false)
                                                        setCHeight(70);
                                                        setSelectedCont(item.contract.title)
                                                        changeMainFieldC('contractId', item._id)
                                                        getContract(item._id)
                                                    }}
                                                >
                                                    <Text style={{color: '#D0D8E3'}}>{item.contract.title}</Text>
                                                </TouchableOpacity>
                                            );
                                        }}
                                    />
                                </View>
                            ) : null }
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.newReportText}>Client</Text>
                            <FontAwesome5 name="asterisk" size={7} style={{paddingLeft: 5, paddingTop: 7}} color="#C90011" />
                        </View>
                        <View style={styles.halfContainer}>
                            <TextInput 
                                style={styles.halfInput} 
                                placeholder="FIRST NAME"
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                onChangeText={(text) => {
                                    changeMainField('clientFirstName', text)
                                    changeMainFieldC('clientFirstName', text)
                                }}
                            />
                            <TextInput 
                                style={styles.halfInput} 
                                placeholder="LAST NAME"
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                onChangeText={(text) => {
                                    changeMainField('clientLastName', text)
                                    changeMainFieldC('clientLastName', text)
                                }}
                            /> 
                        </View>
                        <View style={styles.fullContainer}>
                            <TextInput
                                style={styles.fullInput}
                                placeholder="EMAIL"
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                keyboardType="email-address"
                                onChangeText={(text) => {
                                    changeMainField('clientEmail', text)
                                }}
                            />
                        </View>
                        <View style={styles.fullContainer}>
                            <TextInput
                                style={styles.fullInput}
                                placeholder="PHONE"
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                keyboardType={"number-pad"}
                                value={phoneNum}
                                onChangeText={(text) => {
                                    changeMainField('clientPhone', text)
                                    setPhoneNum(text)
                                }}
                                onBlur={() => {
                                    setPhoneNum(phoneNum)
                                    changeMainField('clientPhone', phoneNum)
                                }}
                            />
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.newReportText}>Report</Text>
                            <FontAwesome5 name="asterisk" size={7} style={{paddingLeft: 5, paddingTop: 7}} color="#C90011" />
                        </View>
                        <View style={styles.fullContainer}>
                            <TextInput
                                style={styles.fullInput}
                                placeholder="ADDRESS"
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                onChangeText={(text) => {
                                    changeMainField('address', text)
                                    changeMainFieldC('address', text)
                                }}
                            />
                        </View>
                        <View style={[styles.halfContainer, {marginLeft: Platform.OS === 'ios' ? 0 : 10}]}>   
                            <TextInput 
                                style={styles.halfInput} 
                                placeholder="PRICE"
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                keyboardType="number-pad"
                                onChangeText={(text) => {
                                    changeMainField('price', text)
                                }}
                            />       
                            <View style={styles.dateContainer} >
                                <TouchableOpacity
                                    onPress={showDatepicker} 
                                    title="Date" 
                                    style={styles.datePicker}
                                    color='#282C3A'
                                >
                                    <Text style={styles.dateStyle} >
                                        { string }
                                    </Text>
                                    <MaterialCommunityIcons name="calendar-month-outline" size={24} color="white" />                        
                                </TouchableOpacity>                
                                {show && ( 
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChange}
                                        style={styles.dateTimePicker}
                                    />
                                )}
                            </View>
                        </View>
                        <View style={[styles.halfContainer, {zIndex: 100, elevation: 100, height: sHeight}]}>                
                            <DropDownPicker
                                listMode={Platform.OS === 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                                open={open2}
                                value={value2}
                                items={items2}
                                setOpen={setOpen2}
                                setValue={setValue2}
                                setItems={setItems2}
                                max={100}
                                theme="DARK"
                                zIndex={10000}
                                placeholder="STATE"
                                onChangeValue={(value) => {
                                    changeMainField('state', value)
                                }}
                                containerStyle={{
                                    width: '42%',
                                    marginHorizontal: 10,
                                    marginTop: 19,
                                    zIndex: 100,
                                    elevation: 100
                                }}
                                style={{
                                    height: 45,
                                    borderColor: '#282C3A',
                                    backgroundColor: '#282C3A',
                                    borderRadius: 5,
                                    zIndex: 100,
                                    elevation: 100
                                }}
                            />
                            <TextInput 
                                style={styles.halfInput} 
                                placeholder="CITY"
                                placeholderTextColor='rgba(208,219,229,0.55)'
                                onChangeText={(text) => {
                                    changeMainField('city', text)
                                }}
                            />
                        </View>            
                        <Text style={[styles.newReportText, {marginTop: 25}]}>House</Text>
                        <View style={styles.imagePickerContainer}>
                            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                                <Text style={styles.imageText}>Choose Image</Text>
                            </TouchableOpacity>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={require('../assets/icons/file-picture.png')}
                                    fadeDuration={0}
                                    style={styles.imageIcon}
                                />
                                {image && <Image source={{ uri: image }} style={{ width: 300, height: 250 }} />}
                            </View>
                        </View>
                        <View style={styles.submitContainer}>
                            <TouchableOpacity 
                                style={styles.submitButton}
                                onPress={() => {
                                    if (report.clientFirstName == "" || report.clientLastName == "" || report.clientEmail == "" || report.address == "" || report.city == "" || report.state == "" || report.template == "" || clientContract.contractId == "") {
                                        setEmptyFields(true);
                                    } else {
                                        var newContract = buildCC(report.clientFirstName, report.clientLastName, report.clientEmail, report.clientPhone, report.address, report.city, report.state, report.price, report.date, clientContract.contract)
                                        
                                        createReport(report.clientFirstName, report.clientLastName, report.clientEmail, report.clientPhone, report.address, report.city, report.state, report.price, report.date, report.image, report.completed, report.template, newContract, user.id, user)

                                        var newEmail = report.clientEmail;
                                        newEmail = newEmail.toLowerCase().trim();
                                        var foundClient = false;
                                        if (clients.length > 0) {
                                            for (var j = 0; j < emails.length; j++) {
                                                if (emails[j] == newEmail) {
                                                    var newClient = clients[j];
                                                    var newReports = clients[j].reports;
                                                    newReports.push({address: report.address, date: report.date});
                                                    newClient.reports = newReports;
                                                    updateClient(clients[j]._id, newClient);
                                                    foundClient = true;
                                                    break;
                                                }
                                            }
                                            if (!foundClient) {
                                                createClient(report.clientFirstName, report.clientLastName, report.clientEmail, report.clientPhone, [{address: report.address, date: report.date}], user.id, user)
                                            }
                                        } else {
                                            createClient(report.clientFirstName, report.clientLastName, report.clientEmail, report.clientPhone, [{address: report.address, date: report.date}], user.id, user)
                                        }
                                        navigation.navigate('ReportEditorScreen')
                                    }
                                }}
                            >
                                <Text style={styles.submitText}>Add Report</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.centered}>
                        <ActivityIndicator 
                            size="large" 
                            color="#ffffff"
                        />
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#141824',
        height: '100%',
    },
    newReportTextFirst: {
        paddingTop: 5,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#D0DBE5',
        fontSize: 16
    },
    newReportText: {
        paddingTop: 5,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#D0DBE5',
        fontSize: 16,
    },
    halfContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: -1
    },
    halfInput: {
        height: 45,
        width: '42%', 
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: '#282C3A',
        borderRadius: 5,
        paddingHorizontal: 15,
        color: "#fff"
    },
    fullContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: -1
    },
    fullInput: {
        height: 45,
        width: '90%', 
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: '#282C3A',
        borderRadius: 5,
        paddingHorizontal: 15,
        color: "#fff"
    },
    newReportButton: {
        backgroundColor: '#282C3A',
    },
    datePicker: {
        height: 45,
        width: '42%', 
        marginTop: 20,
        marginHorizontal: 10,
        backgroundColor: '#282C3A',
        borderRadius: 5,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 0
    },
    dateStyle: {
        color: 'rgba(208,219,229,0.55)',
        paddingVertical: 13,
        textTransform: 'uppercase'
    },
    dateContainer: {
        flexDirection: 'column',
        width: '100%',
        marginRight: Platform.OS === 'ios' ? -200 : -188,
    },
    dateTimePicker: {
        position: 'absolute',
        width: 85,
        top: 25,
        left: 15,
        backgroundColor:'#282C3A',
        zIndex: 2,
    },
    imagePickerContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: -1
    },
    imageContainer: {
        width: 300,
        height: 250,
        borderColor: 'rgba(208,219,229,0.19)',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageButton: {
        backgroundColor: '#D0DBE5',
        paddingHorizontal: 19,
        paddingVertical: 8,
        borderRadius: 50,
        marginVertical: 20,
    },
    imageText: {
        color: '#282C3A'
    },
    imageIcon: {
        width: 80,
        height: 100,
        position: 'absolute',
        zIndex: 0
    },
    submitText: {
        color: '#fff'
    },
    submitButton: {
        paddingHorizontal: 55,
        paddingVertical: 12,
        backgroundColor: '#ff6905', 
        borderRadius: 50
    },
    submitContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 70,
        marginTop: 50
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25,
        zIndex: -1
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
        width: '75%',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: 'black',
        shadowRadius: 6,
        shadowOpacity: 0.16,
        alignItems: 'center'
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
        paddingBottom: 20
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
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center', 
        flex: 1
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        templateList: state.templateList,
        report: state.report,
        clients: state.clients.clients,
        contractList: state.contractList,
        clientContract: state.clientContract,
        user: state.user.user
    }
}

const mapDispatchToProps = { 
    changeMainField, 
    createReport, 
    createClient,
    updateClient,
    createClientContract,
    changeMainFieldC,
    getContract 
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewReportScreen);