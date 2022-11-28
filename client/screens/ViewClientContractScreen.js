import React, { useState, useEffect } from 'react';
import {
    StyleSheet, 
    View, 
    Text, 
    TouchableOpacity, 
    ImageBackground, 
    FlatList,
    TextInput,
    Pressable,
    Dimensions,
    Image,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    Button
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {
    Entypo,
    Feather,
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialIcons,
    AntDesign,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import { connect, useDispatch } from 'react-redux';
import {
    updateClientContract,
    addPagebreak,
    stylePagebreak,
    swapFields,
    deleteField,
    fetchClientContracts
} from '../redux/actions/clientContractAction'
import { resetContract } from '../redux/actions/contractAction';
import DownloadContract from '../components/DownloadContract'

const windowHeight = Dimensions.get('window').height;   // Dimensions
var heightThreshold = 800;                              // Determines when the styling changes based on screen height
var textColor;                                          // Font Color
var currentIndex;                                       // Field Id
var heightThreshold = 800;                              // For screen size changes
var spacerHeight;                                       // Spacer size
var separatorColor;                                     // Separator size

var uniqueId = new Date();

const ReportEditorScreen = ({contractID, globalStyle, field_list, deleteField, swapFields, addPagebreak, stylePagebreak, clientContract, updateClientContract, resetContract, fetchClientContracts}) => {

    // Navigation //
    const navigation = useNavigation();

    // Local States //
    const [leftSide, setLeftSide] = useState(false);                    // Navigation sidebar
    const [cpbgcolor, setBGColor] = useState('#ffffff');                // Background color preview
    const [selectElement, setSelectElement] = useState(null);           // Selected field
    const [pagebreakSettings, setPagebreakSettings] = useState(false);  // Open Pagebreak settings 

    // Action Variables
    var element;

    return (
        <View 
            onTouchStart={(event) => {
                updateClientContract(contractID, clientContract)
            }} 
            
            style={[styles.container, {backgroundColor: cpbgcolor}]}
        >
        {/* MAIN MODAL */}
            <Modal 
                animationIn="slideInDown"
                animationOut="slideOutUp"
                isVisible={true}
                transparent={true}
                hasBackdrop={false}
                coverScreen={false}
                style={{margin: 0}}
            >
            {/* HEADER */} 
                <View style={styles.headerContainer}>
                    <MaterialIcons
                        name="menu" 
                        size={28} 
                        style={{
                            marginLeft: 20,
                            color:'#ffffff',
                            position: 'absolute',
                            top: Platform.OS === 'ios' ? 65 : 35, 
                            left: 0,
                            zIndex: 1
                        }} 
                        onPress={() => {
                            setLeftSide(true);
                        }} 
                    />
                    <Text
                        style={{
                            color: 'white', 
                            fontSize: 18,
                            textAlign: 'center',
                            marginLeft: 7,
                            width: '55%',
                        }}
                    >{clientContract.address}</Text>
                    <Text 
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: Platform.OS === 'ios' ? 58 : 28, 
                            opacity: 0.7,
                            color: 'white',
                            width: 50,
                            textAlign: 'center'
                        }}
                    >Auto Saved</Text>
                </View>
            {/* LEFTSIDE MENU MODAL */}
            <Modal 
                animationIn="slideInLeft"
                animationOut="slideOutLeft"
                isVisible={leftSide}
                onRequestClose={() => {
                    setLeftSide(!leftSide)
                }}
                transparent={true}
                hasBackdrop={true}
                coverScreen={false}                    
                backdropColor="rgba(0,0,0,.5)"
                style={{margin: 0}}
            >
                <Pressable
                        style={{
                            width: "100%",
                            height: "100%",
                            position: 'absolute',
                            right: 0,
                            top: 0,
                        }}
                        onPress={() => {setLeftSide(false)}}
                ></Pressable>
                <View style={styles.leftSide}>
                    <View style={[styles.topContent, {borderBottomWidth: 0.5, borderColor: 'rgba(208,219,229,0.21)'}]}>
                        <ImageBackground 
                            style={styles.topImage}
                            source={require('../assets/Logo.png')}
                        />
                        <Ionicons 
                            name="ios-close" 
                            size={22} 
                            onPress={() => {
                                setLeftSide(false);
                            }}
                            color='#ffffff' 
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.sideButton}
                            onPress={() => {
                                navigation.navigate("Contracts")
                                resetContract()
                                fetchClientContracts()
                            }}   
                        >
                            <AntDesign name="arrowleft" size={21} color="white" />
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.helpContainer}>
                        <TouchableOpacity
                            style={[styles.sideButton, {marginLeft: 55}]}
                            onPress={() => {
                                navigation.navigate("Help")          
                            }}
                        >
                            <Feather name="help-circle" size={20} color="white" />
                            <Text style={styles.buttonText}>Help</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* PAGEBREAK SETTINGS MODAL */}    
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={pagebreakSettings}
                    transparent={true}
                    hasBackdrop={true}
                    coverScreen={false}            
                    customBackdrop={
                        <View style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,.5)', 
                            marginLeft: -20
                            }} 
                        />
                    }
                    style={{margin: 0}}
                >
                    <View style={styles.design}>
                        <View style={styles.topContent}>
                            <Text style={styles.topContentText}>Pagebreak Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setPagebreakSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <View style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Height</Text>
                            <View style={styles.setTextAlign}>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <TextInput
                                            style={styles.numberInput}
                                            value={String(spacerHeight)}
                                            keyboardType="number-pad"
                                            onChangeText={(text) => {
                                                spacerHeight = text;
                                                stylePagebreak(currentIndex, "height", Number(text))
                                            }}
                                        />
                                        <Text style={styles.numberLabel}>PX</Text>
                                    </View>
                                    <Text style={styles.subLabel}>Height</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </Modal>

        {/* FLATLIST */}
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{width: '100%'}}
        >
            <FlatList
                data={field_list}
                contentContainerStyle={{
                    paddingBottom: 90,
                    paddingTop: Platform.OS === 'ios' ? 60 : 40
                }}
                style={{
                    marginTop: 70,
                    paddingHorizontal: 6,
                    width: '100%',
                }}
                keyExtractor={(item) => item.id}    
                renderItem={({item, index}) => {         
                    var selected, eOutline, margBottom;
                    if (item.id === selectElement) {                         
                        currentIndex = index;
                        eOutline = "#ff6905"; 
                        selected = true;
                        margBottom = 20;
                    } else {
                        eOutline = globalStyle[1].style;
                        selected = false;
                        margBottom = 0;
                    }

                    switch(item.field) {
                        case 'header':
                            
                            // Font Color
                            textColor = field_list[index].style[4].style;

                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                    {/* HEADER TEXT */}
                                        <Text
                                            style={{
                                                textAlign: item.style[2].style,
                                                fontSize: item.style[3].style,
                                                color: textColor,
                                                fontFamily: globalStyle[0].style
                                            }}
                                        >{item.header}</Text>
                                        { item.showSubHeader == "checked" ? (
                                            <Text
                                                style={[
                                                    styles.subheader, 
                                                    {
                                                        color: textColor,
                                                        textAlign: item.style[2].style,
                                                        fontFamily: globalStyle[0].style
                                                    }
                                                ]}
                                            >{item.subheader}</Text>      
                                        ) : null }                  
                                    </View>
                                </View>
                            break;
                        case 'paragraph':
                        
                            // Font Color
                            textColor = field_list[index].style[4].style;

                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                        <Text
                                            style={{
                                                textAlign: item.style[2].style,
                                                fontSize: item.style[3].style,
                                                color: textColor,
                                                fontFamily: globalStyle[0].style
                                            }}
                                        >{item.paragraph}</Text>                     
                                    </View>
                                </View>
                            break;
                        case 'image':
                            
                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                        {item.uri != "" && 
                                            <View
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: item.style[1].style
                                                }}
                                            >
                                                <Image 
                                                    source={{ uri: item.uri }} 
                                                    style={{ 
                                                        width: item.style[2].style, 
                                                        height: item.style[3].style 
                                                    }} 
                                                />
                                            </View>
                                        }                    
                                    </View>
                                </View>
                            break;
                        case 'ul':

                            // Font Color
                            textColor = field_list[index].style[4].style;

                            element = 
                                <View>
                                    <View
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                        <FlatList
                                            data={field_list[index].list}
                                            keyExtractor={(ulitem) => ulitem.id} 
                                            renderItem={({item: ulitem, index: ulindex}) => {  
                                                return (
                                                    <View 
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'flex-start',
                                                            justifyContent: item.style[2].style,
                                                            width: "100%",
                                                            paddingRight: 10
                                                        }}
                                                    >
                                                        <FontAwesome
                                                            name="circle"
                                                            size={13}
                                                            color={textColor}
                                                            style={{
                                                                paddingRight: 10,
                                                                paddingTop: 10
                                                            }}
                                                        />
                                                        <Text
                                                            style={{
                                                                fontSize: item.style[3].style,
                                                                color: textColor,
                                                                fontFamily: globalStyle[0].style,
                                                                paddingTop: item.style[3].style == 14 ? 8 : 5
                                                            }}
                                                        >{ulitem.value}</Text>
                                                    </View>
                                                )
                                            }}
                                        />                   
                                    </View>
                                </View>
                            break;
                        case 'ol':
                    
                            // Font Color
                            textColor = field_list[index].style[4].style;

                            element = 
                                <View>
                                    <View
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                        <FlatList
                                            data={field_list[index].list}
                                            keyExtractor={(ulitem) => ulitem.id} 
                                            renderItem={({item: ulitem, index: ulindex}) => {  
                                                return (
                                                    <View 
                                                        style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'flex-start',
                                                            justifyContent: item.style[2].style,
                                                            width: "100%",
                                                            paddingRight: selected ? 45 : 0,
                                                            paddingLeft: selected ? 5 : 0
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: textColor,
                                                                paddingRight: 10,
                                                                fontSize: 17,
                                                                paddingTop: 6
                                                            }}
                                                        >{ulindex + 1}.</Text>
                                                        <Text
                                                            style={{
                                                                fontSize: item.style[3].style,
                                                                color: textColor,
                                                                fontFamily: globalStyle[0].style,
                                                                paddingTop: item.style[3].style == 14 ? 8 : 5
                                                            }}
                                                        >{ulitem.value}</Text>
                                                    </View>
                                                )
                                            }}
                                        />                       
                                    </View>
                                </View>
                            break;
                        case 'spacer':
                    
                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                        <View style={{height: item.style[0].style}}></View>                 
                                    </View>
                                </View>
                            break;
                        case 'separator':
                            
                            // Font Color
                            separatorColor = field_list[index].style[1].style; 

                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                        <View 
                                            style={{
                                                borderBottomWidth: item.style[0].style,
                                                borderBottomColor: separatorColor
                                            }}></View>                  
                                    </View>
                                </View>
                            break;
                        case 'pagebreak':
                                
                            element = 
                                <View>
                                    <Pressable 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                        onPress={() => {
                                            setSelectElement(item.id);
                                        }}
                                    >
                                        <View style={{height: item.style[0].style, 
                                                        display: 'flex', 
                                                        flexDirection: 'row', 
                                                        justifyContent: 'center', 
                                                        alignItems: 'center'}}>
                                            <View style={{width: "30%", height: 1, borderWidth: 0.5, borderColor: '#ddd'}}></View>
                                            <Text style={{color: "#ddd", paddingHorizontal: 10}}>Page Break</Text>
                                            <View style={{width: "30%", height: 1, borderWidth: 0.5, borderColor: '#ddd'}}></View>
                                        </View>
                                        { !selected ? (
                                            <View style={{
                                                backgroundColor: 'rgba(0,0,0,0)',
                                                height: '110%', 
                                                width: '110%', 
                                                position: 'absolute', 
                                                padding: 50
                                            }}></View>
                                        ) : 
                                            <View style={styles.elementButtons}>
                                                <Pressable
                                                    onPress={() => {
                                                        setSelectElement()
                                                    }}
                                                    style={Platform.OS === 'ios' ? styles.check : [styles.elementButton, {backgroundColor: '#ff6905'}]}
                                                >
                                                    <AntDesign 
                                                        name="check"
                                                        size={15}
                                                        color="white"
                                                    />
                                                </Pressable>
                                                { index !== 0 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            swapFields(index, index-1, field_list[index], field_list[index-1])
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <AntDesign
                                                            name="up"
                                                            size={16}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                                ) : null}
                                                { index !== field_list.length-1 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            swapFields(index, index+1, field_list[index], field_list[index+1])
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <AntDesign
                                                            name="down"
                                                            size={16}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                                ) : null }
                                                <Pressable 
                                                    onPress={() => {
                                                        setPagebreakSettings(true)
                                                        spacerHeight = field_list[index].style[0].style
                                                    }}
                                                    style={styles.elementButton}
                                                >
                                                    <Feather
                                                        name="settings"
                                                        size={20}
                                                        color="white"
                                                    />
                                                </Pressable>
                                                <Pressable 
                                                    onPress={() => {
                                                        deleteField(currentIndex)
                                                    }}
                                                    style={[styles.elementButton, {backgroundColor: '#E82323'}]}
                                                >
                                                    <Feather
                                                        name="trash-2"
                                                        size={20}
                                                        color="white"
                                                    />
                                                </Pressable>
                                            </View>
                                        }                         
                                    </Pressable>
                                </View>
                            break;
                        case 'name':
                            
                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline,
                                            }
                                        ]}
                                    >
                                    {/* NAME TEXT */}
                                        <View style={styles.inputContainer}>
                                            <Text style={[styles.inputLabel, 
                                                {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Name</Text>
                                            <View style={styles.input}>
                                                <Text style={[styles.cText, {fontFamily: globalStyle[0].style}]}>{item.firstName}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Text style={[styles.cText, {fontFamily: globalStyle[0].style}]}>{item.lastName}</Text>
                                            </View> 
                                        </View>              
                                    </View>
                                </View>
                            break;            
                        case 'email':
                            
                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                    {/* EMAIL TEXT */}
                                    <View style={styles.inputContainer}>
                                        <Text style={[styles.inputLabel, 
                                            {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Email</Text>
                                            <View style={styles.input}>
                                                <Text style={[styles.cText, {fontFamily: globalStyle[0].style}]}>{item.email}</Text>
                                            </View>
                                        </View>    
                                    </View>
                                </View>
                            break;
                        case 'phone':
                            
                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                    {/* PHONE TEXT */}
                                        <View style={styles.inputContainer}>
                                            <Text style={[styles.inputLabel, 
                                                {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Phone Number</Text>
                                            <View style={[styles.input, {width: '50%'}]}>
                                                <Text style={[styles.cText, {fontFamily: globalStyle[0].style}]}>{item.phone}</Text>
                                            </View>
                                        </View>   
                                    </View>
                                </View>
                            break;
                        case 'address':

                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                    {/* ADDRESS TEXT */}
                                        <View style={styles.inputContainer}>
                                            <Text style={[styles.inputLabel, 
                                                {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Address</Text>
                                            <View style={styles.input}>
                                                <Text style={[styles.cText, {fontFamily: globalStyle[0].style}]}>{item.streetAddress}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Text style={[styles.cText, {fontFamily: globalStyle[0].style}]}>{item.city}</Text>
                                            </View>
                                            <View style={styles.input}>
                                                <Text style={[styles.cText, {fontFamily: globalStyle[0].style}]}>{item.state1}</Text>
                                            </View>
                                            { /*<View style={styles.input}>
                                                <Text style={{color: '#aaa'}}>Zip Code</Text>
                                            </View> */}
                                        </View>
                                    </View>
                                </View>
                            break;
                        case 'price':

                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                        <View style={styles.inputContainer}>
                                            <Text style={[styles.inputLabel, 
                                                {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Price</Text>
                                            <View style={[styles.input, {width: '50%'}]}>
                                                <Text style={[styles.cText, {fontFamily: globalStyle[0].style}]}>${item.price}</Text>
                                            </View>
                                        </View>       
                                    </View>
                                </View>
                            break;
                        case 'date':
                            
                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                    {/* DATE TEXT */}
                                        <View style={styles.inputContainer}>
                                            <Text style={[styles.inputLabel, 
                                                {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Date</Text>
                                            <View style={styles.input}>
                                                <Text style={[styles.cText, {fontFamily: globalStyle[0].style}]}>{item.date}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            break;
                        case 'signature':
                            
                            element = 
                                <View>
                                    <View 
                                        style={[
                                            styles.element,
                                            {
                                                paddingHorizontal: selected ? 17 : 10,
                                                marginBottom: margBottom, 
                                                borderColor: eOutline
                                            }
                                        ]}
                                    >
                                        <View style={styles.inputContainer}>
                                            <Text style={[styles.inputLabel, 
                                                {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Signature</Text>
                                            <Text 
                                                style={{
                                                    marginTop: 10, 
                                                    marginBottom: 10, 
                                                    textAlign: item.style[2].style, 
                                                    fontFamily: globalStyle[0].style
                                                }}
                                            >Signing your full name below constitutes a legally binding signature.
                                            </Text>
                                            <View style={{
                                                width: '100%',
                                                borderBottomColor: "#000",
                                                borderBottomWidth: 1,
                                                paddingBottom: 4,
                                                marginTop: 10
                                            }}>
                                                <Text style={{color: '#aaa'}}>Full Name</Text>
                                            </View>
                                            <View style={{
                                                width: '50%',
                                                borderBottomColor: "#000",
                                                borderBottomWidth: 1,
                                                paddingBottom: 4,
                                                marginTop: 15
                                            }}>
                                                <Text style={{color: '#aaa'}}>Date</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            break;                     
                        default: 
                            break;
                    }
                    return ( 
                        <View>
                            {element}
                        </View>
                    )
                }}
            />
        </KeyboardAvoidingView>
            {Platform.OS === 'ios' ? (
                <TouchableOpacity 
                    onPress={() => {
                        addPagebreak('pagebreak', [{styleType: "height", style: 40}])
                    }}
                    style={styles.designFloat}
                >
                    <MaterialCommunityIcons style={styles.floatIcon} name="format-page-break" size={24} color="white" />
                </TouchableOpacity>
            ) : null }
            <DownloadContract contract={clientContract} />
        </View>
    );
} 


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },
    text: {
        paddingTop: 30,
        textAlign: 'center',
        color: '#D0DBE5'
    },
    headerContainer: {
        height: Platform.OS === 'ios' ? 105 : 75, 
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        top: 0,
        width: '100%',
        backgroundColor: '#212433',
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: '#000',
        shadowRadius: 6,
        shadowOpacity: .16,
        elevation: 0
    },
    leftSide: {
        height: '100%',
        backgroundColor: '#212433',
        position: 'absolute',
        left: 0,
        top: 0,
        width: 315,
        paddingTop: 40,
    },
    sideButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32
    },
    buttonText: {
        color: 'white',
        paddingLeft: 25,
        fontSize: 14
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        marginTop: windowHeight > heightThreshold ? 40 : 0,
        paddingHorizontal: 23,
    },
    topImage: {
        width: 110,
        height: 25,
    },
    topContentText: {
        fontSize: 18,
        color: 'white'
    },
    buttonContainer: {
        marginTop: 35,
        marginLeft: 55,
        flexDirection: 'column',
    },
    helpContainer: {
        position: 'absolute',
        bottom: windowHeight > heightThreshold ? 15: 0,
        paddingTop: 12,
        width: '100%',
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(208,219,229,0.21)',
        bottom: windowHeight > heightThreshold ? 15: 0,
    },
    float: {
        flexDirection: 'row',
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 15,
        padding: 10,
        backgroundColor: '#282C3A',
        borderRadius: 70,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: '#000',
        elevation: 0,
        shadowRadius: 8,
        shadowOpacity: .4,
    },
    designFloat: {
        flexDirection: 'row',
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 15,
        padding: 10,
        backgroundColor: '#ff6905',
        borderRadius: 70,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: '#000',
        elevation: 0,
        shadowRadius: 8,
        shadowOpacity: .4,
    },
    floatIcon: {
        marginRight: 0
    },
    floatText: {
        color: 'white',
        fontSize: 18
    },
    components: {
        height: '100%',
        backgroundColor: '#212433',
        position: 'absolute',
        left: 0,
        width: 315,
        top: 0,
        paddingTop: 25,
        zIndex: 1,
        elevation: 5
    },
    design: {
        height: '100%',
        backgroundColor: '#212433',
        flexDirection: 'column',
        position: 'absolute',
        right: 0,
        top: 0,
        width: 315,
        paddingTop: 25,
        zIndex: 1,
        elevation: 5,
    },
    topButtons: {
        flexDirection: 'row',
    },
    topButton: {
        width: '33.33%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#141824',
        height: 55,
        borderBottomWidth: 4
    },
    topButtonText: {
        color: 'white',
        fontSize: 14,
        textTransform: 'uppercase'
    },
    fields: {
        flexDirection: 'column',
        width: '100%',
    },
    field: {
        flexDirection: 'row',
        width: '100%',
        height: 55,
        borderBottomWidth: 1,
        borderColor: 'rgba(208,219,229,0.24)'
    },
    fieldIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212433',
        width: 55
    },
    fieldContent: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 25,
        backgroundColor: '#3B3F4D',
        width: 260
    },
    fieldText: {
        color: 'white',
        fontSize: 15
    },
    topDesign: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: '#141824',
        height: 55,
        paddingLeft: 30
    },
    designHeader: {
        color: 'white',
        marginLeft: 25,
        fontSize: 15,
        marginTop: 30,
        marginBottom: 12
    },
    openCP: {
        height: 35,
        width: 35,
    },
    colorContainer: {
        flexDirection: 'row'
    },
    colorField: {
       backgroundColor: '#3B3F4D',
       height: 35,
       width: 210,
       alignItems: 'flex-start',
       justifyContent: 'center',
       paddingLeft: 15
    },
    element: {
        paddingVertical: 10,
        marginHorizontal: 10,
        marginTop: 0,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5
    },
    header: {
        fontWeight: 'bold',
        paddingBottom: 5,
        paddingLeft: 5,
    },
    subheader: {
        fontSize: 17,
        color: '#777',
        paddingBottom: 5,
        paddingLeft: 5
    },
    elementButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: Platform.OS == 'ios' ? -30 : 0,
        paddingTop: 10,
    },
    elementButton: {
        borderRadius: 70,
        width: 37,
        height: 37,
        marginHorizontal: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#212433'
    },
    settingsContent: {
        padding: 30
    },
    settingsLabel: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
        fontWeight: 'bold'
    },
    setTextAlign: {
        flexDirection: 'row',
        width: "100%",
    },
    setAlignButton: {
        height: 40,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#282C3A',
        borderRadius: 3,
    },
    setAlignText: {
        fontSize: 13,
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    colorPicker: {
        height: 300,
        position: 'absolute',
        top: 170
    },
    numberInput: {
        backgroundColor: '#3B3F4D',
        color: 'white',
        width: 70,
        height: 35,
        padding: 10,
        borderWidth: 1,
        borderColor: '#282C3A',
    },
    numberLabel: {        
        height: 35,
        backgroundColor: '#3B3F4D',
        borderWidth: 1,
        borderColor: '#282C3A',
        padding: 8,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    subLabel: {
        color: 'rgba(208,219,229,0.55)',
        paddingTop: 5,
        fontSize: 12
    },
    dottedLine: {
        borderBottomWidth: 1,
        width: '34%',
        borderBottomColor: "#aaaaaa"
    },
    inputContainer: {
        flexDirection: 'column',
        width: '100%'
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2',
        borderColor: '#dddddd',
        borderWidth: 1,
        borderRadius: 5,
        color: "#dddddd"
    },
    dsection: {
        marginTop: 20
    },
    sectionLabel: {
        color: 'white',
        fontSize: 17,
        width: '80%'
    },
    optionInput: {
        height: 35,
        borderRadius: 7,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        width: '83%'
    },
    addOption: {
        backgroundColor: '#282C3A',
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        paddingHorizontal: 25,
        marginTop: 10,
        borderRadius: 7
    },
    optionContainer: {
        width: '95%',
        alignItems: 'center',
        marginTop: 10
    },
    dropShadow:{
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowColor: '#000',
        elevation: 5,
        shadowRadius: 8,
        shadowOpacity: .2,
    },
    check: {
        backgroundColor: '#ff6905',
        height: 25,
        width: 25,
        position: 'absolute',
        left: -30,
        top: '-60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70,
    },
    dataDropdowns: {
        marginHorizontal: 15,
        marginTop: 20
    },
    dataHeaders: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    },
    filledData: {
        backgroundColor: '#282C3A',
        paddingVertical: Platform.OS === 'ios' ? 15: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderRadius: 7,
        marginBottom: 20,
        marginTop: 10
    },
    filledText: {
        fontSize: 14,
        color: '#d0dbe6'
    },
    emptyStay: {
        textAlign: 'center',
    },
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#0580FF',
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff',
    },
    inputContainer: {
        flexDirection: 'column',
        width: '100%'
    },
    input: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10
    },
    inputLabel: {
        fontSize: 22,
    },
    cText: {
        fontSize: 16
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        field_list: state.clientContract.clientContract.field_list,
        globalStyle: state.clientContract.clientContract.globalStyle,
        contractID: state.CCList.currentId,
        clientContract: state.clientContract
    }
}

const mapDispatchToProps = { 
    deleteField, 
    swapFields,
    addPagebreak,
    stylePagebreak,
    updateClientContract,
    resetContract,
    fetchClientContracts
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportEditorScreen);