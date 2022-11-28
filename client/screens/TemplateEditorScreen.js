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
import { connect, useDispatch } from 'react-redux';
import { 
    addHeader, 
    deleteField, 
    styleHeader, 
    styleGlobal, 
    addParagraph,
    changeParagraph,
    styleParagraph,
    addImage,
    styleImage,
    changeImage,
    changeHeader,
    swapFields,
    addUL,
    addULItem,
    changeULItem,
    styleUL,
    deleteListItem,
    addOL,
    addOLItem,
    changeOLItem,
    styleOL,
    addSpacer,
    styleSpacer,
    addSeparator,
    styleSeparator,
    addHeaderInput,
    addParagraphInput,
    addImageInput,
    addULInput,
    addOLInput,
    updateTemplate,
    resetTemplate,
    changeTitle,
    addDetailSection,
    changeSectionTitle,
    addDropdown,
    addText,
    addCheckboxes,
    changeLabel,
    addOption,
    deleteOption,
    deleteType,
    deleteSection,
    fetchTemplates,
    changeTemplateId,
    addCheckboxOption,
    addDetails,
    getUserTemplates,
    addSection,
    updateSection,
    swapDetails,
    swapSubSec,
    swapSmallDetails,
    changeTempText
} from '../redux/actions/templateAction';
import { Checkbox } from 'react-native-paper';
import DetailsList from '../components/DetailsList';
import { updateUser } from '../redux/actions/authAction';

const windowHeight = Dimensions.get('window').height;   // Dimensions
var heightThreshold = 800;                              // Determines when the styling changes based on screen height
var abSelect1, abSelect2, abSelect3;                    // Align Button Styles
var fsSelect1, fsSelect2, fsSelect3;                    // Font Size Styles
var textColor;                                          // Font Color
var currentIndex, currentId;                            // Field Id
var heightThreshold = 800;                              // For screen size changes
var imageWidth, imageHeight;                            // Image Field Variables
var showSub, showSubInput;                              // Show subheader(s)
var spacerHeight;                                       // Spacer size
var separatorHeight, separatorColor;                    // Separator size
var dOption, cOption;                                   // Dropdown and checkbox options
var autoFillList;                                       // Auto fill list inputs
var showSec, secTitle, secIndex;

const TemplateEditorScreen = ({user, templateList, template, globalStyle, field_list, details, addHeader, deleteField, styleHeader, styleGlobal, addParagraph, styleParagraph, addImage, styleImage, changeImage, changeHeader, changeParagraph, swapFields, addUL, addULItem, changeULItem, styleUL, deleteListItem, addOL, addOLItem, changeOLItem, styleOL, addSpacer, styleSpacer, addSeparator, styleSeparator, addHeaderInput, addParagraphInput, addImageInput, addULInput, addOLInput, updateTemplate, resetTemplate, changeTitle, addDetailSection, changeSectionTitle, addDropdown, addText, addCheckboxes, changeLabel, addOption, deleteOption, deleteType, deleteSection, fetchTemplates, changeTemplateId, addCheckboxOption, addDetails,updateUser, getUserTemplates, addSection, updateSection, swapDetails, swapSubSec, swapSmallDetails, changeTempText}) => {

    // Navigation //
    const navigation = useNavigation();

    // Redux Dispatch
    const dispatch = useDispatch();

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
    const [detailsSide, setDetailsSide] = useState(false);                      // Open Details Modal
    const [selectSection, setSelectSection] = useState(null);           // Selected Details Section
    const [headerInputSettings, setHeaderInputSettings] = useState(false); // Open Header Input settings sidebar
    const [paragraphInputSettings, setParagraphInputSettings] = useState(false); // Open Paragraph Input settings sidebar
    const [detailsSettings, setDetailsSideSettings] = useState(false);      // Open details section settings modal
    const [secExists, setSecExists] = useState(false);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    useEffect(() => {
        requestPermission()
    }, []);

    // Action Variables
    var field, element, style, uri, header, subheader, paragraph, showSubHeader, list;

    // Details variables
    var detail;

    // Global States
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
        addHeader(field, header, subheader, showSubHeader, style)
    }
    const handleChangeHeader = (index, type, value) => {
        changeHeader(index, type, value)
    }
    const handleStyleHeader = (id, styleType, style) => {
        styleHeader(id, styleType, style)
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
        addParagraph(field, paragraph, style)
    }
    const handleChangeParagraph = (index, value) => {
        changeParagraph(index, value)
    }
    const handleStyleParagraph = (id, styleType, style) => {
        styleParagraph(id, styleType, style)
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
        addImage(field, uri, style)
    }
    const handleChangeImage = (index, uri) => {
        changeImage(index, uri)
    }
    const handleStyleImage = (id, styleType, style) => {
        styleImage(id, styleType, style)
    }
    const handleDeleteField = (id) => {        
        deleteField(id)       
    }
    const handleStyleGlobal = (styleType, style) => {
        styleGlobal(styleType, style)
    }
    const handleSwapFields = (index1, index2, field1, field2) => {
        swapFields(index1, index2, field1, field2)
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
        addUL(field, list, style)
    }
    const handleAddULItem = (index) => {
        var ulvalue = ""
        addULItem(index, ulvalue)
    }
    const handleChangeULItem = (index, index2, value) => {
        changeULItem(index, index2, value)
    }
    const handleStyleUL = (index, styleType, style) => {
        styleUL(index, styleType, style)
    }
    const handleDeleteListItem = (index1, index2) => {
        deleteListItem(index1, index2)
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
        addOL(field, list, style)
    }
    const handleAddOLItem = (index) => {
        var ulvalue = ""
        addOLItem(index, ulvalue)
    }
    const handleChangeOLItem = (index, index2, value) => {
        changeOLItem(index, index2, value)
    }
    const handleStyleOL = (index, styleType, style) => {
        styleOL(index, styleType, style)
    }
    const handleAddSpacer = () => {
        field = "spacer";
        style = [
            {
                styleType: "height",
                style: 20
            }
        ]
        addSpacer(field, style)
    }
    const handleStyleSpacer = (index, styleType, style) => {
        styleSpacer(index, styleType, style)
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
        addSeparator(field, style)
    }
    const handleStyleSeparator = (index, styleType, style) => {
        styleSeparator(index, styleType, style)
    }
    const handleAddHeaderInput = () => {
        field = "headerinput";
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
        addHeaderInput(field, header, subheader, showSubHeader, style)
    }
    const handleChangeHeaderInput = (index, type, value) => {
        changeHeader(index, type, value)
    }
    const handleAddParagraphInput = () => {
        field = "paragraphinput";
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
        addParagraphInput(field, paragraph, style)
    }
    const handleAddImageInput = () => {
        field = "imageinput";
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
        addImageInput(field, uri, style)
    }
    const handleAddULInput = () => {
        field = "ulinput";
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
        addULInput(field, list, style)
    }
    const handleAddOLInput = () => {
        field = "olinput";
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
        addOLInput(field, list, style)
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
        //BASIC TAB
        case 1: 
            underline1 = '#ff6905'
            underline2 = '#141824'
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
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={() => {
                            addDetails('detailsection')
                        }}    
                    >
                        <View style={styles.fieldIcon}>
                            <MaterialCommunityIcons name="card-text-outline" size={28} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Details Section</Text>
                        </View>
                    </TouchableOpacity>          
                </View>
            break;
        //FORM TAB
        case 2: 
            underline1 = '#141824'
            underline2 = '#ff6905'
            underline3 = '#141824'
            fields = 
                <View style={styles.fields}>
                    <TouchableOpacity 
                        style={styles.field}
                        onPress={handleAddHeaderInput}    
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome name="header" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Header Input</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}   
                        onPress={handleAddParagraphInput}
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="paragraph" size={25} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Paragraph Input</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}   
                        onPress={handleAddImageInput}
                    >
                        <View style={styles.fieldIcon}>
                            <Feather name="image" size={28} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Image Upload</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field}   
                        onPress={handleAddULInput} 
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="list-ul" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Bulleted List Input</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.field} 
                        onPress={handleAddOLInput}
                    >
                        <View style={styles.fieldIcon}>
                            <FontAwesome5 name="list-ol" size={22} color="white" />
                        </View>
                        <View style={styles.fieldContent}>
                            <Text style={styles.fieldText}>Numbered List Input</Text>
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
            onTouchStart={() => {
                changeTemplateId(templateList.currentId)
                updateTemplate(template.id, user.id, template)
                updateUser(user.id, user)
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
                    <TextInput 
                        style={{
                            color: 'white', 
                            fontSize: 18,
                            textAlign: 'center',
                            marginLeft: 7,
                            width: '55%',
                        }}
                        defaultValue="Template"
                        value={template.title}
                        onChangeText={(text) => {
                            changeTitle(text)
                        }}
                    />
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
            {/* ACTIONS DRAWER MENU MODAL */}
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
                                    navigation.goBack()
                                    resetTemplate()
                                    getUserTemplates(user.templates)
                                }}   
                            >
                                <AntDesign name="arrowleft" size={21} color="white" />
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.sideButton}
                                onPress={() => {
                                    setDetailsSide(true)
                                }}   
                            >
                                <Feather name="edit-3" size={21} color="white" />
                                <Text style={styles.buttonText}>Details</Text>
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
            {/* LEFT DESIGN DRAWER MODAL */}
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
                            <Text style={styles.topContentText}>Template Elements</Text>
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
                                <Text style={styles.topButtonText}>Basic</Text>
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
                                <Text style={styles.topButtonText}>Form</Text>
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
            {/* RIGHT DESIGN DRAWER MODAL */}
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
                            <Text style={styles.topContentText}>Template Design</Text>
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
            {/* BACKGROUND COLOR PICKER MODAL */}
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
            {/* HEADER SETTINGS MODAL */}  
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
                        <ScrollView 
                            style={[styles.settingsContent, {flex: 1}]}
                            contentContainerStyle={{paddingBottom: 70}}
                        >
                            <Text style={styles.settingsLabel}>Make Section?</Text>
                            <View 
                                style={{
                                    backgroundColor: '#3B3F4D', 
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    marginBottom: 20
                                }}
                            >
                                <Checkbox
                                    status={showSec}
                                    color="#ff6905"
                                    uncheckedColor="#383F4D"
                                    onPress={() => {
                                        if (showSec == "checked")  {
                                            showSec = "unchecked"
                                        } else {
                                            showSec = "checked"
                                        }
                                        handleChangeHeader(currentIndex, 'showSec', showSec)
                                    }}
                                />
                            </View>
                            {showSec == "checked" ? (
                                <View style={{marginBottom: 40}}>
                                    <Text style={styles.settingsLabel}>Section Title</Text>
                                    <TextInput
                                        style={{
                                            backgroundColor: '#3B3F4D',
                                            width: 250,
                                            borderRadius: 5,
                                            padding: 10,
                                            color: 'white'
                                        }}
                                        value={secTitle}
                                        onChangeText={(text) => {
                                            secTitle = text;
                                            handleChangeHeader(currentIndex, 'section', text)
                                            handleChangeHeader(currentIndex, 'header', text)
                                        }}
                                        onFocus={() => {
                                            for (var i = 0; i < template.sections.length; i++) {
                                                if (template.sections[i].id == currentId) {
                                                    setSecExists(true);
                                                    secIndex = i;
                                                }
                                            }
                                        }}
                                        onBlur={() => {
                                            if (secExists) {
                                                updateSection(secIndex, currentId, secTitle)
                                            } else {
                                                addSection(currentId, secTitle)
                                            }
                                            setSecExists(false);
                                        }}
                                    />
                                </View>
                            ) : null }
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
            {/* PARAGRAPH SETTINGS MODAL */}
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
                        <ScrollView style={styles.settingsContent}>
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
                            <Text style={[styles.settingsLabel, {marginTop: 40}]}>Paragraph Font Size</Text>       
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
                        </ScrollView>
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
            {/* IMAGE SETTINGS MODAL */}
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
            {/* UL SETTINGS MODAL */}    
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
            {/* OL SETTINGS MODAL */}
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
            {/* SPACER SETTINGS MODAL */}    
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
            {/* SEPARATOR SETTINGS MODAL */}    
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
                            <Text style={styles.settingsLabel}>Separator Height</Text>
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
            {/* HEADER INPUT SETTINGS */}  
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={headerInputSettings}
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
                            <Text style={styles.topContentText}>Header Input Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setHeaderInputSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Show Subheader</Text>
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
                                    status={showSubInput}
                                    color="#ff6905"
                                    uncheckedColor="#383F4D"
                                    onPress={() => {
                                        if (showSubInput == "checked")  {
                                            showSubInput = "unchecked";
                                        } else {
                                            showSubInput = "checked";
                                        }
                                        handleChangeHeaderInput(currentIndex, 'showSubHeader', showSubInput) 
                                    }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
            {/* PARAGRAPH INPUT SETTINGS */} 
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={paragraphInputSettings}
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
                            <Text style={styles.topContentText}>Paragraph Input Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setParagraphInputSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={[styles.topDesign, {flexDirection: 'row', paddingLeft: 0}]}>
                            <View style={styles.topDesign}>
                                <Text style={styles.topButtonText}>Data</Text>
                            </View>
                        </View>
                        <View style={styles.dataDropdowns}>
                            <Text style={styles.dataHeaders}>Filled Data</Text>
                            <View style={styles.filledData}>
                                <Text style={styles.filledText}>{paragraphInputSettings ? field_list[currentIndex].data : null}</Text>
                            </View>
                            <Text style={styles.dataHeaders}>Select Data Field</Text>
                            <DetailsList 
                                currentIndex={currentIndex}
                                detailid={currentId}
                            />
                        </View>
                    </View>
                </Modal>
            {/* DETAILS */}  
                <Modal
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                    isVisible={detailsSide}
                    transparent={true}
                    hasBackdrop={false}
                    coverScreen={true}
                    onRequestClose={() => {
                        setDetailsSide(!detailsSide)
                    }}
                    style={{
                        margin: 0
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#141824',
                            width: '100%',
                            height: '100%',
                            paddingTop: 50,
                        }}
                    >
                        <View 
                            style={{
                                backgroundColor: '#212433',
                                borderRadius: 10,
                                paddingHorizontal: 20,
                                marginBottom: 10,
                                height: 47,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '90%',
                                position: 'absolute',
                                marginHorizontal: Platform.OS === 'ios' ? 20 : 0,
                                marginLeft: 20,
                                marginTop: Platform.OS === 'ios' ? 60 : 40,
                                shadowOffset: {
                                    width: 0,
                                    height: 3
                                },
                                shadowColor: '#000',
                                elevation: 5,
                                shadowRadius: 8,
                                shadowOpacity: .2,
                                zIndex: 100
                            }}
                        >
                            <Entypo
                                name="chevron-thin-left" 
                                size={20} 
                                style={{
                                    marginLeft: 20,
                                    color:'#ffffff',
                                    position: 'absolute',
                                    top: 14,
                                    left: 0,
                                    zIndex: 100,
                                }} 
                                onPress={() => {
                                    setDetailsSide(false)
                                }} 
                            />
                            <Text style={{
                                color: '#ffffff',
                                fontWeight: '300',
                                fontSize: 17,
                                textAlign: 'center',
                            }}>Details</Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    borderRadius: 7,
                                    paddingHorizontal: 10,
                                    paddingVertical: 4,
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    position: 'absolute',
                                    right: 10,
                                    backgroundColor: '#D0D8E5'
                                }}
                                onPress={() => {
                                    addDetailSection()
                                }}
                            >
                                <Ionicons 
                                    name="add" 
                                    size={20} 
                                    color="#212433" 
                                />
                                <Text style={{color: '#212433', paddingLeft: 6}}>Add</Text>
                            </TouchableOpacity>
                        </View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                        >
                            <FlatList
                                style={{
                                    marginTop: Platform.OS == 'ios' ? 40 : 10,
                                }}
                                contentContainerStyle={{
                                    paddingTop: 30,
                                    paddingBottom: '170%'
                                }}
                                data={details}
                                keyExtractor={(item) => item.id} 
                                renderItem={({item, index}) => {  
                                    var selected;
                                    if (item.id === selectSection) {
                                        selected = true;
                                    } else {
                                        selected = false;
                                    }

                                    return (
                                        <View>
                                            <View
                                                style={{
                                                    backgroundColor: '#282C3A',
                                                    paddingVertical: Platform.OS === 'ios' ? 15: 10,
                                                    paddingHorizontal: 20,
                                                    marginHorizontal: 15,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 3
                                                    },
                                                    shadowColor: '#000',
                                                    elevation: 5,
                                                    shadowRadius: 8,
                                                    shadowOpacity: .2,
                                                    borderRadius: 7,
                                                    marginTop: 15,
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <TextInput 
                                                    style={{
                                                        color: 'white', 
                                                        fontSize: 16,
                                                        width: '60%',
                                                    }}
                                                    value={item.title}
                                                    onChangeText={(text) => {
                                                        changeSectionTitle(index, text)
                                                    }}
                                                />
                                                { index !== 0 ? (
                                                    <Ionicons 
                                                        name="chevron-up" 
                                                        size={27} 
                                                        color="white"
                                                        style={{
                                                            position: 'absolute',
                                                            right: 120,
                                                        }} 
                                                        onPress={() => {
                                                            swapDetails(index, index-1, details[index], details[index-1])
                                                        }}
                                                    />
                                                ) : null}
                                                { index !== details.length-1 ? (
                                                    <Ionicons 
                                                        name="chevron-down" 
                                                        size={27} 
                                                        color="white"
                                                        style={{
                                                            position: 'absolute',
                                                            right: 90,
                                                        }} 
                                                        onPress={() => {
                                                            swapDetails(index, index+1, details[index], details[index+1])
                                                        }}
                                                    />
                                                ) : null }
                                                { !selected ? (
                                                    <Entypo 
                                                        name="chevron-with-circle-down" 
                                                        size={27} 
                                                        color="white"
                                                        style={{
                                                            position: 'absolute',
                                                            right: 50,
                                                        }} 
                                                        onPress={() => {
                                                            setSelectSection(item.id);
                                                        }}
                                                    />
                                                ) : 
                                                    <Entypo
                                                        name="chevron-with-circle-up" 
                                                        size={27} 
                                                        color="white"
                                                        style={{
                                                            position: 'absolute',
                                                            right: 50,
                                                        }} 
                                                        onPress={() => {
                                                            setSelectSection();
                                                        }}
                                                    />
                                                }
                                                <Feather
                                                    name="trash-2" 
                                                    style={{
                                                        position: 'absolute',
                                                        right: 15,
                                                    }}    
                                                    size={20}
                                                    color="white"
                                                    onPress={() => {
                                                        deleteSection(index)
                                                    }}
                                                />
                                            </View>
                                            { selected ? (
                                                <View 
                                                    style={{
                                                        marginHorizontal: 20,
                                                        paddingTop: 15,
                                                        paddingBottom: 20
                                                    }}
                                                >
                                                    <View>
                                                        <Text 
                                                            style={{
                                                                textAlign: 'center',
                                                                color: 'white'
                                                            }}
                                                        >Select Detail to Add</Text>
                                                        <View 
                                                            style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'center', 
                                                                alignItems: 'center',
                                                                paddingBottom: 15
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                style={{
                                                                    backgroundColor: '#212433',
                                                                    paddingVertical: 10,
                                                                    paddingHorizontal: 9,
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'center',
                                                                    borderRadius: 7,
                                                                    marginTop: 10
                                                                }}
                                                                onPress={() => {
                                                                    addDropdown(index)
                                                                }}
                                                            >
                                                                <AntDesign 
                                                                    name="plus" 
                                                                    size={16} 
                                                                    color="white" 
                                                                />
                                                                <Text 
                                                                    style={{
                                                                        color: 'white', 
                                                                        marginHorizontal: 7
                                                                    }}
                                                                >Dropdown</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={{
                                                                    backgroundColor: '#212433',
                                                                    paddingVertical: 10,
                                                                    paddingHorizontal: 9,
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'center',
                                                                    borderRadius: 7,
                                                                    marginTop: 10,
                                                                    marginHorizontal: 5
                                                                }}
                                                                onPress={() => {
                                                                    addText(index)
                                                                }}
                                                            >
                                                                <AntDesign 
                                                                    name="plus" 
                                                                    size={16} 
                                                                    color="white" 
                                                                />
                                                                <Text 
                                                                    style={{
                                                                        color: 'white', 
                                                                        marginHorizontal: 7
                                                                    }}
                                                                >Text</Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                style={{
                                                                    backgroundColor: '#212433',
                                                                    paddingVertical: 10,
                                                                    paddingHorizontal: 9,
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'center',
                                                                    borderRadius: 7,
                                                                    marginTop: 10
                                                                }}
                                                                onPress={() => {
                                                                    addCheckboxes(index)
                                                                }}
                                                            >
                                                                <AntDesign 
                                                                    name="plus" 
                                                                    size={16} 
                                                                    color="white" 
                                                                />
                                                                <Text 
                                                                    style={{
                                                                        color: 'white', 
                                                                        marginHorizontal: 7
                                                                    }}
                                                                >Checkboxes</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <View 
                                                            style={{
                                                                borderBottomWidth: 1, 
                                                                borderColor: 'rgba(208,219,229,0.2)',
                                                            }}
                                                        ></View>
                                                    </View>
                                                    <FlatList
                                                        style={{
                                                            marginTop: 15
                                                        }}
                                                        data={item.details}
                                                        keyExtractor={(item) => item.id} 
                                                        renderItem={({item: item2, index: index2}) => {
                                                            
                                                            switch (item2.type) {
                                                                case 'dropdown':
                                                                    detail = 
                                                                        <View style={styles.dsection}>
                                                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                                                <TextInput 
                                                                                    style={styles.sectionLabel}
                                                                                    value={item2.label}
                                                                                    onChangeText={(text) => {
                                                                                        changeLabel(index, index2, text)
                                                                                    }}
                                                                                />
                                                                                { index2 !== 0 ? (
                                                                                <Ionicons 
                                                                                    name="chevron-up" 
                                                                                    size={27} 
                                                                                    color="white"
                                                                                    style={{
                                                                                        position: 'absolute',
                                                                                        right: 60,
                                                                                    }} 
                                                                                    onPress={() => {
                                                                                        swapSubSec(index, index2, index2-1, item.details[index2], item.details[index2-1])
                                                                                    }}
                                                                                />
                                                                                ) : null}
                                                                                { index2 !== item.details.length-1 ? (
                                                                                    <Ionicons 
                                                                                        name="chevron-down" 
                                                                                        size={27} 
                                                                                        color="white"
                                                                                        style={{
                                                                                            position: 'absolute',
                                                                                            right: 30,
                                                                                        }} 
                                                                                        onPress={() => {
                                                                                            swapSubSec(index, index2, index2+1, item.details[index2], item.details[index2+1])
                                                                                        }}
                                                                                    />
                                                                                ) : null }
                                                                                <Feather
                                                                                    name="trash-2" 
                                                                                    style={{
                                                                                        position: 'absolute',
                                                                                        right: 0,
                                                                                    }}    
                                                                                    size={20}
                                                                                    color="white"
                                                                                    onPress={() => {
                                                                                        deleteType(index, index2)
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                            <View style={{alignItems: 'center'}}>
                                                                                <View
                                                                                    style={{
                                                                                        marginTop: 20,
                                                                                        backgroundColor: '#212433',
                                                                                        height: 45,
                                                                                        width: '95%',
                                                                                        borderRadius: 7,
                                                                                        paddingVertical: 13,
                                                                                        paddingHorizontal: 20
                                                                                    }}
                                                                                >
                                                                                    <Text style={{color: 'rgba(255,255,255,0.5)'}}>Dropdown Menu</Text>
                                                                                    <Ionicons 
                                                                                        name="chevron-down" 
                                                                                        size={23} 
                                                                                        color="rgba(255,255,255,0.5)"
                                                                                        style={{
                                                                                            position: 'absolute',
                                                                                            right: 20,
                                                                                            top: 10
                                                                                        }} 
                                                                                    />
                                                                                </View>
                                                                                <Text 
                                                                                    style={{
                                                                                        textAlign: 'center', color: 'white', marginTop: 15
                                                                                    }}
                                                                                >Add Dropdown Options</Text>
                                                                                <View style={styles.optionContainer}>
                                                                                    <TextInput 
                                                                                        style={styles.optionInput}
                                                                                        onChangeText={(text) => {
                                                                                            dOption = text;
                                                                                        }}
                                                                                    />
                                                                                    <TouchableOpacity 
                                                                                        style={[styles.addOption, styles.dropShadow]}
                                                                                        onPress={() => {
                                                                                            addOption(index, index2, dOption)
                                                                                        }}
                                                                                    >
                                                                                        <Text style={{color: 'white'}}>Add</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                <FlatList
                                                                                    style={{
                                                                                        marginTop: 15,
                                                                                        width: '85%'
                                                                                    }}
                                                                                    data={item2.options}
                                                                                    keyExtractor={(item) => item.id} 
                                                                                    renderItem={({item: item3, index: index3}) => {
                                                                                        return(
                                                                                            <View 
                                                                                                style={{
                                                                                                    paddingVertical: 10,
                                                                                                    paddingHorizontal: 15,
                                                                                                    borderRadius: 5,
                                                                                                    flexDirection: 'row',
                                                                                                    alignItems: 'center'
                                                                                                }}
                                                                                            >
                                                                                                <Text style={{color:'white', fontSize: 16, paddingRight: 20}}>{item3.value.length > 19 ? item3.value.slice(0,19) + '...' : item3.value}</Text>
                                                                                                { index3 !== 0 ? (
                                                                                                <Ionicons 
                                                                                                    name="chevron-up" 
                                                                                                    size={25} 
                                                                                                    color="white"
                                                                                                    style={{
                                                                                                        position: 'absolute',
                                                                                                        right: 70,
                                                                                                    }}
                                                                                                    onPress={() => {
                                                                                                        swapSmallDetails(index, index3, index3-1, item2.options[index3], item2.options[index3-1], index2)
                                                                                                    }} 
                                                                                                />
                                                                                                ) : null}
                                                                                                { index3 !== item2.options.length-1 ? (
                                                                                                    <Ionicons 
                                                                                                        name="chevron-down" 
                                                                                                        size={25} 
                                                                                                        color="white"
                                                                                                        style={{
                                                                                                            position: 'absolute',
                                                                                                            right: 40,
                                                                                                        }} 
                                                                                                        onPress={() => {
                                                                                                            swapSmallDetails(index, index3, index3+1, item2.options[index3], item2.options[index3+1], index2)
                                                                                                        }}
                                                                                                    />
                                                                                                ) : null }
                                                                                                <Feather
                                                                                                    name="trash-2" 
                                                                                                    style={{
                                                                                                        position: 'absolute',
                                                                                                        right: 10,
                                                                                                    }}    
                                                                                                    size={20}
                                                                                                    color="white"
                                                                                                    onPress={() => {
                                                                                                        deleteOption(index, index2, index3)
                                                                                                    }}
                                                                                                />
                                                                                            </View>
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                            <View 
                                                                                style={{
                                                                                    marginTop: 10,
                                                                                    borderBottomWidth: 1, 
                                                                                    borderColor: 'rgba(208,219,229,0.2)',
                                                                                }}
                                                                            ></View>
                                                                        </View>
                                                                    break;
                                                                case 'text':
                                                                    detail = 
                                                                        <View style={styles.dsection}>
                                                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                                                <TextInput 
                                                                                    style={styles.sectionLabel}
                                                                                    value={item2.label}
                                                                                    onChangeText={(text) => {
                                                                                        changeLabel(index, index2, text)
                                                                                    }}
                                                                                />
                                                                                { index2 !== 0 ? (
                                                                                <Ionicons 
                                                                                    name="chevron-up" 
                                                                                    size={27} 
                                                                                    color="white"
                                                                                    style={{
                                                                                        position: 'absolute',
                                                                                        right: 60,
                                                                                    }} 
                                                                                    onPress={() => {
                                                                                        swapSubSec(index, index2, index2-1, item.details[index2], item.details[index2-1])
                                                                                    }}
                                                                                />
                                                                                ) : null}
                                                                                { index2 !== item.details.length-1 ? (
                                                                                    <Ionicons 
                                                                                        name="chevron-down" 
                                                                                        size={27} 
                                                                                        color="white"
                                                                                        style={{
                                                                                            position: 'absolute',
                                                                                            right: 30,
                                                                                        }} 
                                                                                        onPress={() => {
                                                                                            swapSubSec(index, index2, index2+1, item.details[index2], item.details[index2+1])
                                                                                        }}
                                                                                    />
                                                                                ) : null }
                                                                                <Feather
                                                                                    name="trash-2" 
                                                                                    style={{
                                                                                        position: 'absolute',
                                                                                        right: 0,
                                                                                    }}    
                                                                                    size={20}
                                                                                    color="white"
                                                                                    onPress={() => {
                                                                                        deleteType(index, index2)
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                            <View style={{alignItems: 'center', paddingBottom: 15}}>
                                                                                <TextInput
                                                                                    style={{
                                                                                        marginTop: 15,
                                                                                        height: 110,
                                                                                        width: '95%',
                                                                                        padding: 10,
                                                                                        backgroundColor: '#fff',  
                                                                                        borderRadius: 5,
                                                                                        borderWidth: 1,
                                                                                        borderColor: 'rgba(208,219,229,0.2)',
                                                                                        alignItems:'flex-start',
                                                                                        justifyContent: 'flex-start'
                                                                                    }}
                                                                                    value={item2.value}
                                                                                    placeholder="DEFAULT TEXT"
                                                                                    multiline={true}
                                                                                    numberOfLines={4}
                                                                                    onChangeText={(text) => {
                                                                                        changeTempText(index, index2, text)
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                            <View 
                                                                                style={{
                                                                                    marginTop: 10,
                                                                                    borderBottomWidth: 1, 
                                                                                    borderColor: 'rgba(208,219,229,0.2)',
                                                                                }}
                                                                            ></View>
                                                                        </View>
                                                                    break;
                                                                case 'checkboxes':
                                                                    detail = 
                                                                        <View style={styles.dsection}>
                                                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                                                <TextInput 
                                                                                    style={styles.sectionLabel}
                                                                                    value={item2.label}
                                                                                    onChangeText={(text) => {
                                                                                        changeLabel(index, index2, text)
                                                                                    }}
                                                                                />
                                                                                { index2 !== 0 ? (
                                                                                <Ionicons 
                                                                                    name="chevron-up" 
                                                                                    size={27} 
                                                                                    color="white"
                                                                                    style={{
                                                                                        position: 'absolute',
                                                                                        right: 60,
                                                                                    }} 
                                                                                    onPress={() => {
                                                                                        swapSubSec(index, index2, index2-1, item.details[index2], item.details[index2-1])
                                                                                    }}
                                                                                />
                                                                                ) : null}
                                                                                { index2 !== item.details.length-1 ? (
                                                                                    <Ionicons 
                                                                                        name="chevron-down" 
                                                                                        size={27} 
                                                                                        color="white"
                                                                                        style={{
                                                                                            position: 'absolute',
                                                                                            right: 30,
                                                                                        }} 
                                                                                        onPress={() => {
                                                                                            swapSubSec(index, index2, index2+1, item.details[index2], item.details[index2+1])
                                                                                        }}
                                                                                    />
                                                                                ) : null }
                                                                                <Feather
                                                                                    name="trash-2" 
                                                                                    style={{
                                                                                        position: 'absolute',
                                                                                        right: 0,
                                                                                    }}    
                                                                                    size={20}
                                                                                    color="white"
                                                                                    onPress={() => {
                                                                                        deleteType(index, index2)
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                            <View style={{alignItems: 'center'}}>
                                                                                <Text 
                                                                                    style={{
                                                                                        textAlign: 'center', color: 'white', marginTop: 15
                                                                                    }}
                                                                                >Add Checkbox Options</Text>
                                                                                <View style={styles.optionContainer}>
                                                                                    <TextInput 
                                                                                        style={styles.optionInput}
                                                                                        onChangeText={(text) => {
                                                                                            cOption = text;
                                                                                        }}
                                                                                    />
                                                                                    <TouchableOpacity 
                                                                                        style={[styles.addOption, styles.dropShadow]}
                                                                                        onPress={() => {
                                                                                            addCheckboxOption(index, index2, cOption)
                                                                                        }}
                                                                                    >
                                                                                        <Text style={{color: 'white'}}>Add</Text>
                                                                                    </TouchableOpacity>
                                                                                </View>
                                                                                <FlatList
                                                                                    style={{
                                                                                        marginTop: 15,
                                                                                        width: '85%'
                                                                                    }}
                                                                                    data={item2.options}
                                                                                    keyExtractor={(item) => item.id} 
                                                                                    renderItem={({item: item3, index: index3}) => {
                                                                                        return(
                                                                                            <View 
                                                                                                style={{
                                                                                                    paddingVertical: 1,
                                                                                                    paddingHorizontal: 0,
                                                                                                    borderRadius: 5,
                                                                                                    flexDirection: 'row',
                                                                                                    alignItems: 'center'
                                                                                                }}
                                                                                            >
                                                                                                <Checkbox
                                                                                                    status="checked"
                                                                                                    color="#ff6905"
                                                                                                    uncheckedColor="#fff"
                                                                                                />
                                                                                                <Text style={{color:'white', fontSize: 16, paddingRight: 20}}>{item3.value.length > 17 ? item3.value.slice(0,17) + '...' : item3.value}</Text>
                                                                                                { index3 !== 0 ? (
                                                                                                <Ionicons 
                                                                                                    name="chevron-up" 
                                                                                                    size={25} 
                                                                                                    color="white"
                                                                                                    style={{
                                                                                                        position: 'absolute',
                                                                                                        right: 70,
                                                                                                    }}
                                                                                                    onPress={() => {
                                                                                                        swapSmallDetails(index, index3, index3-1, item2.options[index3], item2.options[index3-1], index2)
                                                                                                    }} 
                                                                                                />
                                                                                                ) : null}
                                                                                                { index3 !== item2.options.length-1 ? (
                                                                                                    <Ionicons 
                                                                                                        name="chevron-down" 
                                                                                                        size={25} 
                                                                                                        color="white"
                                                                                                        style={{
                                                                                                            position: 'absolute',
                                                                                                            right: 40,
                                                                                                        }} 
                                                                                                        onPress={() => {
                                                                                                            swapSmallDetails(index, index3, index3+1, item2.options[index3], item2.options[index3+1], index2)
                                                                                                        }}
                                                                                                    />
                                                                                                ) : null }
                                                                                                <Feather
                                                                                                    name="trash-2" 
                                                                                                    style={{
                                                                                                        position: 'absolute',
                                                                                                        right: 10,
                                                                                                    }}    
                                                                                                    size={20}
                                                                                                    color="white"
                                                                                                    onPress={() => {
                                                                                                        deleteOption(index, index2, index3)
                                                                                                    }}
                                                                                                />
                                                                                            </View>
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            </View>
                                                                            <View 
                                                                                style={{
                                                                                    marginTop: 10,
                                                                                    borderBottomWidth: 1, 
                                                                                    borderColor: 'rgba(208,219,229,0.2)',
                                                                                }}
                                                                            ></View>    
                                                                        </View>
                                                                    break;
                                                                default:
                                                                    break;
                                                            }

                                                            return (
                                                                <View>
                                                                    {detail}
                                                                </View>
                                                            )
                                                        }}
                                                    />
                                                </View>
                                            ) : null }
                                        </View>
                                    )
                                }}
                            />                        
                            <View style={{ flex: 1 }} /> 
                        </KeyboardAvoidingView>
                    </View>
                </Modal>
            {/* DETAILS SECTION MODAL */}
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={detailsSettings}
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
                            <Text style={styles.topContentText}>Detail Section Settings</Text>
                            <Ionicons 
                                name="ios-close" 
                                size={22} 
                                onPress={() => {
                                    setDetailsSideSettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <View style={styles.dataDropdowns}>
                            <Text style={styles.dataHeaders}>Filled Data</Text>
                            <View style={styles.filledData}>
                                <Text style={styles.filledText}>{detailsSettings ? field_list[currentIndex].data : null}</Text>
                            </View>
                            <Text style={styles.dataHeaders}>Select Data Field</Text>
                            <DetailsList 
                                currentIndex={currentIndex}
                            />
                        </View>
                    </View>
                </Modal>
            </Modal>

        {/* FLATLIST */}
            <FlatList
                data={field_list}
                contentContainerStyle={{
                    paddingBottom: '100%',
                    paddingTop: 70
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
                        currentId = item.id;               
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
                                                handleChangeHeader(currentIndex, 'section', text)
                                                handleChangeHeader(currentIndex, 'header', text)
                                            }}
                                            onFocus={() => {
                                                if (item.showSec == 'checked') {
                                                    for (var i = 0; i < template.sections.length; i++) {
                                                        if (template.sections[i].id == currentId) {
                                                            setSecExists(true);
                                                            secIndex = i;
                                                        }
                                                    }
                                                }
                                            }}
                                            onBlur={() => {
                                                if (item.showSec == 'checked') {
                                                    if (secExists) {
                                                        updateSection(secIndex, currentId, secTitle)
                                                    } else {
                                                        addSection(currentId, secTitle)
                                                    }
                                                    setSecExists(false);
                                                }
                                            }}
                                        />
                                    {/* SUB-HEADER TEXT */}
                                        { item.showSubHeader == "checked" ? (
                                            <TextInput 
                                                style={[
                                                    styles.subheader, 
                                                    {
                                                        color: textColor,
                                                        textAlign: item.style[2].style,
                                                        fontFamily: globalStyle[0].style
                                                    }
                                                ]}
                                                defaultValue="Header"
                                                multiline={true}
                                                value={item.subheader}
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
                                                        showSec = field_list[currentIndex].showSection;
                                                        secTitle = field_list[currentIndex].section
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
                                            multiline={true}
                                            value={item.paragraph}
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
                                                                fontFamily: globalStyle[0].style,
                                                                paddingTop: item.style[3].style == 14 ? 8 : 5
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
                                                                fontFamily: globalStyle[0].style,
                                                                paddingTop: item.style[3].style == 14 ? 8 : 5
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
                        case 'headerinput':

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
                                    {/* HEADER TEXT */}
                                        <View style={styles.inputContainer}>
                                            <View style={styles.input}>
                                                <Text style={{fontSize: 25, color: '#aaa'}}>Header</Text>
                                            </View>
                                            { item.showSubHeader == "checked" ? (
                                                <View 
                                                    style={[styles.input, {
                                                        marginTop: 10
                                                    }]}
                                                >
                                                    <Text style={{color: '#aaa'}}>Subheader</Text>
                                                </View>
                                            ) : null }
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
                                                        setHeaderInputSettings(true)
                                                        showSubInput = field_list[currentIndex].showSubHeader;
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
                        case 'paragraphinput':

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
                                        <View style={styles.inputContainer}>
                                            <View style={styles.input}>
                                                <Text style={{color: "#aaa"}}>Paragraph</Text>
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
                        case 'imageinput':
                        
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
                        case 'galleryinput':
                    
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
                                            fadeDuration={0}
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: item.style[1].style
                                            }}
                                        >
                                            <Ionicons
                                                name="images-outline"
                                                size={100}
                                                color="rgba(208,219,229,.75)"
                                            />
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
                        case 'ulinput':

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
                                                width: "100%",
                                                paddingRight: 30
                                            }}
                                        >
                                            <FontAwesome
                                                name="circle"
                                                size={13}
                                                style={{
                                                    paddingRight: 10,
                                                    paddingTop: 10
                                                }}
                                            />
                                            <View style={[styles.input, {width: '100%'}]}>
                                                <Text style={{color: "#aaa"}}>List Item</Text>
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
                                                { /* <Pressable 
                                                    onPress={() => {
                                                        setULInputSettings(true)
                                                    }}
                                                    style={styles.elementButton}
                                                >
                                                    <Feather
                                                        name="settings"
                                                        size={20}
                                                        color="white"
                                                    />
                                                </Pressable> */ }
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
                        case 'olinput':

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
                                                width: "100%",
                                                paddingRight: 30
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    paddingRight: 10,
                                                    fontSize: 17,
                                                    paddingTop: 6
                                                }}
                                            >1.</Text>
                                            <View style={[styles.input, {width: '100%'}]}>
                                                <Text style={{color: "#aaa"}}>List Item</Text>
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
                        case 'detailsection':
                            var checkData = item.data;
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
                                        { checkData == "" ? (
                                            <View>
                                                <Text style={{fontStyle: 'italic', color: '#999'}}>Select Detail Section</Text>
                                            </View>
                                        ) : (
                                            <FlatList
                                                data={template.details}
                                                keyExtractor={(item) => item.id} 
                                                renderItem={({item: item1, index: index1}) => {  
                                                    var itemData = item.data;
                                                    var item1Title = item1.title;
                                                    return (
                                                        <View>
                                                            { itemData == item1Title ? (
                                                                <View>
                                                                    <Text style={{fontSize: 18, paddingBottom: 7}}>{item.data}</Text>
                                                                    <View style={{borderBottomWidth: 1}}></View>
                                                                    <FlatList
                                                                        style={{
                                                                            marginTop: 15,
                                                                            marginLeft: 20
                                                                        }}
                                                                        data={item1.details}
                                                                        keyExtractor={(item) => item.id} 
                                                                        renderItem={({item: item2, index: index2}) => {
                                                                            
                                                                            switch (item2.type) {
                                                                                case 'dropdown':
                                                                                    detail = 
                                                                                        <View style={{flexDirection: 'row', paddingBottom: 8}}>
                                                                                            <Text style={{fontWeight: 'bold'}}>{item2.label} </Text>
                                                                                            <Text style={{color: '#aaa'}}>Dropdown Value</Text>
                                                                                        </View>
                                                                                    break;
                                                                                case 'text':
                                                                                    detail = 
                                                                                        <View style={{flexDirection: 'column', paddingBottom: 15}}>
                                                                                            <Text style={{fontWeight: 'bold', paddingBottom: 3}}>{item2.label}</Text>
                                                                                            <Text style={{color: '#aaa'}}>Text Value</Text>
                                                                                        </View>
                                                                                    break;
                                                                                case 'checkboxes':
                                                                                    detail = 
                                                                                        <View style={{flexDirection: 'row', paddingBottom: 8}}>
                                                                                            <Text style={{fontWeight: 'bold'}}>{item2.label} </Text>
                                                                                            <Text style={{color: '#aaa'}}>Checkbox Values</Text>
                                                                                        </View>
                                                                                    break;
                                                                                default:
                                                                                    break;
                                                                            }

                                                                            return (
                                                                                <View>
                                                                                    {detail}
                                                                                </View>
                                                                            )
                                                                        }}
                                                                    />
                                                                </View>
                                                            ) : null }
                                                        </View>
                                                    )
                                                }}
                                            /> 
                                        )}
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
                                                        setDetailsSideSettings(true)
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
        padding: 30,
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
        width: '70%'
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
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        field_list: state.template.field_list,
        globalStyle: state.template.globalStyle,
        template: state.template,
        templateList: state.templateList,
        report: state.report,
        user: state.user.user,
        details: state.template.details
    }
}

const mapDispatchToProps = { 
    addHeader, 
    deleteField, 
    styleHeader, 
    styleGlobal, 
    addParagraph, 
    changeParagraph,
    styleParagraph, 
    addImage, 
    styleImage,
    changeImage,
    changeHeader,
    swapFields,
    addUL,
    addULItem,
    changeULItem,
    styleUL,
    deleteListItem,
    addOL,
    addOLItem,
    changeOLItem,
    styleOL,
    addSpacer,
    styleSpacer,
    addSeparator,
    styleSeparator,
    addHeaderInput,
    addParagraphInput,
    addImageInput,
    addULInput,
    addOLInput,
    updateTemplate,
    resetTemplate,
    changeTitle,
    addDetailSection,
    changeSectionTitle,
    addDropdown,
    addText,
    addCheckboxes,
    changeLabel,
    addOption,
    deleteOption,
    deleteType,
    deleteSection,
    fetchTemplates,
    changeTemplateId,
    addCheckboxOption,
    addDetails,
    updateUser,
    getUserTemplates,
    addSection,
    updateSection,
    swapDetails,
    swapSubSec,
    swapSmallDetails,
    changeTempText
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateEditorScreen);