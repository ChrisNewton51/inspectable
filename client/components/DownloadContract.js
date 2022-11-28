import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Platform,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
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
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import { connect, useDispatch, useSelector } from 'react-redux';

var base64 = [];
var height = 0;
var imageURIs = [];

const DownloadContract = ({contract}) => {
    
    const fieldList = contract.field_list;
    const globalStyle = contract.globalStyle;

    var body = ``;
    var field;

    function wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    function checkFont(fontStyle) {
        var font;
        switch(fontStyle) {
            case 'roboto':
                font = "Roboto";
                break;
            case 'sfprodisplay':
                font = "Source Sans Pro";
                break;
            case 'merriweather':
                font = "Merriweather";
                break;
            case 'opensans':
                font = "Open Sans";
                break;
            case 'poppins':
                font = "Poppins";
                break;
            case 'raleway':
                font = "Raleway";
                break;
            case 'futura':
                font = "Nunito";
                break;
            case 'oswald':
                font = "Oswald";
                break;
            default: 
                break;
        }
        return font;
    }

    async function getImageToBase64(imageArr) {
        let image;
        for (var im = 0; im < imageArr.length; im++) {
            if (imageArr[im] == 0) {
                base64[im] = 0;
            } else { 
                const resizedPhoto = await ImageManipulator.manipulateAsync(
                    imageArr[im].uri,
                    [{ resize: { width: imageArr[im].width } }],  
                    { compress: 0.5, format: 'jpeg' },
                );
                image = await FileSystem.readAsStringAsync(resizedPhoto.uri, {
                    encoding: 'base64',
                })
                base64[im] = image;
            }
        }
        imageURIs = []
        return image;
    }
    getImageToBase64(imageURIs)

    if (base64.length == imageURIs.length+1) {
        base64 = []
    }

    // Current state of contract to HTML for download
    for(var i = 0; i < fieldList.length; i++) {
        field = fieldList[i];
        var cFont = checkFont(globalStyle[0].style);
        
        if (imageURIs.length < fieldList.length) {
            if (field.field == "image" && field.uri !== "") {
                imageURIs.push({uri:field.uri, width:field.style[2].style})
            } else {
                imageURIs.push(0);
            }
        }

        switch(fieldList[i].field) {
            case 'header':
                body = body + `<h1 style="
                                text-align: ${field.style[2].style};
                                font-family: ${cFont};
                                font-size: ${field.style[3].style}px;
                                font-color: ${field.style[4].style};
                                margin-bottom: 0;
                                ">${field.header}</h1>`;

                if (field.showSubHeader == "checked") {
                    body = body + `<p style="
                                    text-align: ${field.style[2].style};
                                    font-family: ${cFont};
                                    font-color: ${field.style[4].style};
                                    margin-top: 5px;
                                    ">${field.subheader}</p>`;
                }
                body = body + `<div style="margin-bottom: 15px"></div>`;

                break;
            case 'paragraph':
                body = body + `<p style="
                                text-align: ${field.style[2].style};
                                font-family: ${cFont};
                                font-size: ${field.style[3].style}px;
                                font-color: ${field.style[4].style};
                                ">${field.paragraph}</p>`;
                break;
            case 'image':
                body = body + `<div style="break-inside: avoid;display: flex; justify-content: ${field.style[1].style}">
                                    <img
                                    width="${field.style[2].style}"
                                    height="${field.style[3].style}"
                                    src="data:image/jpg;base64, ${base64[i]}" />
                                </div>
                                `;
                break;
            case 'ul':
                var ulString = `<ul style="display: flex; break-inside:avoid; flex-direction: column; align-items: ${field.style[2].style}">`;
                for(var j = 0; j < field.list.length; j++) {
                    ulString = ulString + `<li style="
                                                font-size:${field.style[3]}px; 
                                                color:${field.style[4].style};
                                                font-family: ${cFont};"
                                            >${field.list[j].value}</li>`;
                }
                ulString = ulString + `</ul>`;
                body = body + ulString; 

                break;
            case 'ol':
                var olString = `<ol style="display: flex; break-inside:avoid; flex-direction: column; align-items: ${field.style[2].style}">`;
                for(var k = 0; k < field.list.length; k++) {
                    olString = olString + `<li style="
                                                font-size:${field.style[3]}px; 
                                                color:${field.style[4].style};
                                                font-family: ${cFont};"
                                            >${field.list[k].value}</li>`;
                }
                olString = olString + `</ol>`;
                body = body + olString; 
                break;
            case 'spacer':
                body = body + `<div style="height: ${field.style[0].style}px"></div>`;
                break;
            case 'pagebreak':
                body = body + `<div style="height: ${field.style[0].style}px"></div>`;
                break;
            case 'separator':
                body = body + `<div style="
                                        display: block;
                                        height: ${field.style[0].style};
                                        background-color: ${field.style[1].style};
                                    "></div>`;
                break;
            case 'name':
                body = body + `<h2 style="
                                    font-family: ${cFont};
                                    font-size: 1.2rem;
                                    margin-bottom: 0px;
                                    margin-top: 1.7rem;
                                    text-align: ${field.style[2].style};
                                ">Name</h2>
                                <div style="
                                        display: flex;
                                        font-family: ${cFont};
                                        flex-direction: row;
                                        margin-top: 10px;
                                    ">
                                    <p style="margin-top:0;margin-right: 10px">${field.firstName}</p>    
                                    <p style="margin-top:0;">${field.lastName}</p>
                                </div>`;
                break;
            case 'email':
                    body = body + `<h2 style="
                                        font-family: ${cFont};
                                        font-size: 1.2rem;
                                        margin-bottom: 0px;
                                        margin-top: 1.7rem;
                                        text-align: ${field.style[2].style};
                                    ">Email</h2>
                                    <p style="margin-top: 10px;font-family: ${cFont};">${field.email}</p>`;
                    break;
            case 'phone':
                body = body + `<h2 style="
                                    font-family: ${cFont};
                                    font-size: 1.2rem;
                                    margin-bottom: 0px;
                                    margin-top: 1.7rem;
                                    text-align: ${field.style[2].style};
                                ">Phone Number</h2>
                                <p style="margin-top: 10px;font-family: ${cFont};">${field.phone}</p>`;
                break;
            case 'address':
                body = body + `<h2 style="
                                    font-family: ${cFont};
                                    font-size: 1.2rem;
                                    margin-bottom: 10px;
                                    margin-top: 1.7rem;
                                    text-align: ${field.style[2].style};
                                ">Address</h2>
                                <div style="
                                        display: flex;
                                        font-family: ${cFont};
                                        flex-direction: column;
                                    ">
                                    <p style="margin:0 0 5px 0">${field.streetAddress}</p>    
                                    <p style="margin:0 0 5px 0">${field.city}</p>
                                    <p style="margin:0 0 5px 0">${field.state1}</p>
                                </div>`;
                break;
            case 'date':
                body = body + `<h2 style="
                                    font-family: ${cFont};
                                    font-size: 1.2rem;
                                    margin-bottom: 0px;
                                    margin-top: 1.7rem;
                                    text-align: ${field.style[2].style};
                                ">Date</h2>
                                <p style="margin-top: 10px;font-family: ${cFont};">${field.date}</p>`;
                break;
            case 'price':
                body = body + `<h2 style="
                                    font-family: ${cFont};
                                    font-size: 1.2rem;
                                    margin-bottom: 0px;
                                    margin-top: 1.7rem;
                                    text-align: ${field.style[2].style};
                                ">Price</h2>
                                <p style="margin-top: 10px;font-family: ${cFont};">$${field.price}</p>`;
                break;
            case 'signature':
                body = body + `<h2 style="
                                    font-family: ${cFont};
                                    font-size: 1.2rem;
                                    margin-bottom: 0px;
                                    margin-top: 1.7rem;
                                    text-align: ${field.style[2].style};
                                ">Signature</h2>
                                <p style="margin-top: 10px;font-family: ${cFont};">Signing your full name below constitutes a legally binding signature.</p>
                                <div style="
                                        border-top: 1px solid #000; 
                                        width: 60%;
                                        margin-top: 2.5rem;
                                    ">
                                    <p style="
                                            font-family: ${cFont};
                                            margin-top: 4px;
                                            font-size: 0.9rem;
                                        ">Full Name</p>
                                </div>
                                <div style="
                                        border-top: 1px solid #000; 
                                        width: 30%;
                                        margin-top: 2.5rem;
                                    ">
                                    <p style="
                                            font-family: ${cFont};
                                            margin-top: 4px;
                                            font-size: 0.9rem;
                                        ">Date</p>
                                </div>`;
                break;
            default:
                break;
        }

    }
    
    var bodyMargin;
    if (Platform.OS == 'ios') {
        bodyMargin = "margin: 0.6in";
    } else {
        bodyMargin = "margin:0";
    }

    const html = `
    <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Merriweather&family=Nunito&family=Open+Sans&family=Oswald:wght@300&family=Poppins&family=Raleway&family=Roboto&family=Source+Sans+Pro&display=swap" rel="stylesheet"> 
        </head>
        <body class="body" style="display:block;${bodyMargin};background-color: ${globalStyle[1].style}">
            <style>
                @page {
                    margin: 80px;
                }
            </style>
            ${body}
        </body>
    </html>
    `;

    const print = async () => {
        await Print.printAsync({
            html
        });
    }
    
    const printToFile = async () => {
        const { uri } = await Print.printToFileAsync({
            html,
            margins: {
                left: 20,
                top: 50,
                right: 20,
                bottom: 100
            }
        });
        await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
 
    return (
        <View style={styles.container}>
            {(base64 !== undefined) && (base64.length == imageURIs.length) ? (
                <View>
                    <TouchableOpacity 
                        onPress={print}
                        style={[styles.float, {bottom: 75}]}
                    >
                        <Feather style={styles.floatIcon} name="printer" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={printToFile}
                        style={styles.float}
                    >
                        <FontAwesome style={styles.floatIcon} name="share-square-o" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ) : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
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
    floatIcon: {
        marginRight: 0
    },
})

const mapStateToProps = (state, ownProps) => {
    return {
        contract: state.clientContract.clientContract,
    }
}
const mapDispatchToProps = { 
    
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadContract);