import React, {useState, useEffect} from 'react';
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
    KeyboardAvoidingView
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
import DropDownPicker from 'react-native-dropdown-picker';
import { ColorPicker } from 'react-native-color-picker';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { 
    addHeaderC,
    deleteFieldC,
    styleHeaderC,
    styleGlobalC,
    addParagraphC,
    changeParagraphC,
    styleParagraphC,
    addImageC,
    styleImageC,
    changeImageC,
    changeHeaderC,
    swapFieldsC,
    addULC,
    addULItemC,
    changeULItemC,
    styleULC,
    deleteListItemC,
    addOLC,
    addOLItemC,
    changeOLItemC,
    styleOLC,
    addSpacerC,
    styleSpacerC,
    addSeparatorC,
    styleSeparatorC,
    addPageBreakC,
    addNameC,
    styleNameC,
    addEmailC,
    styleEmailC,
    addPhoneC,
    stylePhoneC,
    addAddressC,
    styleAddressC,
    addPriceC,
    changeNumberC,
    styleNumberC,
    addDateC,
    styleDateC,
    addSignatureC,
    styleSignatureC,
    addHouseImage,
    styleHouseImage,
    changeContractId,
    updateContract,
    changeTitle,
    resetContract,
    getUserContracts
} from '../redux/actions/contractAction';
import { Checkbox } from 'react-native-paper';

//Global Variables
const windowHeight = Dimensions.get('window').height;   // Dimensions
var heightThreshold = 800;                              // Determines when the styling changes based on screen height
var abSelect1, abSelect2, abSelect3;                    // Align Button Styles
var fsSelect1, fsSelect2, fsSelect3;                    // Font Size Styles
var textColor;                                          // Font Color
var currentIndex;                                       // Field Id
var heightThreshold = 800;                              // For screen size changes
var imageWidth, imageHeight;                            // Image Field Variables
var showSub;                                            // Show subheader
var spacerHeight;                                       // Spacer size
var separatorHeight, separatorColor;                    // Separator size

const ContractEditorScreen = ({contractList, contract, globalStyle, field_list, addHeaderC, deleteFieldC, styleHeaderC, styleGlobalC, addParagraphC, styleParagraphC, addImageC, styleImageC, changeImageC, changeHeaderC, changeParagraphC, swapFieldsC, addULC, addULItemC, changeULItemC, styleULC, deleteListItemC, addOLC, addOLItemC, changeOLItemC, styleOLC, addSpacerC, styleSpacerC, addSeparatorC, styleSeparatorC, addPageBreakC, addNameC, styleNameC, addEmailC, styleEmailC, addPhoneC, stylePhoneC, addAddressC, styleAddressC, addPriceC, changeNumberC, styleNumberC,  addDateC, styleDateC, addSignatureC, styleSignatureC, addHouseImage, styleHouseImage, changeContractId, updateContract, changeTitle, resetContract, getUserContracts, user}) => {
     
    // Navigation //
    const navigation = useNavigation();

    // Local States //
    const [leftSide, setLeftSide] = useState(false);                    // Navigation sidebar
    const [components, setComponents] = useState(false);                // Fields sidebar
    const [design, setDesign] = useState(false);                        // Design sidebar
    const [topSelected, setSelected] = useState(1);                     // Fields sidebar tabs
    const [openCP, setOpenCP] = useState(false);                        // Color picker modal
    const [openBGCP, setOpenBGCP] = useState(false);                    // Background color picker modal
    const [cpcolor, setColor] = useState('#000000');                    // Color preview
    const [cpbgcolor, setBGColor] = useState('#ffffff');                // Background color preview
    const [selectElement, setSelectElement] = useState(null);           // Selected field
    const [headerSettings, setHeaderSettings] = useState(false)         // Open header settings sidebar
    const [paragraphSettings, setParagraphSettings] = useState(false)   // Open paragraph settings sidebar
    const [imageSettings, setImageSettings] = useState(false)           // Open image settings sidebar
    const [image, setImage] = useState(null);                           // Image Picker
    const [ULSettings, setULSettings] = useState(false);                // Open UL settings sidebar
    const [OLSettings, setOLSettings] = useState(false);                // Open OL settings sidebar
    const [spacerSettings, setSpacerSettings] = useState(false);        // Open Spacer settings sidebar
    const [separatorSettings, setSeparatorSettings] = useState(false);  // Open Separator settings sidebar
    const [nameSettings, setNameSettings] = useState(false);            // Open name settings sidebar
    const [emailSettings, setEmailSettings] = useState(false);          // Open email settings sidebar
    const [phoneSettings, setPhoneSettings] = useState(false);          // Open phone settings sidebar
    const [addressSettings, setAddressSettings] = useState(false);      // Open address settings sidebar
    const [numberSettings, setNumberSettings] = useState(false);        // Open number settings sidebar
    const [dateSettings, setDateSettings] = useState(false);            // Open date settings sidebar
    const [signatureSettings, setSignatureSettings] = useState(false);  // Open signature settings sidebar
    const [houseimageSettings, setHouseImageSettings] = useState(false);            // Open houseimage settings
    const [fontLoaded, setFontLoaded] = useState(false)
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    useEffect(() => {
        requestPermission()
    }, []);

    // Action Variables
    var field, element, style, uri, header, subheader, prefix, showPrefix, firstName, lastName, paragraph, showSubHeader, list, email, phone, streetAddress, city, state1, zipCode, price, date, signature;

    const handleStyleGlobal = (styleType, style) => {
        styleGlobalC(styleType, style)
    }
    const handleAddHeader = () => {
        field = "header";
        header = "Header";
        subheader = "Subheader";
        showSubHeader = "checked";
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "textAlign",
                style: "left"
            },
            {
                styleType: "fontSize",
                style: 30
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addHeaderC(field, header, subheader, showSubHeader, style)
    }
    const handleChangeHeader = (index, type, value) => {
        changeHeaderC(index, type, value)
    }
    const handleStyleHeader = (id, styleType, style) => {
        styleHeaderC(id, styleType, style)
    }
    const handleAddParagraph = () => {
        field = "paragraph";
        paragraph = "Paragraph";
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "textAlign",
                style: "left"
            },
            {
                styleType: "fontSize",
                style: 17
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addParagraphC(field, paragraph, style)
    }
    const handleChangeParagraph = (index, value) => {
        changeParagraphC(index, value)
    }
    const handleStyleParagraph = (id, styleType, style) => {
        styleParagraphC(id, styleType, style)
    }
    const handleAddImage = () => {
        field = "image";
        uri = "";
        style = [
            {
                styleType: "alignButtons",
                style: "#454C69,#ff6905,#454C69", 
            },
            {
                styleType: "imageAlign",
                style: "center"
            },
            {
                styleType: "width",
                style: 200
            },
            {
                styleType: "height",
                style: 150
            }
        ]
        addImageC(field, uri, style)
    }
    const handleChangeImage = (index, uri) => {
        changeImageC(index, uri)
    }
    const handleStyleImage = (id, styleType, style) => {
        styleImageC(id, styleType, style)
    }
    const handleDeleteField = (id, props) => {        
        deleteFieldC(id)       
    }
    const handleSwapFields = (index1, index2, field1, field2) => {
        swapFieldsC(index1, index2, field1, field2)
    }
    const handleAddUL = () => {
        field = "ul";
        list = [
            {
                id: 0,
                value: ""
            }
        ]
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "listAlign",
                style: "flex-start"
            },
            {
                styleType: "fontSize",
                style: 17
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addULC(field, list, style)
    }
    const handleAddULItem = (index) => {
        var ulvalue = ""
        addULItemC(index, ulvalue)
    }
    const handleChangeULItem = (index, index2, value) => {
        changeULItemC(index, index2, value)
    }
    const handleStyleUL = (index, styleType, style) => {
        styleULC(index, styleType, style)
    }
    const handleDeleteListItem = (index1, index2) => {
        deleteListItemC(index1, index2)
    }
    const handleAddOL = () => {
        field = "ol";
        list = [
            {
                id: 0,
                value: ""
            }
        ]
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "listAlign",
                style: "flex-start"
            },
            {
                styleType: "fontSize",
                style: 17
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addOLC(field, list, style)
    }
    const handleAddOLItem = (index) => {
        var ulvalue = ""
        addOLItemC(index, ulvalue)
    }
    const handleChangeOLItem = (index, index2, value) => {
        changeOLItemC(index, index2, value)
    }
    const handleStyleOL = (index, styleType, style) => {
        styleOLC(index, styleType, style)
    }
    const handleAddSpacer = () => {
        field = "spacer";
        style = [
            {
                styleType: "height",
                style: 20
            }
        ]
        addSpacerC(field, style)
    }
    const handleStyleSpacer = (index, styleType, style) => {
        styleSpacerC(index, styleType, style)
    }
    const handleAddSeparator = () => {
        field = "separator";
        style = [
            {
                styleType: "borderWidth",
                style: 1
            },
            {
                styleType: "borderColor",
                style: "#000000"
            }
        ]
        addSeparatorC(field, style)
    }
    const handleStyleSeparator = (index, styleType, style) => {
        styleSeparatorC(index, styleType, style)
    }
    const handleAddName = () => {
        field = "name";
        prefix = "Prefix";
        showPrefix = "checked";
        firstName = "First Name";
        lastName = "Last Name";
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "textAlign",
                style: "left"
            },
            {
                styleType: "fontSize",
                style: 22
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addNameC(field, prefix, showPrefix, firstName, lastName, style)
    }
    const handleStyleName = (id, styleType, style) => {
        styleNameC(id, styleType, style)
    }
    const handleAddEmail = () => {
        field = "email";
        email = "Email";
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "textAlign",
                style: "left"
            },
            {
                styleType: "fontSize",
                style: 22
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addEmailC(field, email, style)
    }
    const handleStyleEmail = (id, styleType, style) => {
        styleEmailC(id, styleType, style)
    }
    const handleAddPhone = () => {
        field = "phone";
        phone = "Phone";
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "textAlign",
                style: "left"
            },
            {
                styleType: "fontSize",
                style: 22
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addPhoneC(field, phone, style)
    }
    const handleStylePhone = (id, styleType, style) => {
        stylePhoneC(id, styleType, style)
    }
    const handleAddAddress = () => {
        field = "address";
        streetAddress = "Street Address";
        city = "City";
        state1 = "State";
        zipCode = "Zip Code";
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "textAlign",
                style: "left"
            },
            {
                styleType: "fontSize",
                style: 22
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addAddressC(field, streetAddress, city, state1, zipCode, style)
    }
    const handleStyleAddress = (id, styleType, style) => {
        styleAddressC(id, styleType, style)
    }
    const handleAddPrice = () => {
        field = "price";
        price = "250";
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "textAlign",
                style: "left"
            },
            {
                styleType: "fontSize",
                style: 22
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addPriceC(field, price, style)
    }
    const handleChangeNumber = (index, type, value) => {
        changeNumberC(index, type, value)
    }
    const handleStyleNumber = (id, styleType, style) => {
        styleNumberC(id, styleType, style)
    }
    const handleAddDate = () => {
        field = "date";
        date = "Date";
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "textAlign",
                style: "left"
            },
            {
                styleType: "fontSize",
                style: 22
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addDateC(field, date, style)
    }
    const handleStyleDate = (id, styleType, style) => {
        styleDateC(id, styleType, style)
    }
    const handleAddSignature = () => {
        field = "signature";
        signature = "Signature";
        style = [
            {   
                styleType: "alignButtons",
                style: "#ff6905,#454C69,#454C69",                
            },
            {
                styleType: "fontButtons",
                style: "#ff6905,#454C69,#454C69",
            },
            {
                styleType: "textAlign",
                style: "left"
            },
            {
                styleType: "fontSize",
                style: 22
            },
            {
                styleType: "fontColor",
                style: "#000000"
            }
            
        ];
        addSignatureC(field, signature, style)
    }
    const handleStyleSignature = (id, styleType, style) => {
        styleSignatureC(id, styleType, style)
    }
    const handleAddHouseImage = () => {
        field = "houseimage";
        uri = "";
        style = [
            {
                styleType: "alignButtons",
                style: "#454C69,#ff6905,#454C69", 
            },
            {
                styleType: "imageAlign",
                style: "center"
            },
            {
                styleType: "width",
                style: 200
            },
            {
                styleType: "height",
                style: 150
            }
        ]
        addHouseImage(field, uri, style)
    }

    // Dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Roboto', value: 'roboto'},
        {label: 'SF Pro Display', value: 'sfprodisplay'},
        {label: 'Merriweather', value: 'merriweather'},
        {label: 'Open Sans', value: 'opensans'},
        {label: 'Poppins', value: 'poppins'},
        {label: 'Raleway', value: 'raleway'},
        {label: 'Futura', value: 'futura'},
        {label: 'Oswald', value: 'oswald'}
    ]);

    // Element Sidebar Header Styles
    var underline1, underline2, underline3, fields;
    switch(topSelected) {
        //FORM TAB
        case 1:
            underline1 = '#ff6905'
            underline2 = '#141824'
            underline3 = '#141824'
            fields = 
                <ScrollView style={styles.fields}>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddName}
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome name="user-circle" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Name</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddEmail}
                    >
                        <View style={styles.fieldIcon}>
                            <MaterialIcons name="mail-outline" size={25} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Email</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddPhone}    
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="phone-alt" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Phone</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddAddress}
                    >
                        <View style={styles.fieldIcon}>
                            <Feather name="map-pin" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Address</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddPrice}
                    >
                        <View style={styles.fieldIcon}>
                            <MaterialIcons name="attach-money" size={24} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Price</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddDate}
                    >
                        <View style={styles.fieldIcon}>
                            <Ionicons name="calendar-outline" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Date</Text>
                        </View>
                    </TouchableOpacity>
                    {/*<TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddHouseImage}
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="home" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>House Image</Text>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddSignature}
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="pen-nib" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Signature</Text>
                        </View>
                    </TouchableOpacity>                    
                </ScrollView>
            break;
        //BASIC TAB
        case 2: 
            underline1 = '#141824'
            underline2 = '#ff6905'
            underline3 = '#141824'
            fields = 
                <View style={styles.fields}>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddHeader}
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome name="header" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Header</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddParagraph}
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="paragraph" size={25} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Paragraph</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddImage}
                    >
                        <View style={styles.fieldIcon}>
                            <Feather name="image" size={28} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Image</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddUL}
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="list-ul" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Bulleted List</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddOL}    
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="list-ol" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Numbered List</Text>
                        </View>
                    </TouchableOpacity>                    
                </View>
            break;
        //LAYOUT TAB
        case 3: 
            underline1 = '#141824'
            underline2 = '#141824'
            underline3 = '#ff6905'
            fields = 
                <View style={styles.fields}>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddSpacer}    
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="grip-lines" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Spacer</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddSeparator}
                    >
                        <View style={styles.fieldIcon}>
                            <Ionicons name="remove-outline" size={35} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Separator</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            break;
        default:
            break;
    }

    // Image Picker
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        handleChangeImage(currentIndex, result.uri)

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    
    return (
        <View 
            style={[styles.container, {backgroundColor: cpbgcolor}]}
            onTouchStart={() => {
                changeContractId(contractList.currentId)
                updateContract(contract.id, contract)
            }}
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
                    <TextInput 
                        style={{
                            color: 'white', 
                            fontSize: 18,
                            textAlign: 'center',
                            marginLeft: 7,
                            width: '55%',
                        }}
                        defaultValue="Contract"
                        value={contract.title}
                        onChangeText={(text) => {
                            changeTitle(text)
                        }} 
                    />
                    <Text 
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: Platform.OS === 'ios' ? 68 : 38,
                            opacity: 0.7,
                            color: 'white'
                        }}
                    >Auto-saved</Text>
                </View>
            {/* ACTIONS DRAWER MENU */}
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
                                color='#ffffff' />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.sideButton}
                                onPress={() => {
                                    navigation.goBack()
                                    resetContract()
                                    getUserContracts(user.contracts)
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
            {/* LEFT DESIGN DRAWER */}
                <Modal 
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                    isVisible={components}
                    onRequestClose={() => {
                        setComponents(!components)
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
                        onPress={() => {setComponents(false)}}
                    ></Pressable>
                    <View style={styles.components}>
                        <View style={styles.topContent}>
                            <Text style={styles.topContentText}>Contract Elements</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22}
                                onPress={() => {
                                    setComponents(false);
                                }}
                                color='#ffffff' />
                        </View>
                        <View style={styles.topButtons}>   
                            <TouchableOpacity 
                                style={[
                                    styles.topButton, 
                                    {
                                        borderColor: underline1
                                    }
                                ]}
                                onPress={() => {
                                    setSelected(1)
                                }}
                            >
                                <Text style={styles.topButtonText}>Report</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[
                                    styles.topButton, 
                                    {
                                        borderColor: underline2
                                    }
                                ]}
                                onPress={() => {
                                    setSelected(2)
                                }}
                            >
                                <Text style={styles.topButtonText}>Basic</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[
                                    styles.topButton, 
                                    {
                                        borderColor: underline3
                                    }
                                ]}
                                onPress={() => {
                                    setSelected(3)
                                }}
                            >
                                <Text style={styles.topButtonText}>Layout</Text>
                            </TouchableOpacity>
                        </View>
                        {fields}
                    </View>
                </Modal>
            {/* RIGHT DESIGN DRAWER */}
                <Modal 
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={design}
                    onRequestClose={() => {
                        setDesign(!design)
                    }}
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
                    <Pressable
                        style={{
                            width: "100%",
                            height: "100%",
                            position: 'absolute',
                            right: 0,
                            top: 0,
                        }}
                        onPress={() => {setDesign(false)}}
                    ></Pressable>
                    <View style={styles.design}>
                        <View style={styles.topContent}>
                            <Text style={styles.topContentText}>Contract Design</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setDesign(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>Global Styles</Text>
                        </View>
                        <View style={styles.designContent}>
                            <Text style={styles.designHeader}>Font Family</Text>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                onChangeValue={(value) => {
                                    handleStyleGlobal("fontFamily", value)
                                }}
                                theme="DARK"
                                placeholder={Platform.OS == "ios" ? "SF Pro Display [Default]" : "Roboto [Default]"}
                                containerStyle={{
                                    width: 265,
                                    marginLeft: 25
                                }}
                                style={{
                                    height: 35,
                                    borderColor: '#3B3F4D',
                                    backgroundColor: '#3B3F4D',
                                    color: 'white',
                                    borderRadius: 0,
                                }}
                                zIndex={openCP ? 0 : 1000}
                            />
                            <Text style={styles.designHeader}>Background Color</Text>
                            <View style={styles.colorContainer}>
                                <View style={[styles.colorField, {marginLeft: 25, width: 230}]}>
                                    <Text style={{color: 'white'}}>{cpbgcolor}</Text>
                                </View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setOpenBGCP(true)
                                    }}
                                    style={[styles.openCP, {backgroundColor: cpbgcolor}]}    
                                >                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                </Modal>
            {/* BACKGROUND COLOR PICKER */}
                <Modal
                    animationIn="slideInDown"
                    animationOut="slideOutUp"
                    isVisible={openBGCP}
                    transparent={true}
                    hasBackdrop={false}
                    coverScreen={true}
                    onRequestClose={() => {
                        setOpenBGCP(!openBGCP)
                    }}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <View style={{height: 300}}>
                        <ColorPicker
                            onColorSelected={(color) => {
                                setBGColor(color)
                                handleStyleGlobal("backgroundColor", color)
                            }}
                            style={{
                                flex:1,
                                backgroundColor:'white',
                                width: 250,
                                padding: 20
                            }}
                        />
                        <Ionicons 
                            name="ios-close" 
                            size={25} 
                            onPress={() => {
                                setOpenBGCP(false);
                            }}
                            color='#000' 
                            style={{
                                position: 'absolute',
                                right: 0,
                                padding: 10
                            }}
                        />
                    </View>
                </Modal>
            {/* HEADER SETTINGs */}  
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={headerSettings}
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
                            <Text style={styles.topContentText}>Header Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setHeaderSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Text Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleHeader(currentIndex, "textAlign", "left")
                                        handleStyleHeader(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleHeader(currentIndex, "textAlign", "center")
                                        handleStyleHeader(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleHeader(currentIndex, "textAlign", "right")
                                        handleStyleHeader(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Header Font Size</Text>       
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect1}]}
                                    onPress={() => {
                                        handleStyleHeader(currentIndex, "fontSize", 30)
                                        handleStyleHeader(currentIndex, "fontButtons", "#ff6905,#454C69,#454C69")
                                        fsSelect1 = "#ff6905"
                                        fsSelect2 = "#454D69"
                                        fsSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Default</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect2}]}
                                    onPress={() => {
                                        handleStyleHeader(currentIndex, "fontSize", 38)
                                        handleStyleHeader(currentIndex, "fontButtons", "#454C69,#ff6905,#454C69")
                                        fsSelect1 = "#454D69"
                                        fsSelect2 = "#ff6905"
                                        fsSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Large</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect3}]}
                                    onPress={() => {
                                        handleStyleHeader(currentIndex, "fontSize", 22)
                                        handleStyleHeader(currentIndex, "fontButtons", "#454C69,#454C69,#ff6905")
                                        fsSelect1 = "#454D69"
                                        fsSelect2 = "#454D69"
                                        fsSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Small</Text>
                                </Pressable>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Font Color</Text>
                            <View style={styles.colorContainer}>
                                <View style={styles.colorField}>
                                    <Text style={{color: 'white'}}>{cpcolor}</Text>
                                </View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setOpenCP(true)
                                    }}
                                    style={[styles.openCP, {backgroundColor: cpcolor}]}    
                                >                                    
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Show Subheader?</Text>
                            <View 
                                style={{
                                    backgroundColor: '#3B3F4D', 
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 5
                                }}
                            >
                                <Checkbox
                                    status={showSub}
                                    color="#ff6905"
                                    uncheckedColor="#383F4D"
                                    onPress={() => {
                                        if (showSub == "checked")  {
                                            showSub = "unchecked";
                                        } else {
                                            showSub = "checked";
                                        }
                                        handleChangeHeader(currentIndex, 'showSubHeader', showSub) 
                                    }}
                                />
                            </View>
                        </ScrollView>
                        { openCP ? (
                            <View style={styles.colorPicker}>
                                <ColorPicker
                                    onColorSelected={(color) => {
                                        setColor(color)
                                        textColor = color;
                                        handleStyleHeader(currentIndex, "fontColor", color)
                                    }}
                                    style={{
                                        flex:1,
                                        backgroundColor:'white',
                                        width: 300,
                                        padding: 20,
                                    }}
                                />
                                <Ionicons 
                                    name="ios-close" 
                                    size={25} 
                                    onPress={() => {
                                        setOpenCP(false);
                                    }}
                                    color='#000' 
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        padding: 10
                                    }}
                                />
                            </View>
                        ) : null }
                    </View>
                </Modal>
            {/* PARAGRAPH SETTINGS */}
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={paragraphSettings}
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
                            <Text style={styles.topContentText}>Paragraph Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setParagraphSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <View style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Text Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleParagraph(currentIndex, "textAlign", "left")
                                        handleStyleParagraph(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleParagraph(currentIndex, "textAlign", "center")
                                        handleStyleParagraph(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleParagraph(currentIndex, "textAlign", "right")
                                        handleStyleParagraph(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Header Font Size</Text>       
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect1}]}
                                    onPress={() => {
                                        handleStyleParagraph(currentIndex, "fontSize", 17)
                                        handleStyleParagraph(currentIndex, "fontButtons", "#ff6905,#454C69,#454C69")
                                        fsSelect1 = "#ff6905"
                                        fsSelect2 = "#454D69"
                                        fsSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Default</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect2}]}
                                    onPress={() => {
                                        handleStyleParagraph(currentIndex, "fontSize", 20)
                                        handleStyleParagraph(currentIndex, "fontButtons", "#454C69,#ff6905,#454C69")
                                        fsSelect1 = "#454D69"
                                        fsSelect2 = "#ff6905"
                                        fsSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Large</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect3}]}
                                    onPress={() => {
                                        handleStyleParagraph(currentIndex, "fontSize", 14)
                                        handleStyleParagraph(currentIndex, "fontButtons", "#454C69,#454C69,#ff6905")
                                        fsSelect1 = "#454D69"
                                        fsSelect2 = "#454D69"
                                        fsSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Small</Text>
                                </Pressable>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Font Color</Text>
                            <View style={styles.colorContainer}>
                                <View style={styles.colorField}>
                                    <Text style={{color: 'white'}}>{cpcolor}</Text>
                                </View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setOpenCP(true)
                                    }}
                                    style={[styles.openCP, {backgroundColor: cpcolor}]}    
                                >                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                        { openCP ? (
                            <View style={styles.colorPicker}>
                                <ColorPicker
                                    onColorSelected={(color) => {
                                        setColor(color)
                                        textColor = color;
                                        handleStyleParagraph(currentIndex, "fontColor", color)
                                    }}
                                    style={{
                                        flex:1,
                                        backgroundColor:'white',
                                        width: 300,
                                        padding: 20,
                                    }}
                                />
                                <Ionicons 
                                    name="ios-close" 
                                    size={25} 
                                    onPress={() => {
                                        setOpenCP(false);
                                    }}
                                    color='#000' 
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        padding: 10
                                    }}
                                />
                            </View>
                        ) : null }
                    </View>
                </Modal>
            {/* IMAGE SETTINGS */}
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={imageSettings}
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
                            <Text style={styles.topContentText}>Image Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setImageSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Image Upload</Text>       
                            <TouchableOpacity
                                onPress={pickImage}
                                style={{
                                    backgroundColor: "#141824",
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    width: 140
                                }}
                            >
                                <Text 
                                    style={{
                                        color: 'white', 
                                        fontSize: 16,
                                        textAlign: 'center',
                                    }}
                                >Choose File</Text>
                            </TouchableOpacity>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Image Size</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <TextInput
                                            style={styles.numberInput}
                                            value={String(imageWidth)}
                                            keyboardType="number-pad"
                                            onChangeText={(text) => {
                                                imageWidth = text;
                                                handleStyleImage(currentIndex, "width", Number(text))
                                            }}
                                        />
                                        <Text style={styles.numberLabel}>PX</Text>
                                    </View>
                                    <Text style={styles.subLabel}>Width</Text>
                                </View>
                                <AntDesign
                                    name="close"
                                    size={17}
                                    color="#D0D8E5"
                                    style={{
                                        paddingHorizontal: 9,
                                        paddingTop: 9
                                    }}
                                />
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <TextInput
                                            style={styles.numberInput}
                                            value={String(imageHeight)}
                                            keyboardType="number-pad"
                                            onChangeText={(text) => {
                                                imageHeight = text;
                                                handleStyleImage(currentIndex, "height", Number(text))
                                            }}
                                        />
                                        <Text style={styles.numberLabel}>PX</Text>
                                    </View>
                                    <Text style={styles.subLabel}>Height</Text>
                                </View>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Image Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleImage(currentIndex, "imageAlign", "flex-start")
                                        handleStyleImage(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleImage(currentIndex, "imageAlign", "center")
                                        handleStyleImage(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleImage(currentIndex, "imageAlign", "flex-end")
                                        handleStyleImage(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>    
            {/* UL SETTINGS */}    
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={ULSettings}
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
                            <Text style={styles.topContentText}>Bulleted List Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setULSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <View style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>List Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleUL(currentIndex, "listAlign", "flex-start")
                                        handleStyleUL(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleUL(currentIndex, "listAlign", "center")
                                        handleStyleUL(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleUL(currentIndex, "listAlign", "flex-end")
                                        handleStyleUL(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Font Size</Text>       
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect1}]}
                                    onPress={() => {
                                        handleStyleUL(currentIndex, "fontSize", 17)
                                        handleStyleUL(currentIndex, "fontButtons", "#ff6905,#454C69,#454C69")
                                        fsSelect1 = "#ff6905"
                                        fsSelect2 = "#454D69"
                                        fsSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Default</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect2}]}
                                    onPress={() => {
                                        handleStyleUL(currentIndex, "fontSize", 20)
                                        handleStyleUL(currentIndex, "fontButtons", "#454C69,#ff6905,#454C69")
                                        fsSelect1 = "#454D69"
                                        fsSelect2 = "#ff6905"
                                        fsSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Large</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect3}]}
                                    onPress={() => {
                                        handleStyleUL(currentIndex, "fontSize", 14)
                                        handleStyleUL(currentIndex, "fontButtons", "#454C69,#454C69,#ff6905")
                                        fsSelect1 = "#454D69"
                                        fsSelect2 = "#454D69"
                                        fsSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Small</Text>
                                </Pressable>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Font Color</Text>
                            <View style={styles.colorContainer}>
                                <View style={styles.colorField}>
                                    <Text style={{color: 'white'}}>{cpcolor}</Text>
                                </View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setOpenCP(true)
                                    }}
                                    style={[styles.openCP, {backgroundColor: cpcolor}]}    
                                >                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                        { openCP ? (
                            <View style={styles.colorPicker}>
                                <ColorPicker
                                    onColorSelected={(color) => {
                                        setColor(color)
                                        textColor = color;
                                        handleStyleUL(currentIndex, "fontColor", color)
                                    }}
                                    style={{
                                        flex:1,
                                        backgroundColor:'white',
                                        width: 300,
                                        padding: 20,
                                    }}
                                />
                                <Ionicons 
                                    name="ios-close" 
                                    size={25} 
                                    onPress={() => {
                                        setOpenCP(false);
                                    }}
                                    color='#000' 
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        padding: 10
                                    }}
                                />
                            </View>
                        ) : null }
                    </View>
                </Modal>
            {/* OL SETTINGS */}
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={OLSettings}
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
                            <Text style={styles.topContentText}>Numbered List Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setOLSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <View style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>List Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleOL(currentIndex, "listAlign", "flex-start")
                                        handleStyleOL(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleOL(currentIndex, "listAlign", "center")
                                        handleStyleOL(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleOL(currentIndex, "listAlign", "flex-end")
                                        handleStyleOL(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Font Size</Text>       
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect1}]}
                                    onPress={() => {
                                        handleStyleOL(currentIndex, "fontSize", 17)
                                        handleStyleOL(currentIndex, "fontButtons", "#ff6905,#454C69,#454C69")
                                        fsSelect1 = "#ff6905"
                                        fsSelect2 = "#454D69"
                                        fsSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Default</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect2}]}
                                    onPress={() => {
                                        handleStyleOL(currentIndex, "fontSize", 20)
                                        handleStyleOL(currentIndex, "fontButtons", "#454C69,#ff6905,#454C69")
                                        fsSelect1 = "#454D69"
                                        fsSelect2 = "#ff6905"
                                        fsSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Large</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: fsSelect3}]}
                                    onPress={() => {
                                        handleStyleOL(currentIndex, "fontSize", 14)
                                        handleStyleOL(currentIndex, "fontButtons", "#454C69,#454C69,#ff6905")
                                        fsSelect1 = "#454D69"
                                        fsSelect2 = "#454D69"
                                        fsSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Small</Text>
                                </Pressable>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Font Color</Text>
                            <View style={styles.colorContainer}>
                                <View style={styles.colorField}>
                                    <Text style={{color: 'white'}}>{cpcolor}</Text>
                                </View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setOpenCP(true)
                                    }}
                                    style={[styles.openCP, {backgroundColor: cpcolor}]}    
                                >                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                        { openCP ? (
                            <View style={styles.colorPicker}>
                                <ColorPicker
                                    onColorSelected={(color) => {
                                        setColor(color)
                                        textColor = color;
                                        handleStyleOL(currentIndex, "fontColor", color)
                                    }}
                                    style={{
                                        flex:1,
                                        backgroundColor:'white',
                                        width: 300,
                                        padding: 20,
                                    }}
                                />
                                <Ionicons 
                                    name="ios-close" 
                                    size={25} 
                                    onPress={() => {
                                        setOpenCP(false);
                                    }}
                                    color='#000' 
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        padding: 10
                                    }}
                                />
                            </View>
                        ) : null }
                    </View>
                </Modal>
            {/* SPACER SETTINGS */}    
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={spacerSettings}
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
                            <Text style={styles.topContentText}>Spacer Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setSpacerSettings(false);
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
                                                handleStyleSpacer(currentIndex, "height", Number(text))
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
            {/* SEPARATOR SETTINGS */}    
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={separatorSettings}
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
                            <Text style={styles.topContentText}>Separator Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setSeparatorSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <View style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Text Align</Text>
                            <View style={styles.setTextAlign}>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <TextInput
                                            style={styles.numberInput}
                                            value={String(separatorHeight)}
                                            keyboardType="number-pad"
                                            onChangeText={(text) => {
                                                separatorHeight = text;
                                                handleStyleSeparator(currentIndex, "borderWidth", Number(text))
                                            }}
                                        />
                                        <Text style={styles.numberLabel}>PX</Text>
                                    </View>
                                    <Text style={styles.subLabel}>Height</Text>
                                </View>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Separator Color</Text>
                            <View style={styles.colorContainer}>
                                <View style={styles.colorField}>
                                    <Text style={{color: 'white'}}>{cpcolor}</Text>
                                </View>
                                <TouchableOpacity 
                                    onPress={() => {
                                        setOpenCP(true)
                                    }}
                                    style={[styles.openCP, {backgroundColor: cpcolor}]}    
                                >                                    
                                </TouchableOpacity>
                            </View>
                        </View>
                        { openCP ? (
                            <View style={styles.colorPicker}>
                                <ColorPicker
                                    onColorSelected={(color) => {
                                        setColor(color)
                                        separatorColor = color;
                                        handleStyleSeparator(currentIndex, "borderColor", color)
                                    }}
                                    style={{
                                        flex:1,
                                        backgroundColor:'white',
                                        width: 300,
                                        padding: 20,
                                    }}
                                />
                                <Ionicons 
                                    name="ios-close" 
                                    size={25} 
                                    onPress={() => {
                                        setOpenCP(false);
                                    }}
                                    color='#000' 
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        padding: 10
                                    }}
                                />
                            </View>
                        ) : null }
                    </View>
                </Modal>
            {/* NAME SETTINGS */}  
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={nameSettings}
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
                            <Text style={styles.topContentText}>Name Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setNameSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Label Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleName(currentIndex, "textAlign", "left")
                                        handleStyleName(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleName(currentIndex, "textAlign", "center")
                                        handleStyleName(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleName(currentIndex, "textAlign", "right")
                                        handleStyleName(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            {/* EMAIL SETTINGS */}  
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={emailSettings}
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
                            <Text style={styles.topContentText}>Email Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setEmailSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Label Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleEmail(currentIndex, "textAlign", "left")
                                        handleStyleEmail(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleEmail(currentIndex, "textAlign", "center")
                                        handleStyleEmail(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleEmail(currentIndex, "textAlign", "right")
                                        handleStyleEmail(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>                        
            {/* PHONE SETTINGS */}  
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={phoneSettings}
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
                            <Text style={styles.topContentText}>Phone Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setPhoneSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Label Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStylePhone(currentIndex, "textAlign", "left")
                                        handleStylePhone(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStylePhone(currentIndex, "textAlign", "center")
                                        handleStylePhone(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStylePhone(currentIndex, "textAlign", "right")
                                        handleStylePhone(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>                        
            {/* ADDRESS SETTINGS */}  
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={addressSettings}
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
                            <Text style={styles.topContentText}>Address Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setAddressSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Label Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleAddress(currentIndex, "textAlign", "left")
                                        handleStyleAddress(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleAddress(currentIndex, "textAlign", "center")
                                        handleStyleAddress(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleAddress(currentIndex, "textAlign", "right")
                                        handleStyleAddress(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            {/* NUMBER SETTINGS */}  
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={numberSettings}
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
                            <Text style={styles.topContentText}>Price Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setNumberSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Label Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleNumber(currentIndex, "textAlign", "left")
                                        handleStyleNumber(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleNumber(currentIndex, "textAlign", "center")
                                        handleStyleNumber(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleNumber(currentIndex, "textAlign", "right")
                                        handleStyleNumber(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            {/* DATE SETTINGS */}  
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={dateSettings}
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
                            <Text style={styles.topContentText}>Date Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setDateSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Label Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleDate(currentIndex, "textAlign", "left")
                                        handleStyleDate(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleDate(currentIndex, "textAlign", "center")
                                        handleStyleDate(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleDate(currentIndex, "textAlign", "right")
                                        handleStyleDate(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            {/* SIGNATURE SETTINGS */}  
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={signatureSettings}
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
                            <Text style={styles.topContentText}>Signature Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setSignatureSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Label Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        handleStyleSignature(currentIndex, "textAlign", "left")
                                        handleStyleSignature(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        handleStyleSignature(currentIndex, "textAlign", "center")
                                        handleStyleSignature(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        handleStyleSignature(currentIndex, "textAlign", "right")
                                        handleStyleSignature(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            {/* IMAGE SETTINGS MODAL */}
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={houseimageSettings}
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
                            <Text style={styles.topContentText}>House Image Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setHouseImageSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>House Image Upload</Text>       
                            <TouchableOpacity
                                onPress={pickImage}
                                style={{
                                    backgroundColor: "#141824",
                                    paddingVertical: 10,
                                    paddingHorizontal: 20,
                                    width: 140
                                }}
                            >
                                <Text 
                                    style={{
                                        color: 'white', 
                                        fontSize: 16,
                                        textAlign: 'center',
                                    }}
                                >Choose File</Text>
                            </TouchableOpacity>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>House Image Size</Text>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <TextInput
                                            style={styles.numberInput}
                                            value={String(imageWidth)}
                                            keyboardType="number-pad"
                                            onChangeText={(text) => {
                                                imageWidth = text;
                                                styleHouseImage(currentIndex, "width", Number(text))
                                            }}
                                        />
                                        <Text style={styles.numberLabel}>PX</Text>
                                    </View>
                                    <Text style={styles.subLabel}>Width</Text>
                                </View>
                                <AntDesign
                                    name="close"
                                    size={17}
                                    color="#D0D8E5"
                                    style={{
                                        paddingHorizontal: 9,
                                        paddingTop: 9
                                    }}
                                />
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <TextInput
                                            style={styles.numberInput}
                                            value={String(imageHeight)}
                                            keyboardType="number-pad"
                                            onChangeText={(text) => {
                                                imageHeight = text;
                                                styleHouseImage(currentIndex, "height", Number(text))
                                            }}
                                        />
                                        <Text style={styles.numberLabel}>PX</Text>
                                    </View>
                                    <Text style={styles.subLabel}>Height</Text>
                                </View>
                            </View>
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>House Image Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        styleHouseImage(currentIndex, "imageAlign", "flex-start")
                                        styleHouseImage(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
                                        abSelect1 = "#ff6905"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Left</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect2}]}
                                    onPress={() => {
                                        styleHouseImage(currentIndex, "imageAlign", "center")
                                        styleHouseImage(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#ff6905"
                                        abSelect3 = "#454D69"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Center</Text>
                                </Pressable>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect3}]}
                                    onPress={() => {
                                        styleHouseImage(currentIndex, "imageAlign", "flex-end")
                                        styleHouseImage(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
                                        abSelect1 = "#454D69"
                                        abSelect2 = "#454D69"
                                        abSelect3 = "#ff6905"
                                    }}    
                                >
                                    <Text style={styles.setAlignText}>Right</Text>
                                </Pressable>
                            </View>
                        </ScrollView>
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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);
                                                
                                                // Font Buttons
                                                fsSelect1 = field_list[index].style[1].style.slice(0,7);
                                                fsSelect2 = field_list[index].style[1].style.slice(8,15);
                                                fsSelect3 = field_list[index].style[1].style.slice(16,23);

                                                setColor(field_list[index].style[4].style)

                                                setSelectElement(item.id);
                                            }}
                                        >
                                        {/* HEADER TEXT */}
                                            <TextInput 
                                                style={{
                                                    textAlign: item.style[2].style,
                                                    fontSize: item.style[3].style,
                                                    color: textColor,
                                                    fontFamily: globalStyle[0].style 
                                                }}
                                                defaultValue="Header"
                                                value={item.header}
                                                multiline={true}
                                                onChangeText={(text) => {
                                                    handleChangeHeader(index, "header", text)
                                                }}
                                            />
                                        {/* SUB-HEADER TEXT */}
                                            { item.showSubHeader == "checked" ? (
                                                <TextInput 
                                                    style={[
                                                        styles.subheader, 
                                                        {
                                                            textAlign: item.style[2].style,
                                                            fontFamily: globalStyle[0].style
                                                        }
                                                    ]}
                                                    defaultValue="Header"
                                                    value={item.subheader}
                                                    multiline={true}
                                                    onChangeText={(text) => {
                                                        handleChangeHeader(index, "subheader", text)
                                                    }}
                                                />
                                            ) : null }
                                            { !selected ? (
                                                <View style={{
                                                    backgroundColor: 'rgba(0,0,0,0)',
                                                    height: '110%', 
                                                    width: '110%', 
                                                    position: 'absolute', 
                                                    padding: 50
                                                }}></View>
                                            ) : 
                                        // ELEMENT BUTTONS //
                                                <View style={styles.elementButtons}>
                                            {/* CHECK BUTTON */}
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
                                            {/* UP BUTTON */}
                                                { index !== 0 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                            {/* DOWN BUTTON */}   
                                                { index !== field_list.length-1 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                            {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setHeaderSettings(true)
                                                            showSub = field_list[currentIndex].showSubHeader;
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                            {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'paragraph':
                                
                                // Font Color
                                textColor = field_list[index].style[4].style;

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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);
                                                
                                                // Font Buttons
                                                fsSelect1 = field_list[index].style[1].style.slice(0,7);
                                                fsSelect2 = field_list[index].style[1].style.slice(8,15);
                                                fsSelect3 = field_list[index].style[1].style.slice(16,23);

                                                setColor(field_list[index].style[4].style)

                                                setSelectElement(item.id);
                                            }}
                                        >
                                            <TextInput 
                                                style={{
                                                    textAlign: item.style[2].style,
                                                    fontSize: item.style[3].style,
                                                    color: textColor,
                                                    fontFamily: globalStyle[0].style
                                                }}
                                                defaultValue="Paragraph"
                                                value={item.paragraph}
                                                multiline={true}
                                                onChangeText={(text) => {
                                                    handleChangeParagraph(index, text)
                                                }}
                                            />
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
                                                {/* CHECK BUTTON */}
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
                                                {/* UP BUTTON */}
                                                    { index !== 0 ? (
                                                        <Pressable 
                                                            onPress={() => {
                                                                handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                                {/* DOWN BUTTON */}
                                                    { index !== field_list.length-1 ? (
                                                        <Pressable 
                                                            onPress={() => {
                                                                handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                                {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setParagraphSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                                {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'image':
                                
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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);

                                                

                                                (async () => {
                                                    if (Platform.OS !== 'web') {
                                                        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                                                        if (status !== 'granted') {
                                                            alert('Sorry, we need camera roll permissions to make this work!');
                                                        }
                                                    }
                                                })();

                                                setSelectElement(item.id);
                                            }}
                                        >
                                            { item.uri == "" ? (
                                                <View
                                                    fadeDuration={0}
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: item.style[1].style
                                                    }}
                                                >
                                                    <FontAwesome
                                                        name="image"
                                                        size={100}
                                                        color="rgba(208,219,229,.75)"
                                                    />
                                                </View>
                                            ) : null }
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
                                                {/* CHECK BUTTON */}    
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
                                                {/* UP BUTTON */}
                                                    { index !== 0 ? (
                                                        <Pressable 
                                                            onPress={() => {
                                                                handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                                {/* DOWN BUTTON */}
                                                    { index !== field_list.length-1 ? (
                                                        <Pressable 
                                                            onPress={() => {
                                                                handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                                {/* SETTINGS BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            setImageSettings(true)
                                                            imageWidth = field_list[index].style[2].style
                                                            imageHeight = field_list[index].style[3].style
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                                {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'ul':
                            
                                // Font Color
                                textColor = field_list[index].style[4].style;

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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);
                                                
                                                // Font Buttons
                                                fsSelect1 = field_list[index].style[1].style.slice(0,7);
                                                fsSelect2 = field_list[index].style[1].style.slice(8,15);
                                                fsSelect3 = field_list[index].style[1].style.slice(16,23);

                                                setColor(field_list[index].style[4].style)

                                                setSelectElement(item.id);
                                            }}
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
                                                                paddingRight: selected ? 45 : 10
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
                                                            <TextInput 
                                                                style={{
                                                                    fontSize: item.style[3].style,
                                                                    color: textColor,
                                                                    fontFamily: globalStyle[0].style
                                                                }}
                                                                placeholder="List Item"
                                                                value={ulitem.value}
                                                                multiline={true}
                                                                onChangeText={(text) => {
                                                                    handleChangeULItem(index, ulindex, text)
                                                                }}
                                                            />
                                                            { selected ? (
                                                                <Pressable 
                                                                    style={[styles.elementButton, {
                                                                        position: 'absolute',
                                                                        right: -7,
                                                                        top: 5,
                                                                        width: 22,
                                                                        height: 22,
                                                                        backgroundColor: '#E82323',
                                                                    }]}
                                                                >
                                                                    <Ionicons 
                                                                        name="ios-close" 
                                                                        size={16} 
                                                                        onPress={() => {
                                                                            handleDeleteListItem(index, ulindex)
                                                                        }}
                                                                        color='#ffffff' 
                                                                    />
                                                                </Pressable>
                                                            ) : null }
                                                        </View>
                                                    )
                                                }}
                                            />
                                            { selected ? (
                                                <View style={{alignItems: 'center'}}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            handleAddULItem(index)
                                                        }}
                                                        style={{
                                                            flexDirection: 'row',
                                                            width: 40,
                                                            height: 40,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: 10,
                                                            backgroundColor: '#fff',
                                                            borderRadius: 70,
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 3
                                                            },
                                                            shadowColor: '#000',
                                                            elevation: 10,
                                                            shadowRadius: 8,
                                                            shadowOpacity: .2,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        <AntDesign 
                                                            style={styles.floatIcon} 
                                                            name="plus" 
                                                            size={20} 
                                                            color="#282C3A" 
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : null }

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
                                                                handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                                                handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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

                                                {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setULSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                                {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'ol':
                        
                                // Font Color
                                textColor = field_list[index].style[4].style;

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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);
                                                
                                                // Font Buttons
                                                fsSelect1 = field_list[index].style[1].style.slice(0,7);
                                                fsSelect2 = field_list[index].style[1].style.slice(8,15);
                                                fsSelect3 = field_list[index].style[1].style.slice(16,23);

                                                setColor(field_list[index].style[4].style)

                                                setSelectElement(item.id);
                                            }}
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
                                                            <TextInput 
                                                                style={{
                                                                    fontSize: item.style[3].style,
                                                                    color: textColor,
                                                                    fontFamily: globalStyle[0].style
                                                                }}
                                                                placeholder="List Item"
                                                                value={ulitem.value}
                                                                multiline={true}
                                                                onChangeText={(text) => {
                                                                    handleChangeOLItem(index, ulindex, text)
                                                                }}
                                                            />
                                                            { selected ? (
                                                                <Pressable 
                                                                    style={[styles.elementButton, {
                                                                        position: 'absolute',
                                                                        right: -7,
                                                                        top: 5,
                                                                        width: 22,
                                                                        height: 22,
                                                                        backgroundColor: '#E82323',
                                                                    }]}
                                                                >
                                                                    <Ionicons 
                                                                        name="ios-close" 
                                                                        size={16} 
                                                                        onPress={() => {
                                                                            handleDeleteListItem(index, ulindex)
                                                                        }}
                                                                        color='#ffffff' 
                                                                    />
                                                                </Pressable>
                                                            ) : null }
                                                        </View>
                                                    )
                                                }}
                                            />
                                            { selected ? (
                                                <View style={{alignItems: 'center'}}>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            handleAddOLItem(index)
                                                        }}
                                                        style={{
                                                            flexDirection: 'row',
                                                            width: 40,
                                                            height: 40,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: 10,
                                                            backgroundColor: '#fff',
                                                            borderRadius: 70,
                                                            shadowOffset: {
                                                                width: 0,
                                                                height: 3
                                                            },
                                                            shadowColor: '#000',
                                                            elevation: 10,
                                                            shadowRadius: 8,
                                                            shadowOpacity: .2,
                                                            marginTop: 10
                                                        }}
                                                    >
                                                        <AntDesign 
                                                            style={styles.floatIcon} 
                                                            name="plus" 
                                                            size={20} 
                                                            color="#282C3A" 
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : null }

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
                                                {/* UP BUTTON */}
                                                    { index !== 0 ? (
                                                        <Pressable 
                                                            onPress={() => {
                                                                handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                                {/* DOWN BUTTON */}
                                                    { index !== field_list.length-1 ? (
                                                        <Pressable 
                                                            onPress={() => {
                                                                handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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

                                                {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setOLSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>

                                                {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'spacer':
                    
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
                                            <View style={{height: item.style[0].style}}></View>
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
                                                                handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                                                handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                                            setSpacerSettings(true)
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
                                                            handleDeleteField(item.id)
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
                            case 'separator':
                                
                                // Font Color
                                separatorColor = field_list[index].style[1].style; 

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
                                                setColor(field_list[index].style[1].style)
                                            }}
                                        >
                                            <View 
                                                style={{
                                                    borderBottomWidth: item.style[0].style,
                                                    borderBottomColor: separatorColor
                                                }}></View>
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
                                                                handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                                                handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                                            setSeparatorSettings(true)
                                                            separatorHeight = field_list[index].style[0].style
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
                                                            handleDeleteField(item.id)
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
                                        <View 
                                            style={{
                                                flexDirection: 'row', 
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <View style={styles.dottedLine}></View>
                                            <Text
                                                style={{
                                                    color: "#999999",
                                                    fontSize: 12,
                                                    paddingHorizontal: 12,
                                                    textAlign: 'center',
                                                }}
                                            >PAGE BREAK</Text>
                                            <View style={styles.dottedLine}></View>
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
                                                    style={{
                                                        backgroundColor: '#ff6905',
                                                        height: 25,
                                                        width: 25,
                                                        position: 'absolute',
                                                        left: -30,
                                                        top: '-60%',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderRadius: 70,
                                                    }}
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
                                                            handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                                            handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                                        handleDeleteField(item.id)
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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);

                                                setSelectElement(item.id);
                                            }}
                                        >
                                        {/* NAME TEXT */}
                                            <View style={styles.inputContainer}>
                                                <Text style={[styles.inputLabel, 
                                                    {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Name</Text>
                                                <View style={styles.input}>
                                                    <Text style={{color: '#aaa'}}>First Name</Text>
                                                </View>
                                                <View style={styles.input}>
                                                    <Text style={{color: '#aaa'}}>Last Name</Text>
                                                </View>
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
                                        // ELEMENT BUTTONS //
                                                <View style={styles.elementButtons}>
                                            {/* CHECK BUTTON */}
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
                                            {/* UP BUTTON */}
                                                { index !== 0 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                            {/* DOWN BUTTON */}   
                                                { index !== field_list.length-1 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                            {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setNameSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                            {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'email':
                                
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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);

                                                setSelectElement(item.id);
                                            }}
                                        >
                                        {/* EMAIL TEXT */}
                                            <View style={styles.inputContainer}>
                                            <Text style={[styles.inputLabel, 
                                                {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Email</Text>
                                                <View style={styles.input}>
                                                    <Text style={{color: '#aaa'}}>ex: johndoe@email.com</Text>
                                                </View>
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
                                        // ELEMENT BUTTONS //
                                                <View style={styles.elementButtons}>
                                            {/* CHECK BUTTON */}
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
                                            {/* UP BUTTON */}
                                                { index !== 0 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                            {/* DOWN BUTTON */}   
                                                { index !== field_list.length-1 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                            {/* SETTINGS BUTTON */}    
                                                <Pressable 
                                                        onPress={() => {
                                                            setEmailSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                            {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'phone':
                                
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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);
                                                
                                                setSelectElement(item.id);
                                            }}
                                        >
                                        {/* PHONE TEXT */}
                                            <View style={styles.inputContainer}>
                                                <Text style={[styles.inputLabel, 
                                                    {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Phone Number</Text>
                                                <View style={[styles.input, {width: '50%'}]}>
                                                    <Text style={{color: '#aaa'}}>(000) 000-0000</Text>
                                                </View>
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
                                        // ELEMENT BUTTONS //
                                                <View style={styles.elementButtons}>
                                            {/* CHECK BUTTON */}
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
                                            {/* UP BUTTON */}
                                                { index !== 0 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                            {/* DOWN BUTTON */}   
                                                { index !== field_list.length-1 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                            {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setPhoneSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                            {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'address':

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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);
                                                
                                                setSelectElement(item.id);
                                            }}
                                        >
                                        {/* ADDRESS TEXT */}
                                            <View style={styles.inputContainer}>
                                                <Text style={[styles.inputLabel, 
                                                    {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Address</Text>
                                                <View style={styles.input}>
                                                    <Text style={{color: '#aaa'}}>Street Address</Text>
                                                </View>
                                                <View style={styles.input}>
                                                    <Text style={{color: '#aaa'}}>City</Text>
                                                </View>
                                                <View style={styles.input}>
                                                    <Text style={{color: '#aaa'}}>State</Text>
                                                </View>
                                                { /*<View style={styles.input}>
                                                    <Text style={{color: '#aaa'}}>Zip Code</Text>
                                                </View> */}
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
                                        // ELEMENT BUTTONS //
                                                <View style={styles.elementButtons}>
                                            {/* CHECK BUTTON */}
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
                                            {/* UP BUTTON */}
                                                { index !== 0 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                            {/* DOWN BUTTON */}   
                                                { index !== field_list.length-1 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                            {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setAddressSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                            {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'price':

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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);
                                                
                                                setSelectElement(item.id);
                                            }}
                                        >
                                            <View style={styles.inputContainer}>
                                                <Text style={[styles.inputLabel, 
                                                    {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Price</Text>
                                                <View style={[styles.input, {width: '50%'}]}>
                                                    <Text style={{color: '#aaa'}}>$250</Text>
                                                </View>
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
                                        // ELEMENT BUTTONS //
                                                <View style={styles.elementButtons}>
                                            {/* CHECK BUTTON */}
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
                                            {/* UP BUTTON */}
                                                { index !== 0 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                            {/* DOWN BUTTON */}   
                                                { index !== field_list.length-1 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                            {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setPhoneSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                            {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'date':
                                
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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);
                                                
                                                setSelectElement(item.id);
                                            }}
                                        >
                                        {/* DATE TEXT */}
                                            <View style={styles.inputContainer}>
                                                <Text style={[styles.inputLabel, 
                                                    {textAlign: item.style[2].style, fontFamily: globalStyle[0].style}]}>Date</Text>
                                                <View style={[styles.input, {
                                                        flexDirection: 'row', width: '50%',justifyContent: 'space-between'}]}>
                                                    <Text style={{color: '#aaa'}}>MM-DD-YYYY</Text>
                                                    <MaterialCommunityIcons name="calendar-month-outline" size={20} color='#aaa' />
                                                </View>
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
                                        // ELEMENT BUTTONS //
                                                <View style={styles.elementButtons}>
                                            {/* CHECK BUTTON */}
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
                                            {/* UP BUTTON */}
                                                { index !== 0 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                            {/* DOWN BUTTON */}   
                                                { index !== field_list.length-1 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                            {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setDateSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                            {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'signature':
                                
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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);
                                                
                                                setSelectElement(item.id);
                                            }}
                                        >
                                        {/* DATE TEXT */}
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

                                            { !selected ? (
                                                <View style={{
                                                    backgroundColor: 'rgba(0,0,0,0)',
                                                    height: '110%', 
                                                    width: '110%', 
                                                    position: 'absolute', 
                                                    padding: 50
                                                }}></View>
                                            ) : 
                                        // ELEMENT BUTTONS //
                                                <View style={styles.elementButtons}>
                                            {/* CHECK BUTTON */}
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
                                            {/* UP BUTTON */}
                                                { index !== 0 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                            {/* DOWN BUTTON */}   
                                                { index !== field_list.length-1 ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                            {/* SETTINGS BUTTON */}    
                                                    <Pressable 
                                                        onPress={() => {
                                                            setSignatureSettings(true)
                                                        }}
                                                        style={styles.elementButton}
                                                    >
                                                        <Feather
                                                            name="settings"
                                                            size={20}
                                                            color="white"
                                                        />
                                                    </Pressable>
                                            {/* DELETE BUTTON */}
                                                    <Pressable 
                                                        onPress={() => {
                                                            handleDeleteField(item.id)
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
                            case 'houseimage':
                        
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
                                                // Align Buttons
                                                abSelect1 = field_list[index].style[0].style.slice(0,7);
                                                abSelect2 = field_list[index].style[0].style.slice(8,15);
                                                abSelect3 = field_list[index].style[0].style.slice(16,23);

                                                setSelectElement(item.id);
                                            }}
                                        >
                                            { item.uri == "" ? (
                                                <View
                                                    fadeDuration={0}
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: item.style[1].style
                                                    }}
                                                >
                                                    <FontAwesome
                                                        name="image"
                                                        size={100}
                                                        color="rgba(208,219,229,.75)"
                                                    />
                                                </View>
                                            ) : null }
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
                                                                handleSwapFields(index, index-1, field_list[index], field_list[index-1])
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
                                                                handleSwapFields(index, index+1, field_list[index], field_list[index+1])
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
                                                            setHouseImageSettings(true)
                                                            imageWidth = field_list[index].style[2].style
                                                            imageHeight = field_list[index].style[3].style
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
                                                            handleDeleteField(item.id)
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
        {/* FLOAT ICONS (BUTTONS) */}
            <TouchableOpacity 
                onPress={() => {
                    setComponents(true);
                }}
                style={styles.float}
            >
                <AntDesign style={styles.floatIcon} name="plus" size={23} color="white" />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => {
                    setDesign(true);
                }}
                style={styles.designFloat}
            >
                <FontAwesome5 
                    style={
                        [styles.floatIcon, {transform: [{ rotateZ: '-30deg' }]}]
                    } 
                    name="paint-roller" 
                    size={20} 
                    color="white" />
            </TouchableOpacity>
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
        paddingHorizontal: 23
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
        left: 15,
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
        shadowRadius: 6,
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
        shadowRadius: 6,
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
        color: "#dddddd",
        marginTop: 10
    },
    inputLabel: {
        fontSize: 22,
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
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        field_list: state.contract.field_list,
        globalStyle: state.contract.globalStyle,
        contract: state.contract,
        contractList: state.contractList,
        user: state.user.user
    }
}

const mapDispatchToProps = { 
    addHeaderC, 
    deleteFieldC,
    styleHeaderC,
    styleGlobalC,
    addParagraphC, 
    changeParagraphC,
    styleParagraphC, 
    addImageC, 
    styleImageC,
    changeImageC,
    changeHeaderC,
    swapFieldsC,
    addULC,
    addULItemC,
    changeULItemC,
    styleULC,
    deleteListItemC,
    addOLC,
    addOLItemC,
    changeOLItemC,
    styleOLC,
    addSpacerC,
    styleSpacerC,
    addSeparatorC,
    styleSeparatorC,
    addPageBreakC,
    addNameC,
    styleNameC,
    addEmailC,
    styleEmailC,
    addPhoneC,
    stylePhoneC,
    addAddressC,
    styleAddressC,
    addPriceC,
    changeNumberC,
    styleNumberC,
    addDateC,
    styleDateC,
    addSignatureC,
    styleSignatureC,
    addHouseImage,
    styleHouseImage,
    changeContractId,
    updateContract,
    changeTitle,
    resetContract,
    getUserContracts
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractEditorScreen);