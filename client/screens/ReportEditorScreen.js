import React, { useState, useEffect, useRef } from 'react';
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
import DropDownPicker from 'react-native-dropdown-picker';
import { ColorPicker } from 'react-native-color-picker';
import * as ImageUpload from 'expo-image-picker';
import { connect, useDispatch } from 'react-redux';
import { 
    addHeader, 
    styleHeader, 
    styleGlobal, 
    addParagraph,
    changeParagraph,
    styleParagraph,
    addImage,
    styleImage,
    changeImage,
    changeHeader,
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
    addGalleryInput,
    updateTemplate,
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
    changeTemplateId
} from '../redux/actions/templateAction';
import {
    openDropdown,
    selectDropdownItem,
    changeText,
    checkBox,
    updateReport,
    changeHeaderInput,
    styleHeaderInput,
    changeParagraphInput,
    styleParagraphInput,
    changeImageInput,
    styleImageInput,
    addULItemInput,
    deleteListItemInput,
    changeULItemInput,
    styleULInput,
    addOLItemInput,
    changeOLItemInput,
    styleOLInput,
    addGalleryImages,
    styleGalleryImages,
    changeComplete,
    fillHeight,
    addPagebreak,
    swapFields,
    stylePagebreak,
    deleteField,
    changeMainField,
    getUserReports,
    addImages,
    selectImage,
    removeImages,
    addGallery,
    resetReport,
    changeGlobal
} from '../redux/actions/reportAction'
import { Checkbox } from 'react-native-paper';
import DetailsList from '../components/DetailsList';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';
import DownloadReport from '../components/DownloadReport';

const windowHeight = Dimensions.get('window').height;   // Dimensions
const windowWidth = Dimensions.get('window').width;   // Dimensions
var heightThreshold = 800;                              // Determines when the styling changes based on screen height
var abSelect1, abSelect2, abSelect3;                    // Align Button Styles
var fsSelect1, fsSelect2, fsSelect3;                    // Font Size Styles
var textColor;                                          // Font Color
var currentIndex;                                       // Field Id
var heightThreshold = 800;                              // For screen size changes
var imageWidth, imageHeight;                            // Image Field Variables
var showSub, showSubInput;                              // Show subheader(s)
var spacerHeight;                                       // Spacer size
var separatorHeight, separatorColor;                    // Separator size
var scrollIndex = 0;                                    // Bookmark scroll to section index
var letGal;

var uniqueId = new Date();
var uniqueId = uniqueId.getTime();

const ReportEditorScreen = ({templateList, reportID, report, globalStyle, field_list, detail_list, addHeader, deleteField, styleHeader, styleGlobal, addParagraph, styleParagraph, addImage, styleImage, changeImage, changeHeader, changeParagraph, swapFields, addUL, addULItem, changeULItem, styleUL, deleteListItem, addOL, addOLItem, changeOLItem, styleOL, addSpacer, styleSpacer, addSeparator, styleSeparator, addHeaderInput, addParagraphInput, addImageInput, addULInput, addOLInput, addGalleryInput, updateTemplate, resetReport, changeTitle, addDetailSection, changeSectionTitle, addDropdown, addText, addCheckboxes, changeLabel, addOption, deleteOption, deleteType, deleteSection, changeTemplateId, openDropdown, selectDropdownItem, changeText, checkBox, updateReport, changeHeaderInput, styleHeaderInput, changeParagraphInput, styleParagraphInput, changeImageInput, styleImageInput, addULItemInput, deleteListItemInput, changeULItemInput, styleULInput, addOLItemInput, changeOLItemInput, styleOLInput, addGalleryImages, styleGalleryImages, changeComplete, addPagebreak, stylePagebreak, changeMainField, clientContract, getUserReports, user, addImages, selectImage, removeImages, addGallery, changeGlobal }) => {
    // Navigation //
    const navigation = useNavigation();
    // Redux Dispatch
    const dispatch = useDispatch();
    const flatlistRef = useRef()
    const detailsRef = useRef()

    // Local States //
    const [leftSide, setLeftSide] = useState(false);                    // Navigation sidebar
    const [openCP, setOpenCP] = useState(false);                        // Color picker modal
    const [cpcolor, setColor] = useState('#000000');                    // Color preview
    const [cpbgcolor, setBGColor] = useState('#ffffff');                // Background color preview
    const [selectElement, setSelectElement] = useState(null);           // Selected field
    const [imageInputSettings, setImageInputSettings] = useState(false)           // Open image settings sidebar
    const [image, setImage] = useState(null);                           // Image Picker
    const [ULInputSettings, setULInputSettings] = useState(false);                // Open UL settings sidebar
    const [OLInputSettings, setOLInputSettings] = useState(false);                // Open UL settings sidebar
    const [pagebreakSettings, setPagebreakSettings] = useState(false);  // Open Pagebreak settings sidebar
    const [details, setDetails] = useState(false);                      // Open Details Modal
    const [selectSection, setSelectSection] = useState(null);           // Selected Details Section
    const [headerInputSettings, setHeaderInputSettings] = useState(false); // Open Header Input settings sidebar
    const [paragraphInputSettings, setParagraphInputSettings] = useState(false); // Open Paragraph Input settings sidebar
    const [imageGallerySettings, setImageGallerySettings] = useState(false); // Open Image Gallery sidebar
    const [multImagePicker, setMultImagePicker] = useState(false);      // Open multiple image picker
    const [allImages, setAllImages] = useState(false)                   // For opening the Images modal
    const [selImages, setSelImages] = useState([])                      // Selected images in the Images modal
    const [tempSelected, setTempSelect] = useState(false);
    const [tHeight, setTHeight] = useState(70);
    const [status, requestPermission] = ImageUpload.useMediaLibraryPermissions();
    const [galtext, setGaltext] = useState('');                         // Text for adding a gallery in a section

    // Action Variables
    var field, element, style, uri, header, subheader, paragraph, showSubHeader, list;

    // Details variables
    var detail;

    const reps = user.reports;

    const [galleryHeader, setGalleryHeader] = useState();

    useEffect(() => {
        requestPermission()
    }, []);

    // Image Picker
    const pickImage = async () => {
        let result = await ImageUpload.launchImageLibraryAsync({
            mediaTypes: ImageUpload.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        changeImageInput(currentIndex, result.uri)

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    // Functions for the image gallery
    const imagesCallback = (callback) => {
        callback
            .then(async (photos) => {
                const cPhotos = [];
                for (let photo of photos) {
                    const pPhoto = await _processImageAsync(photo.uri);
                    cPhotos.push({
                        id: uniqueId++,
                        uri: pPhoto.uri,
                        selected: false,
                    });
                }
            onComplete(cPhotos);
        })
        .catch((e) => console.log(e));
    };
    const _processImageAsync = async (uri) => {
        const file = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 1000 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return file;
    };
    const updateHandler = (count, onSubmit) => {
        setGalleryHeader(
            <View>
                <Text style={{color: 'white'}}>{count} Photos Selected</Text>
                <Button
                    style={{paddingBottom: 20}}
                    title="Done"
                    onPress={() => {
                        onSubmit();
                    }}
                />
            </View>
        );
    };
    const renderSelectedComponent = (number) => (
        <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{number}</Text>
        </View>
    );
    const emptyStayComponent = () => (
        <Text style={styles.emptyStay}>No Photos Selected</Text>
    );
    const onComplete = (photos) => {
        setGalleryHeader(
            <View>
                <Text style={{color: 'white'}}>0 Photos Selected</Text>
                <Button
                    style={{paddingBottom: 20}}
                    title="Done"
                    onPress={() => {
                        onSubmit();
                    }}
                />
            </View>
        );
        setMultImagePicker(false);
        if (imageGallerySettings) {
            addGalleryImages(currentIndex, photos)
        } else {
            addImages(photos)
        }
    };

    letGal = globalStyle[2].letterGal;

    return (
        <View 
            onTouchStart={(event) => {
                updateReport(reportID, report)
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
                    >{report.address}</Text>
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
                                    navigation.navigate("Reports")
                                    resetReport()
                                    getUserReports(reps)
                                }}   
                            >
                                <AntDesign name="arrowleft" size={21} color="white" />
                                <Text style={styles.buttonText}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.sideButton}
                                onPress={() => {
                                    setDetails(true)
                                }}   
                            >
                                <Feather name="edit-3" size={21} color="white" />
                                <Text style={styles.buttonText}>Details</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.sideButton}
                                onPress={() => {
                                    setAllImages(true)
                                    for (var i = 0; i < report.images.length; i++) {
                                        selectImage(true, i)
                                    }
                                    setSelImages([])
                                }}   
                            >
                                <FontAwesome5 name="images" size={21} color="white" />
                                <Text style={styles.buttonText}>Images</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.sideButton}
                                onPress={() => {
                                    changeComplete(report.completed)
                                }}   
                            >
                                <Ionicons name="checkmark-sharp" size={21} color="white" />
                                <Text style={styles.buttonText}>Mark {report.completed == "Incomplete" ? "Complete" : "Incomplete"}</Text>
                            </TouchableOpacity>
                            <View style={[styles.sideButton, {marginBottom: 15}]}>
                                <Entypo name="bookmark" size={21} color="white" />
                                <Text style={[styles.buttonText, {fontWeight: 'bold'}]}>Sections</Text>
                            </View>
                            <View style={styles.sideButton}>
                                <FlatList
                                    style={{
                                        marginTop: 0,
                                        maxHeight: 180,
                                        width: 250,
                                        elevation: 1000
                                    }}
                                    contentContainerStyle={{
                                    }}
                                    data={report.report.sections}
                                    keyExtractor={(item) => item.id} 
                                    renderItem={({item, index}) => { 
                                        return (
                                            <TouchableOpacity
                                                style={{
                                                    height: 40,
                                                    paddingLeft: 45,
                                                    justifyContent: 'center'
                                                }}
                                                onPress={() => {
                                                    for(var i = 0; i < field_list.length; i++) {
                                                        if (item.id == field_list[i].id) {
                                                            setLeftSide(false)
                                                            flatlistRef.current.scrollToIndex({ animated: true, index: i })
                                                        }
                                                    }
                                                }}
                                            >
                                                <Text style={{color: 'white'}}>{item.section}</Text>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            </View>
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
                            <Text style={styles.settingsLabel}>Text Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        styleHeaderInput(currentIndex, "textAlign", "left")
                                        styleHeaderInput(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
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
                                        styleHeaderInput(currentIndex, "textAlign", "center")
                                        styleHeaderInput(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
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
                                        styleHeaderInput(currentIndex, "textAlign", "right")
                                        styleHeaderInput(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
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
                                        styleHeaderInput(currentIndex, "fontSize", 30)
                                        styleHeaderInput(currentIndex, "fontButtons", "#ff6905,#454C69,#454C69")
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
                                        styleHeaderInput(currentIndex, "fontSize", 38)
                                        styleHeaderInput(currentIndex, "fontButtons", "#454C69,#ff6905,#454C69")
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
                                        styleHeaderInput(currentIndex, "fontSize", 22)
                                        styleHeaderInput(currentIndex, "fontButtons", "#454C69,#454C69,#ff6905")
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
                                        changeHeaderInput(currentIndex, 'showSubHeader', showSubInput) 
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
                                        styleHeaderInput(currentIndex, "fontColor", color)
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
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
                            <Text style={styles.settingsLabel}>Text Align</Text>
                            <View style={styles.setTextAlign}>
                                <Pressable 
                                    style={[styles.setAlignButton, {backgroundColor: abSelect1}]}
                                    onPress={() => {
                                        styleParagraphInput(currentIndex, "textAlign", "left")
                                        styleParagraphInput(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
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
                                        styleParagraphInput(currentIndex, "textAlign", "center")
                                        styleParagraphInput(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
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
                                        styleParagraphInput(currentIndex, "textAlign", "right")
                                        styleParagraphInput(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
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
                                        styleParagraphInput(currentIndex, "fontSize", 17)
                                        styleParagraphInput(currentIndex, "fontButtons", "#ff6905,#454C69,#454C69")
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
                                        styleParagraphInput(currentIndex, "fontSize", 20)
                                        styleParagraphInput(currentIndex, "fontButtons", "#454C69,#ff6905,#454C69")
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
                                        styleParagraphInput(currentIndex, "fontSize", 14)
                                        styleParagraphInput(currentIndex, "fontButtons", "#454C69,#454C69,#ff6905")
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
                                        styleParagraphInput(currentIndex, "fontColor", color)
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
                    isVisible={imageInputSettings}
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
                                    setImageInputSettings(false);
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
                                                styleImageInput(currentIndex, "width", Number(text))
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
                                                styleImageInput(currentIndex, "height", Number(text))
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
                                        styleImageInput(currentIndex, "imageAlign", "flex-start")
                                        styleImageInput(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
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
                                        styleImageInput(currentIndex, "imageAlign", "center")
                                        styleImageInput(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
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
                                        styleImageInput(currentIndex, "imageAlign", "flex-end")
                                        styleImageInput(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
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
            {/* IMAGE GALLERY MODAL */}
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={imageGallerySettings}
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
                                    setImageGallerySettings(false);
                                }}
                                color='#ffffff' 
                            />
                        </View>
                        <View style={styles.topDesign}>
                            <Text style={styles.topButtonText}>General</Text>
                        </View>
                        <ScrollView style={styles.settingsContent}>
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
                                                styleGalleryImages(currentIndex, "width", Number(text))
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
                                                styleGalleryImages(currentIndex, "height", Number(text))
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
                                        styleGalleryImages(currentIndex, "imageAlign", "flex-start")
                                        styleGalleryImages(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
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
                                        styleGalleryImages(currentIndex, "imageAlign", "center")
                                        styleGalleryImages(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
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
                                        styleGalleryImages(currentIndex, "imageAlign", "flex-end")
                                        styleGalleryImages(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
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
            {/* UL INPUT SETTINGS MODAL */}    
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={ULInputSettings}
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
                                    setULInputSettings(false);
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
                                        styleULInput(currentIndex, "listAlign", "flex-start")
                                        styleULInput(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
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
                                        styleULInput(currentIndex, "listAlign", "center")
                                        styleULInput(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
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
                                        styleULInput(currentIndex, "listAlign", "flex-end")
                                        styleULInput(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
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
                                        styleULInput(currentIndex, "fontSize", 17)
                                        styleULInput(currentIndex, "fontButtons", "#ff6905,#454C69,#454C69")
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
                                        styleULInput(currentIndex, "fontSize", 20)
                                        styleULInput(currentIndex, "fontButtons", "#454C69,#ff6905,#454C69")
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
                                        styleULInput(currentIndex, "fontSize", 14)
                                        styleULInput(currentIndex, "fontButtons", "#454C69,#454C69,#ff6905")
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
                                        styleULInput(currentIndex, "fontColor", color)
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
            {/* OL INPUT SETTINGS MODAL */}    
                <Modal
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    isVisible={OLInputSettings}
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
                                    setOLInputSettings(false);
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
                                        styleOLInput(currentIndex, "listAlign", "flex-start")
                                        styleOLInput(currentIndex, "alignButtons", "#ff6905,#454C69,#454C69")
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
                                        styleOLInput(currentIndex, "listAlign", "center")
                                        styleOLInput(currentIndex, "alignButtons", "#454C69,#ff6905,#454C69")
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
                                        styleOLInput(currentIndex, "listAlign", "flex-end")
                                        styleOLInput(currentIndex, "alignButtons", "#454C69,#454C69,#ff6905")
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
                                        styleOLInput(currentIndex, "fontSize", 17)
                                        styleOLInput(currentIndex, "fontButtons", "#ff6905,#454C69,#454C69")
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
                                        styleOLInput(currentIndex, "fontSize", 20)
                                        styleOLInput(currentIndex, "fontButtons", "#454C69,#ff6905,#454C69")
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
                                        styleOLInput(currentIndex, "fontSize", 14)
                                        styleOLInput(currentIndex, "fontButtons", "#454C69,#454C69,#ff6905")
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
                                        styleOLInput(currentIndex, "fontColor", color)
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
            {/* DETAILS */}  
                <Modal
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                    isVisible={details}
                    transparent={false}
                    coverScreen={false}
                    hasBackdrop={true}                 
                    backdropColor="rgba(0,0,0,0.5)"
                    style={{margin: 0}}
                    onRequestClose={() => {
                        setDetails(!details)
                    }}
                >
                    <View
                        style={{
                            flex: 1,
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
                                    setDetails(false)
                                }} 
                            />
                            <Text style={{
                                color: '#ffffff',
                                fontWeight: '300',
                                fontSize: 17,
                                textAlign: 'center',
                            }}>Details</Text>
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
                                initialScrollIndex={0}
                                ref={detailsRef}
                                data={report.report.details}
                                keyExtractor={(item) => item.id}
                                getItemLayout={(data, index) => (
                                    {length: 70, offset: 70 * index, index: index}
                                )}
                                renderItem={({item, index}) => {  
                                    var selected;
                                    if (item.id === selectSection) {
                                        selected = true;
                                    } else {
                                        selected = false;
                                    }
                                    if (detailsRef.current != undefined && scrollIndex != -1) {
                                        detailsRef.current.scrollToIndex({animated: true, index: scrollIndex})
                                        scrollIndex = -1
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
                                                <Text 
                                                    style={{
                                                        color: 'white', 
                                                        fontSize: 16,
                                                        width: '70%',
                                                    }}
                                                >{item.title}</Text>
                                                { !selected ? (
                                                    <Ionicons 
                                                        name="chevron-down" 
                                                        size={27} 
                                                        color="white"
                                                        style={{
                                                            position: 'absolute',
                                                            right: 20,
                                                        }} 
                                                        onPress={() => {
                                                            setSelectSection(item.id);
                                                        }}
                                                    />
                                                ) : 
                                                    <Ionicons 
                                                        name="chevron-up" 
                                                        size={27} 
                                                        color="white"
                                                        style={{
                                                            position: 'absolute',
                                                            right: 20,
                                                        }} 
                                                        onPress={() => {
                                                            setSelectSection();
                                                        }}
                                                    />
                                                }
                                            </View>
                                            { selected ? (
                                                <View 
                                                    style={{
                                                        marginHorizontal: 20,
                                                        paddingTop: 15,
                                                        paddingBottom: 20
                                                    }}
                                                >
                                                    <FlatList
                                                        data={item.details}
                                                        keyExtractor={(item) => item.id} 
                                                        renderItem={({item: item2, index: index2}) => {
                                                            var dOption, cOption, dOpen;
                                                            switch (item2.type) {
                                                                case 'dropdown':
                                                                    dOpen = item2.open;
                                                                    detail = 
                                                                        <View style={styles.dsection}>
                                                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                                                <Text style={styles.sectionLabel}>{item2.label}</Text>
                                                                            </View>
                                                                            <View style={{alignItems: 'center', paddingBottom: 15}}>
                                                                                <View
                                                                                    style={{
                                                                                        marginTop: 20,
                                                                                        borderColor: '#282C3A',
                                                                                        backgroundColor: '#282C3A',
                                                                                        height: 45,
                                                                                        width: '95%',
                                                                                        borderRadius: 7,
                                                                                        paddingVertical: 13,
                                                                                        paddingHorizontal: 20
                                                                                    }}
                                                                                >
                                                                                    <Text style={{color: '#D0D8E6'}}>{item2.selected}</Text>
                                                                                    { !dOpen ? (
                                                                                        <Ionicons 
                                                                                            name="chevron-down" 
                                                                                            size={23} 
                                                                                            color="rgba(255,255,255,0.5)"
                                                                                            style={{
                                                                                                position: 'absolute',
                                                                                                right: 20,
                                                                                                top: 10
                                                                                            }} 
                                                                                            onPress={() => {
                                                                                                openDropdown(index, index2, dOpen)
                                                                                            }}
                                                                                        />
                                                                                    ) : 
                                                                                        <Ionicons 
                                                                                            name="chevron-up" 
                                                                                            size={23} 
                                                                                            color="rgba(255,255,255,0.5)"
                                                                                            style={{
                                                                                                position: 'absolute',
                                                                                                right: 20,
                                                                                                top: 10
                                                                                            }} 
                                                                                            onPress={() => {
                                                                                                openDropdown(index, index2, dOpen)
                                                                                            }}
                                                                                        />        
                                                                                    }
                                                                                </View>
                                                                                { dOpen ? (
                                                                                    <View style={{alignItems: 'center', zIndex: 90000, elevation: 1000, width: '95%'}}>
                                                                                        <FlatList
                                                                                            style={{
                                                                                                width: '100%',
                                                                                                backgroundColor: '#2C303F',
                                                                                                borderWidth: 1,
                                                                                                paddingVertical: 5,
                                                                                                borderColor: 'black',
                                                                                                borderBottomRightRadius: 5,
                                                                                                borderBottomLeftRadius: 5,
                                                                                                elevation: 1000,
                                                                                                zIndex: 90000
                                                                                            }}
                                                                                            contentContainerStyle={{
                                                                                                paddingVertical: 10
                                                                                            }}
                                                                                            data={item2.options}
                                                                                            keyExtractor={(item) => item.id} 
                                                                                            renderItem={({item: item3, index: index3}) => {
                                                                                                return(
                                                                                                    <TouchableOpacity 
                                                                                                        style={{
                                                                                                            height: 38,
                                                                                                            paddingHorizontal: 17,
                                                                                                            borderRadius: 5,
                                                                                                            flexDirection: 'row',
                                                                                                            alignItems: 'center'
                                                                                                        }}
                                                                                                        onPress={() => {
                                                                                                            selectDropdownItem(index, index2, item3.value)
                                                                                                            openDropdown(index, index2, dOpen)
                                                                                                        }}
                                                                                                    >
                                                                                                        <Text style={{color:'white', fontSize: 14, paddingRight: 20}}>{item3.value}</Text>
                                                                                                    </TouchableOpacity>
                                                                                                )
                                                                                            }}
                                                                                        />
                                                                                    </View>
                                                                                ) : null }
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
                                                                                <Text style={styles.sectionLabel}>{item2.label}</Text>
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
                                                                                    multiline={true}
                                                                                    numberOfLines={4}
                                                                                    onChangeText={(text) => {
                                                                                        changeText(index, index2, text)
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
                                                                                <Text style={styles.sectionLabel}>{item2.label}</Text>
                                                                            </View>
                                                                            <View style={{alignItems: 'center'}}>
                                                                                <FlatList
                                                                                    style={{
                                                                                        marginTop: 15,
                                                                                        width: '95%'
                                                                                    }}
                                                                                    data={item2.options}
                                                                                    keyExtractor={(item) => item.id} 
                                                                                    renderItem={({item: item3, index: index3}) => {
                                                                                        return(
                                                                                            <View 
                                                                                                style={{
                                                                                                    paddingVertical: 1,
                                                                                                    paddingHorizontal: 15,
                                                                                                    borderRadius: 5,
                                                                                                    flexDirection: 'row',
                                                                                                    alignItems: 'center'
                                                                                                }}
                                                                                            >
                                                                                                { Platform.OS == 'ios' ? ( <View style={{
                                                                                                    borderRadius: 3,
                                                                                                    backgroundColor: 'rgba(208,219,229,0.2)',
                                                                                                    width: 26,
                                                                                                    height: 26,
                                                                                                    position: 'absolute',
                                                                                                    zIndex: -1,
                                                                                                    left: 20
                                                                                                }}></View> ) : null }
                                                                                                <Checkbox
                                                                                                    status={item3.checked}
                                                                                                    uncheckedColor="rgba(208,219,229,0.2)"
                                                                                                    color="#ff6905"
                                                                                                    onPress={() => {
                                                                                                        checkBox(index, index2, index3, item3.checked)
                                                                                                    }}
                                                                                                />
                                                                                                <Text style={{color:'white', fontSize: 16, paddingLeft: 10}}>{item3.value}</Text>
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
            {/* ALL IMAGES */}  
                <Modal
                    animationIn="slideInLeft"
                    animationOut="slideOutLeft"
                    isVisible={allImages}
                    transparent={false}
                    coverScreen={false}
                    hasBackdrop={true}                 
                    backdropColor="rgba(0,0,0,0.5)"
                    style={{margin: 0}}
                    onRequestClose={() => {
                        setAllImages(!allImages)
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
                                    setAllImages(false)
                                    for (var i = 0; i < report.images.length; i++) {
                                        selectImage(true, i)
                                    }
                                    setSelImages([])
                                }} 
                            />
                            <Text style={{
                                color: '#ffffff',
                                fontWeight: '300',
                                fontSize: 17,
                                textAlign: 'center',
                            }}>Images</Text>
                        </View>
                        <View
                            style={{
                                marginTop: Platform.OS === 'ios' ? 100 : 80,
                                alignItems: 'center'
                            }}
                        >
                            <View 
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginBottom: 20
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setMultImagePicker(true)
                                    }}
                                    style={{
                                        backgroundColor: "#141824",
                                        paddingVertical: 7,
                                        borderRadius: 7,
                                        paddingHorizontal: 20,
                                        width: 160,
                                        marginRight: 15,
                                        borderColor: 'white',
                                        borderWidth:1
                                    }}
                                >
                                    <Text 
                                        style={{
                                            color: 'white', 
                                            fontSize: 14,
                                            textAlign: 'center',
                                        }}
                                    >Add Images</Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
                                <Text style={{color: 'white', fontSize: 13}}>{selImages.length} Images Selected</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        var newImages = report.images;
                                        for(var k = 0; k < selImages.length; k++) {
                                            newImages = newImages.filter((im) => im.id != selImages[k].id)
                                        }
                                        removeImages(newImages) 
                                        setSelImages([])
                                    }}
                                    style={{
                                        backgroundColor: '#141824',
                                        paddingVertical: 8,
                                        borderRadius: 7,
                                        paddingHorizontal: 20,
                                        width: 160,
                                        borderColor: 'white',
                                        borderWidth:1,
                                    }}
                                >
                                    <Text 
                                        style={{
                                            color: 'white', 
                                            fontSize: 14,
                                            textAlign: 'center',
                                        }}
                                    >Remove Images</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center', marginTop: 20, height: tHeight}}>
                                <View style={{
                                    backgroundColor: '#141824',
                                    paddingVertical: 8,
                                    borderRadius: 7,
                                    paddingHorizontal: 20,
                                    width: 250,
                                    borderColor: 'white',
                                    borderWidth:1,
                                    justifyContent: 'center'
                                }}>
                                    <Text 
                                        style={{
                                            color: 'white', 
                                            fontSize: 14,
                                            textAlign: 'center',
                                        }}
                                    >Add to Section</Text>
                                    { !tempSelected ? (
                                        <Ionicons 
                                            name="chevron-down" 
                                            size={25} 
                                            color="white"
                                            style={{
                                                position: 'absolute',
                                                right: 15,
                                            }} 
                                            onPress={() => {
                                                setTempSelect(true);
                                                setTHeight(250);
                                            }}
                                        />
                                    ) : 
                                        <Ionicons 
                                            name="chevron-up" 
                                            size={25} 
                                            color="white"
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
                                                width: 250,
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
                                            data={report.report.sections}
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
                                                            var count = 0;
                                                            var order = 0;
                                                            for(var i = 0; i < field_list.length; i++) {
                                                                count++;
                                                                if (item.id == field_list[i].id && selImages.length > 0) {
                                                                    // check for consecutive galleries already in the section
                                                                    for (var k = i; field_list.length - count; k++) {
                                                                        if (field_list[k+1].field == 'gallery') {
                                                                            count++;
                                                                            order++;
                                                                        } else {
                                                                            break;
                                                                        }
                                                                    }
                                                                    
                                                                    var newList = field_list;
                                                                    var newId = new Date();
                                                                    var newId = newId.getTime();
                                                                    var obj = {
                                                                        id: newId,
                                                                        field: "gallery",
                                                                        section: field_list[i].header,
                                                                        order: order,
                                                                        text: galtext,
                                                                        style: [
                                                                            {
                                                                                styleType: "alignButtons",
                                                                                style: "#ff6905, #454C69,#454C69", 
                                                                            },
                                                                            {
                                                                                styleType: "imageAlign",
                                                                                style: "center"
                                                                            },
                                                                            {
                                                                                styleType: "width",
                                                                                style: 100
                                                                            },
                                                                            {
                                                                                styleType: "height",
                                                                                style: 100
                                                                            }
                                                                        ],
                                                                        images: selImages
                                                                    }
                                                                    newList.splice(count, 0, obj)
                                                                    addGallery(newList)
                                                                }
                                                            }
                                                            count = 0;
                                                            for (var i = 0; i < report.images.length; i++) {
                                                                selectImage(true, i)
                                                            }
                                                            setSelImages([])
                                                            setGaltext('')
                                                        }}
                                                    >
                                                        <Text style={{color: '#D0D8E3'}}>{item.section}</Text>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                        />
                                    </View>
                                ) : null }
                            </View>
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={[styles.sectionLabel, {fontSize: 15}]}>Comments</Text>
                                </View>
                                <View style={{alignItems: 'center', paddingBottom: 15}}>
                                    <TextInput
                                        style={{
                                            marginTop: 15,
                                            height: 60,
                                            width: '95%',
                                            maxWidth: windowWidth - 70,
                                            padding: 10,
                                            backgroundColor: '#fff',  
                                            borderRadius: 5,
                                            borderWidth: 1,
                                            borderColor: 'rgba(208,219,229,0.2)',
                                            alignItems:'flex-start',
                                            justifyContent: 'flex-start'
                                        }}
                                        multiline={true}
                                        value={galtext}
                                        numberOfLines={4}
                                        onChangeText={(text) => {
                                            setGaltext(text)
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                            <Text style={{color: 'white',fontSize: 15, paddingBottom: 15, marginRight: 15}}>Letter Entries?</Text>
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
                                    status={letGal}
                                    color="#ff6905"
                                    uncheckedColor="#383F4D"
                                    onPress={() => {
                                        if (letGal == "checked")  {
                                            letGal = "unchecked"
                                        } else {
                                            letGal = "checked"
                                        }
                                        changeGlobal(2, letGal)
                                    }}
                                />
                            </View>
                        </View>
                        <FlatList
                            contentContainerStyle={{
                                paddingBottom: '70%',
                                alignItems: 'center',
                                paddingTop: 0
                            }}
                            data={report.images}
                            numColumns={3}
                            keyExtractor={(item) => item.id} 
                            renderItem={({item, index}) => { 
                                var sImages = selImages;
                                return ( 
                                    <Pressable
                                        onPress={() => {
                                            if (item.selected) {
                                                sImages = sImages.filter((test) => test.id != item.id)
                                            } else {
                                                sImages.push(item)
                                            } 
                                            setSelImages(sImages)
                                            selectImage(item.selected, index)
                                        }}
                                        style={{
                                            borderColor: item.selected ? "#ff6905" : "#141824",
                                            borderWidth: 1
                                        }}
                                    >
                                        <ImageBackground
                                            style={{ 
                                                width: 100, 
                                                height: 100, 
                                                margin: 4
                                            }}
                                            source={{ uri: item.uri }}
                                        />
                                    </Pressable>
                                )
                            }}
                        />                        
                        <View style={{ flex: 1 }} /> 
                    </View>
                </Modal>
            {/* MULTIPLE IMAGE PICKER MODAL */}
                <Modal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    isVisible={multImagePicker}
                    transparent={true}
                    hasBackdrop={true}
                    coverScreen={false}            
                    customBackdrop={
                        <View style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0)', 
                            marginLeft: -20
                            }} 
                        />
                    }
                    style={{margin: 0}}
                >     
                    <View style={{
                        backgroundColor: '#141824',
                        width: '100%',
                        height: '100%',
                        marginTop: 40
                    }}>
                        <View style={{height: 40, marginTop: 20, marginBottom: 60, paddingLeft: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setMultImagePicker(false);
                                }}
                                style={{
                                    flexDirection: 'row', 
                                    alignItems: 'center', 
                                    marginTop: Platform.OS === 'ios' ? 20 : 0
                                }}
                            >
                                <Ionicons name="arrow-back-outline" size={23} color="#ff6905" />
                                <Text style={{paddingLeft: 5, fontSize: 17, color: '#ff6905'}}>Back</Text>
                            </TouchableOpacity>
                            <View style={{alignItems: 'center'}}>
                                {galleryHeader}
                            </View>
                        </View>
                        <ImageBrowser
                            max={20}
                            onChange={updateHandler}
                            callback={imagesCallback}
                            renderSelectedComponent={renderSelectedComponent}
                            emptyStayComponent={emptyStayComponent}
                        />
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
            <FlatList
                initialScrollIndex={0}
                ref={flatlistRef}
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
                        case 'headerinput':

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
                                        <View style={styles.inputContainer}>
                                            <View style={(item.header == "Header") ? [styles.input, { paddingTop: 0 }] : null}>
                                                <TextInput 
                                                    style={{
                                                        textAlign: item.style[2].style,
                                                        fontSize: item.style[3].style,
                                                        color: (item.header == "Header") ? "#aaa" : textColor,
                                                        fontFamily: globalStyle[0].style
                                                    }}
                                                    defaultValue="Header"
                                                    value={item.header}
                                                    multiline={true}
                                                    onChangeText={(text) => {
                                                        changeHeaderInput(index, "header", text)
                                                    }}
                                                />
                                            </View>
                                            { item.showSubHeader == "checked" ? (
                                                <View style={(item.subheader == "Subheader") ? [styles.input, { marginTop: 10, paddingVertical: 5 }] : null}>
                                                    <TextInput 
                                                        style={[
                                                            styles.subheader, 
                                                            {
                                                                color: (item.subheader == "Subheader") ? "#aaa" : textColor,
                                                                textAlign: item.style[2].style,
                                                                fontFamily: globalStyle[0].style
                                                            }
                                                        ]}
                                                        defaultValue="Header"
                                                        multiline={true}
                                                        value={item.subheader}
                                                        onChangeText={(text) => {
                                                            changeHeaderInput(index, "subheader", text)
                                                        }}
                                                    />
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
                        case 'paragraphinput':

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
                                        <View style={(item.paragraph == "Paragraph") ? [styles.input, { marginTop: 10, paddingVertical: 5 }] : null}>
                                            <TextInput 
                                                style={{
                                                    textAlign: item.style[2].style,
                                                    fontSize: item.style[3].style,
                                                    color: (item.paragraph == "Paragraph") ? "#aaa" : textColor,
                                                    fontFamily: globalStyle[0].style
                                                }}
                                                defaultValue="Paragraph"
                                                multiline={true}
                                                value={item.paragraph}
                                                onChangeText={(text) => {
                                                    changeParagraphInput(index, "paragraph", text)
                                                }}
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
                                                <Pressable 
                                                    onPress={() => {
                                                        setParagraphInputSettings(true)
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
                                            // Align Buttons
                                            abSelect1 = field_list[index].style[0].style.slice(0,7);
                                            abSelect2 = field_list[index].style[0].style.slice(8,15);
                                            abSelect3 = field_list[index].style[0].style.slice(16,23);

                                            

                                            (async () => {
                                                if (Platform.OS !== 'web') {
                                                    const { status } = await ImageUpload.requestMediaLibraryPermissionsAsync();
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
                                                <Pressable 
                                                    onPress={() => {
                                                        setImageInputSettings(true)
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
                        case 'gallery':
                            var letter = '';
                            switch(item.order) {
                                case 0: 
                                    letter = 'A';
                                    break;
                                case 1: 
                                    letter = 'B';
                                    break;
                                case 2: 
                                    letter = 'C';
                                    break;
                                case 3: 
                                    letter = 'D';
                                    break;
                                case 4: 
                                    letter = 'E';
                                    break;
                                case 5: 
                                    letter = 'F';
                                    break;
                                case 6: 
                                    letter = 'G';
                                    break;
                                case 7: 
                                    letter = 'H';
                                    break;
                                case 8: 
                                    letter = 'I';
                                    break;
                                case 9: 
                                    letter = 'J';
                                    break;
                                case 10: 
                                    letter = 'K';
                                    break;
                                case 11: 
                                    letter = 'L';
                                    break;
                                case 12: 
                                    letter = 'M';
                                    break;
                                case 13: 
                                    letter = 'N';
                                    break;
                                case 14: 
                                    letter = 'O';
                                    break;
                                case 15: 
                                    letter = 'P';
                                    break;
                                case 16: 
                                    letter = 'Q';
                                    break;
                                case 17: 
                                    letter = 'R';
                                    break;
                                case 18: 
                                    letter = 'S';
                                    break;
                                case 19: 
                                    letter = 'T';
                                    break;
                                case 20: 
                                    letter = 'U';
                                    break;
                                case 21: 
                                    letter = 'V';
                                    break;
                                case 22: 
                                    letter = 'W';
                                    break;
                                case 23: 
                                    letter = 'X';
                                    break;
                                case 24: 
                                    letter = 'Y';
                                    break;
                                case 25: 
                                    letter = 'Z';
                                    break;
                                default:
                                    break;
                            }            
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
                                        <View style={{flexDirection: 'row'}}>
                                            {globalStyle[2].letterGal == 'checked' ? (
                                                <Text
                                                    style={{
                                                        color: textColor,
                                                        fontSize: 17,
                                                        marginBottom: 5,
                                                        fontFamily: globalStyle[0].style
                                                    }}
                                                >{letter}.</Text>
                                            ) : null }
                                            <Text
                                                style={{
                                                    color: textColor,
                                                    fontSize: 17,
                                                    marginBottom: 5,
                                                    fontFamily: globalStyle[0].style
                                                }}
                                            > {item.text}</Text>
                                        </View>
                                        <FlatList
                                            style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: item.style[1].style}}
                                            data={item.images}
                                            keyExtractor={(item) => item.id}    
                                            renderItem={({item: item2, index: index2}) => { 
                                                return (
                                                    <ImageBackground
                                                        style={{ 
                                                            width: item.style[2].style, 
                                                            height: item.style[3].style, 
                                                            margin: 4
                                                        }}
                                                        source={{ uri: item2.uri }}
                                                    />
                                                )
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
                                                { index !== 0 && field_list[index-1].field !== 'header'? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            var field1 = field_list[index]
                                                            var field2 = field_list[index-1]
                                                            var temp = field1.order;
                                                            field1.order = field2.order;
                                                            field2.order = temp;
                                                            swapFields(index, index-1, field1, field2)
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
                                                { index !== field_list.length-1 && field_list[index+1].field == 'gallery' ? (
                                                    <Pressable 
                                                        onPress={() => {
                                                            var field1 = field_list[index]
                                                            var field2 = field_list[index+1]
                                                            var temp = field1.order;
                                                            field1.order = field2.order;
                                                            field2.order = temp;
                                                            swapFields(index, index+1, field1, field2)
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
                                                        setImageGallerySettings(true)
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
                        case 'ulinput':

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
                                                                changeULItemInput(index, ulindex, text)
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
                                                                        deleteListItemInput(index, ulindex)
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
                                                        addULItemInput(index, "")
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
                                                <Pressable 
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
                        case 'olinput':

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
                                                                changeOLItemInput(index, ulindex, text)
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
                                                                        deleteListItemInput(index, ulindex)
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
                                                        addOLItemInput(index, "")
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
                                                <Pressable 
                                                    onPress={() => {
                                                        setOLInputSettings(true)
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
                        case 'detailsection':
                        
                            element = 
                                <View onLayout={(event) => {
                                    const {x, y, height, width} = event.nativeEvent.layout; 
                                    //fillHeight(index, height)
                                }}>
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
                                        <FlatList
                                            data={report.report.details}
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
                                                                                        <Text style={{fontWeight: 'bold'}}>{item2.label}: </Text>
                                                                                        <Text>{item2.selected}</Text>
                                                                                    </View>
                                                                                break;
                                                                            case 'text':
                                                                                detail = 
                                                                                    <View style={{flexDirection: 'column', paddingBottom: 15}}>
                                                                                        <Text style={{fontWeight: 'bold', paddingBottom: 3}}>{item2.label}</Text>
                                                                                        <Text>{item2.value}</Text>
                                                                                    </View>
                                                                                break;
                                                                            case 'checkboxes':
                                                                                detail = 
                                                                                    <View style={{flexDirection: 'column', paddingBottom: 8}}>
                                                                                        <Text style={{fontWeight: 'bold'}}>{item2.label}: </Text>
                                                                                        <FlatList
                                                                                            style={{marginLeft: 20, marginTop: 8}}
                                                                                            data={item2.options}
                                                                                            keyExtractor={(item) => item.id} 
                                                                                            renderItem={({item: item3, index: index3}) => {
                                                                                                var check = item3.checked;

                                                                                                return (
                                                                                                    <View style={{marginBottom: 3}}>
                                                                                                        { check == "checked" ? (
                                                                                                            <Text>- {item3.value}</Text>
                                                                                                        ) : null }
                                                                                                    </View>
                                                                                                )
                                                                                            }}
                                                                                        />
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
                                            {/* DELETE BUTTON */}
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
                                                <Pressable 
                                                    onPress={() => {
                                                        setDetails(true)
                                                        for(var i = 0; i < detail_list.length; i++) {
                                                            if (item.detailid == detail_list[i].id) {
                                                                scrollIndex = i
                                                            }
                                                        }
                                                    }}
                                                    style={styles.elementButton}
                                                >
                                                    <Feather
                                                        name="external-link"
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
            <DownloadReport report={report} />
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
});

const mapStateToProps = (state, ownProps) => {
    return {
        field_list: state.report.report.field_list,
        globalStyle: state.report.report.globalStyle,
        report: state.report,
        reportID: state.reportList.currentId,
        templateList: state.templateList,
        clientContract: state.clientContract,
        user: state.user.user,
        detail_list: state.report.report.details
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
    addGalleryInput,
    updateTemplate,
    resetReport,
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
    changeTemplateId,
    openDropdown,
    selectDropdownItem,
    changeText,
    checkBox,
    updateReport,
    changeHeaderInput,
    styleHeaderInput,
    styleParagraphInput,
    changeParagraphInput,
    changeImageInput,
    styleImageInput,
    addULItemInput,
    deleteListItemInput,
    changeULItemInput,
    styleULInput,
    addOLItemInput,
    changeOLItemInput,
    styleOLInput,
    addGalleryImages,
    styleGalleryImages,
    changeComplete,
    fillHeight,
    addPagebreak,
    stylePagebreak,
    changeMainField,
    getUserReports,
    addImages,
    selectImage,
    removeImages,
    addGallery,
    changeGlobal
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReportEditorScreen);