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

const DownloadReport = ({report}) => {
    const fieldList = report.field_list;
    const globalStyle = report.globalStyle;
    const details = report.details;

    var body = ``;
    var field;

    const [isLoading, setIsLoading] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = React.useState();

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
            } else if (Array.isArray(imageArr[im])) {
                var baseGal = [];
                for(var gl = 1; gl < imageArr[im].length; gl++) {
                    const resizedPhoto = await ImageManipulator.manipulateAsync(
                        imageArr[im][gl],
                        [{ resize: { width: imageArr[im][0] } }],  
                        { compress: 0.5, format: 'jpeg' },
                    );
                    image = await FileSystem.readAsStringAsync(resizedPhoto.uri, {
                        encoding: 'base64',
                    })
                    baseGal[gl-1] = image;
                }
                base64[im] = baseGal;
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
    
    var galImages;
    // Current state of report to HTML for download
    for(var i = 0; i < fieldList.length; i++) {
        field = fieldList[i];
        var cFont = checkFont(globalStyle[0].style);
        
        if (imageURIs.length < fieldList.length) {
            if (field.field == "gallery" && field.images.length !== 0) {
                var galWidth = field.style[2].style;
                var gallery = [galWidth];
                for (var g = 0; g < field.images.length; g++) {
                    gallery.push(field.images[g].uri)
                }
                imageURIs.push(gallery)
            } else if ((field.field == "image" || field.field == "imageinput") && field.uri !== "") {
                imageURIs.push({uri:field.uri, width:field.style[2].style})
            } else {
                imageURIs.push(0);
            }
        }

        switch(fieldList[i].field) {
            case 'header':
                height = height + field.height;
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
                height = height + field.height;
                body = body + `<p style="
                                text-align: ${field.style[2].style};
                                font-family: ${cFont};
                                font-size: ${field.style[3].style}px;
                                font-color: ${field.style[4].style};
                                ">${field.paragraph}</p>`;
                break;
            case 'image':
                height = height + field.height;
                body = body + `<div style="break-inside: avoid;display: flex; justify-content: ${field.style[1].style}">
                                    <img
                                    width="${field.style[2].style}"
                                    height="${field.style[3].style}"
                                    src="data:image/jpg;base64, ${base64[i]}" />
                                </div>
                                `;
                break;
            case 'ul':
                height = height + field.height;
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
                height = height + field.height;
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
                height = height + field.height;
                body = body + `<div style="height: ${field.style[0].style}px"></div>`;
                break;
            case 'pagebreak':
                height = height + field.height;
                body = body + `<div style="height: ${field.style[0].style}px"></div>`;
                break;
            case 'separator':
                height = height + field.height;
                body = body + `<div style="
                                        display: block;
                                        height: ${field.style[0].style};
                                        background-color: ${field.style[1].style};
                                    "></div>`;
                break;
            case 'headerinput':
                height = height + field.height;
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
            case 'paragraphinput':
                height = height + field.height;
                body = body + `<p style="
                                text-align: ${field.style[2].style};
                                font-family: ${cFont};
                                font-size: ${field.style[3].style}px;
                                font-color: ${field.style[4].style};
                                ">${field.paragraph}</p>`;
                if(field.paragraph.length >= 41) {
                    if (field.paragraph.length % 41 == 0) {
                        height = height + 80;
                    }
                }
                break;
            case 'imageinput':
                body = body + `<div style="break-inside: avoid;display: flex; justify-content: ${field.style[1].style}">
                                    <img
                                    style="margin: 5px"
                                    width="${field.style[2].style}"
                                    height="${field.style[3].style}"
                                    src="data:image/jpg;base64, ${base64[i]}" />
                                </div>
                                `;
                height = height + field.style[3].style;
                break;
            case 'gallery':
                height = height + field.height;
                galImages = base64[i];
                if(base64.length == imageURIs.length) {
                    body = body + `<div style="display:flex; flex-wrap:wrap;break-inside: avoid;flex-direction: row; justify-content:${field.style[1].style}">`;
                    for(var gI = 0; gI < galImages.length; gI++) {
                        body = body + `<img
                                        style="margin: 3px"
                                        width="${field.style[2].style}"
                                        height="${field.style[3].style}"
                                        src="data:image/jpg;base64, ${galImages[gI]}" />`;
                    }
                    body = body + `</div>`;
                }
                break;
            case 'ulinput':
                height = height + field.height;
                var ulString = `<ul style="display: flex; break-inside:avoid; flex-direction: column; align-items: ${field.style[2].style}">`;
                for(var n = 0; n < field.list.length; n++) {
                    ulString = ulString + `<li style="
                                                font-size:${field.style[3]}px; 
                                                color:${field.style[4].style};
                                                font-family: ${cFont};"
                                            >${field.list[n].value}</li>`;
                }
                ulString = ulString + `</ul>`;
                body = body + ulString; 

                break;
            case 'olinput':
                height = height + field.height;
                var olString = `<ol style="display: flex; break-inside:avoid; flex-direction: column; align-items: ${field.style[2].style}">`;
                for(var o = 0; o < field.list.length; o++) {
                    olString = olString + `<li style="
                                                font-size:${field.style[3]}px; 
                                                color:${field.style[4].style};
                                                font-family: ${cFont};"
                                            >${field.list[o].value}</li>`;
                }
                olString = olString + `</ol>`;
                body = body + olString; 
                break;
            case 'detailsection':
                height = height + field.height;
                var dsec;
                for(var d = 0; d < details.length; d++) {
                    if(details[d].title == field.data) {
                        dsec = details[d];
                    }
                }
                if (dsec) {
                    body = body + `<p style="
                                        font-size: 1.7rem; 
                                        font-family: ${cFont};
                                        font-weight: 700;
                                        border-bottom: 1px solid #000;
                                        padding-bottom: 7px;
                                        width: 100%;
                                        text-align: left;
                                        margin-bottom: 8px"
                                    >${dsec.title}</p>
                                    <div class="dsec" style="font-family: ${cFont};padding:5px 17px">
                                    <style>
                                        .dsec p {margin:0;}
                                        ul.dashed {
                                            list-style-type: none;
                                        }
                                        ul.dashed > li:before {
                                            content: "-";
                                            padding-right: 10px;
                                        }
                                    </style>`
                    for(var dd = 0; dd < dsec.details.length; dd++) {
                        var dsecdeets = dsec.details[dd];
                        switch(dsecdeets.type) {
                            case "text":
                                body = body + `<div style="display:flex;flex-direction:column;padding-bottom:10px">
                                                    <p style="font-weight:bold;">${dsecdeets.label}</p>
                                                    <p>${dsecdeets.value}</p>
                                            </div>`;
                                break;
                            case "dropdown":
                                body = body + `<div style="padding-bottom:10px">
                                                    <p style="font-weight:bold;float:left;font-size:20px;padding-right:5px">${dsecdeets.label}: </p>
                                                    <p>${dsecdeets.selected}</p>
                                            </div>`;
                                break;
                            case "checkboxes":
                                body = body + `<div style="padding-bottom:10px">
                                                    <p style="font-weight:bold;">${dsecdeets.label}:</p>
                                                    <ul class="dashed" style="margin:5px 0 0 0">`
                                
                                for(var dc = 0; dc < dsecdeets.options.length; dc++) {
                                    if(dsecdeets.options[dc].checked == "checked") {
                                        body = body + `<li>${dsecdeets.options[dc].value}</li>`;
                                    }
                                }
                                                    
                                body = body + `</ul>
                                            </div>`;
                                break;
                            default:
                                break;
                        }
                    }
                    body = body + `</div>`;
                }
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
        report: state.report.report,
    }
}
const mapDispatchToProps = { 
    
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DownloadReport);