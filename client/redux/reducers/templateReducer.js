import { Platform } from 'react-native'
import { 
    ADD_HEADER, 
    DELETE_FIELD, 
    STYLE_HEADER, 
    CHANGE_HEADER,
    STYLE_GLOBAL, 
    ADD_PARAGRAPH,
    CHANGE_PARAGRAPH,
    STYLE_PARAGRAPH,
    ADD_IMAGE,
    STYLE_IMAGE,
    CHANGE_IMAGE,
    SWAP_FIELDS,
    ADD_UL,
    ADD_UL_ITEM,
    CHANGE_UL_ITEM,
    STYLE_UL,
    DELETE_LIST_ITEM,
    ADD_OL,
    ADD_OL_ITEM,
    CHANGE_OL_ITEM,
    STYLE_OL,
    ADD_SPACER,
    STYLE_SPACER,
    ADD_SEPARATOR,
    STYLE_SEPARATOR,
    ADD_HEADER_INPUT,
    ADD_PARAGRAPH_INPUT,
    ADD_IMAGE_INPUT,
    ADD_UL_INPUT,
    ADD_OL_INPUT,
    ADD_GALLERY_INPUT,
    UPDATE_TEMPLATE,
    RESET_TEMPLATE,
    CHANGE_TITLE,
    CREATE_TEMPLATE,
    ADD_DETAIL_SECTION,
    CHANGE_SECTION_TITLE,
    ADD_DROPDOWN,
    ADD_TEXT,
    ADD_CHECKBOXES,
    CHANGE_LABEL,
    ADD_OPTION,
    DELETE_OPTION,
    DELETE_TYPE,
    DELETE_SECTION,
    EDIT_TEMPLATE,
    CHANGE_TEMPLATE_ID,
    ADD_CHECKBOX_OPTION,
    FILL_DATA,
    ADD_DETAILS,
    ADD_SECTION,
    UPDATE_SECTION,
    SWAP_DETAILS,
    SWAP_SUB_SEC,
    SWAP_SMALL_DETAILS,
    CHANGE_TEMP_TEXT
} from "../actions/templateAction";
import update from 'immutability-helper'

var date = new Date();

const initialState = {
    id: "",
    title: "Template",
    created: date.toString().slice(4,15),
    sections: [],
    field_list: [],
    globalStyle: [
        {
            styleType: "fontFamily",
            style: Platform.OS == "ios" ? "sfprodisplay" : "roboto"
        },
        {
            styleType: "backgroundColor",
            style: "#ffffff"
        },
        {
            letterGal: 'checked'
        }
    ],
    details: []
};


export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_HEADER: {
            const { id, field, header, subheader, showSubHeader, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, header, subheader, showSubHeader, showSec: "unchecked", section: "", style }]
            };
        }
        case CHANGE_HEADER: {
            const { index, type, value } = action.payload;
            return update(state, {
                field_list: {
                    [index]: {
                        [type]: {$set: value}
                    }
                }
            })
        }
        case STYLE_HEADER: {            
            const { id, styleType, style } = action.payload
            var sIndex;
            switch(styleType) {
                case 'alignButtons':
                    sIndex = 0
                    break;
                case 'fontButtons':
                    sIndex = 1
                    break;
                case 'textAlign':
                    sIndex = 2
                    break;
                case 'fontSize': 
                    sIndex = 3
                    break;
                case 'fontColor': 
                    sIndex = 4
                    break;
                default:
                    break;
            }
            return update(state, {
                field_list: {
                    [id]: {
                        style: {
                           [sIndex]: {$set: {styleType, style}}
                        }
                    }
                } 
            });
        }
        case ADD_PARAGRAPH: {
            const { id, field, paragraph, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, paragraph, style }]
            };
        }
        case CHANGE_PARAGRAPH: {
            const { index, value } = action.payload;
            return update(state, {
                field_list: {
                    [index]: {
                        paragraph: {$set: value}
                    }
                }
            })
        }
        case STYLE_PARAGRAPH: {            
            const { id, styleType, style } = action.payload
            var sIndex;
            switch(styleType) {
                case 'alignButtons':
                    sIndex = 0
                    break;
                case 'fontButtons':
                    sIndex = 1
                    break;
                case 'textAlign':
                    sIndex = 2
                    break;
                case 'fontSize': 
                    sIndex = 3
                    break;
                case 'fontColor': 
                    sIndex = 4
                    break;
                default:
                    break;
            }
            return update(state, {
                field_list: {
                    [id]: {
                        style: {
                           [sIndex]: {$set: {styleType, style}}
                        }
                    }
                } 
            });
        }
        case ADD_IMAGE: {
            const { id, field, uri, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, uri, style }]
            };
        }
        case CHANGE_IMAGE: {
            const { index, uri } = action.payload;
            return update(state, {
                field_list: {
                    [index]: {
                        uri: {$set: uri}
                    }
                }
            })
        }
        case STYLE_IMAGE: {
            const { id, styleType, style } = action.payload
            var sIndex;
            switch(styleType) {
                case 'alignButtons':
                    sIndex = 0
                    break;
                case 'imageAlign':
                    sIndex = 1
                    break;
                case 'width':
                    sIndex = 2
                    break;
                case 'height':
                    sIndex = 3
                    break;
                default:
                    break;
            }
            return update(state, {
                field_list: {
                    [id]: {
                        style: {
                           [sIndex]: {$set: {styleType, style}}
                        }
                    }
                } 
            });
        }
        case DELETE_FIELD: {
            const { id } = action.payload
            return {
                ...state,
                field_list: state.field_list.filter((field) => field.id != id)
            };
        }
        case STYLE_GLOBAL: {
            const { styleType, style } = action.payload
            var sIndex;
            switch (styleType) {
                case 'fontFamily':
                    sIndex = 0
                    break;
                case 'backgroundColor':
                    sIndex = 1
                    break;
                default:
                    break;
            }
            return update(state, {
                globalStyle: {
                    [sIndex] : {$set: {styleType, style}}
                }
            })
        }
        case SWAP_FIELDS: {
            const { index1, index2, field1, field2 } = action.payload
            return update(state, {
                field_list: {
                    [index1]: {$set: field2},
                    [index2]: {$set: field1}
                }
            })
        }
        case ADD_UL: {
            const { id, field, list, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, list, style }]
            };
        }
        case ADD_UL_ITEM: {
            const { id, index, value } = action.payload;
            return update( state, {
                field_list: {
                    [index]: {
                        list: {$push: [{id, value}]}
                    }
                }
            })
        }
        case CHANGE_UL_ITEM: {
            const { index, index2, value } = action.payload;
            return update( state, {
                field_list: {
                    [index]: {
                        list: {
                            [index2]: {
                                value: {$set: value}
                            }
                        }
                    }
                }
            })
        }
        case STYLE_UL: {
            const { id, styleType, style } = action.payload
            var sIndex;
            switch(styleType) {
                case 'alignButtons':
                    sIndex = 0
                    break;
                case 'fontButtons':
                    sIndex = 1
                    break;
                case 'listAlign':
                    sIndex = 2
                    break;
                case 'fontSize': 
                    sIndex = 3
                    break;
                case 'fontColor': 
                    sIndex = 4
                    break;
                default:
                    break;
            }
            return update(state, {
                field_list: {
                    [id]: {
                        style: {
                           [sIndex]: {$set: {styleType, style}}
                        }
                    }
                } 
            });
        }
        case DELETE_LIST_ITEM: {
            const { index1, index2 } = action.payload
            return update( state, {
                field_list: {
                    [index1]: {
                        list: {$splice: [[[index2], 1]]}
                    }
                }
            })
        }
        case ADD_OL: {
            const { id, field, list, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, list, style }]
            };
        }
        case ADD_OL_ITEM: {
            const { id, index, value } = action.payload;
            return update( state, {
                field_list: {
                    [index]: {
                        list: {$push: [{id, value}]}
                    }
                }
            })
        }
        case CHANGE_OL_ITEM: {
            const { index, index2, value } = action.payload;
            return update( state, {
                field_list: {
                    [index]: {
                        list: {
                            [index2]: {
                                value: {$set: value}
                            }
                        }
                    }
                }
            })
        }
        case STYLE_OL: {
            const { id, styleType, style } = action.payload
            var sIndex;
            switch(styleType) {
                case 'alignButtons':
                    sIndex = 0
                    break;
                case 'fontButtons':
                    sIndex = 1
                    break;
                case 'listAlign':
                    sIndex = 2
                    break;
                case 'fontSize': 
                    sIndex = 3
                    break;
                case 'fontColor': 
                    sIndex = 4
                    break;
                default:
                    break;
            }
            return update(state, {
                field_list: {
                    [id]: {
                        style: {
                           [sIndex]: {$set: {styleType, style}}
                        }
                    }
                } 
            });
        }
        case ADD_SPACER: {
            const { id, field, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, style }]
            };
        }
        case STYLE_SPACER: {
            const { index, styleType, style } = action.payload;
            return update(state, {
                field_list: {
                    [index]: {
                        style: {
                            0: {$set: {styleType, style}}
                        }
                    }
                }
            })
        }
        case ADD_SEPARATOR: {
            const { id, field, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, style }]
            }
        }
        case STYLE_SEPARATOR: {
            const { index, styleType, style } = action.payload
            var sIndex;
            switch(styleType) {
                case 'borderWidth':
                    sIndex = 0
                    break;
                case 'borderColor': 
                    sIndex = 1
                    break;
                default:
                    break;
            }
            return update(state, {
                field_list: {
                    [index]: {
                        style: {
                           [sIndex]: {$set: {styleType, style}}
                        }
                    }
                } 
            });
        }
        case ADD_HEADER_INPUT: {
            const { id, field, header, subheader, showSubHeader, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, header, subheader, showSubHeader, style }]
            };
        }
        case ADD_PARAGRAPH_INPUT: {
            const { id, field, paragraph, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, paragraph, style }]
            };
        }
        case ADD_IMAGE_INPUT: {
            const { id, field, uri, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, uri, style }]
            };
        }
        case ADD_UL_INPUT: {
            const { id, field, list, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, list, style }]
            };
        }
        case ADD_OL_INPUT: {
            const { id, field, list, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, list, style }]
            };
        }
        case CREATE_TEMPLATE: {
            return {
                ...state,
                id: action.payload.responseData.data._id,
                userId: action.payload.responseData.data.userId
            }
        }
        case RESET_TEMPLATE: {
            return initialState;
        }
        case CHANGE_TITLE: {
            return {
                ...state,
                title: action.payload.value
            }
        }
        case UPDATE_TEMPLATE: {
            return {
                ...state
            }
        }
        case ADD_DETAIL_SECTION: {
            const { id, title, details } = action.payload;
            return {
                ...state,
                details: [ ...state.details, {id, title, details} ]
            }
        }
        case CHANGE_SECTION_TITLE: {
            const { index, value } = action.payload;
            return update(state, {
                details: {
                    [index]: {
                        title: {$set: value}
                    }
                }
            })
        }
        case ADD_DROPDOWN: {
            const { id, index, label, type, options } = action.payload;
            return update(state, {
                details: {
                    [index]: {
                        details: {$push: [{id, label, type, open: false, selected: "Dropdown Menu", options}]}
                    }
                }
            })
        }
        case ADD_TEXT: {
            const { id, index, label, type } = action.payload;
            return update(state, {
                details: {
                    [index]: {
                        details: {$push: [{id, label, value: "", type}]}
                    }
                }
            })
        }
        case ADD_CHECKBOXES: {
            const { id, index, label, type, options } = action.payload;
            return update(state, {
                details: {
                    [index]: {
                        details: {$push: [{id, label, type, options}]}
                    }
                }
            })
        }
        case CHANGE_LABEL: {
            const { index, index2, value } = action.payload;
            return update(state, {
                details: {
                    [index]: {
                        details: {
                            [index2]: {
                                label: {$set: value}
                            }
                        }
                    }
                }
            })
        }
        case CHANGE_TEMP_TEXT: {
            const { index, index2, textValue } = action.payload;
            return update(state, {
                details: {
                    [index]: {
                        details: {
                            [index2]: {
                                value: {$set: textValue}
                            }
                        }
                    }
                }
            })
        }
        case ADD_OPTION: {
            const { id, index, index2, value } = action.payload;
            return update( state, {
                details: {
                    [index]: {
                        details: {
                            [index2]: {
                                options: {$push: [{id, value}]}
                            }
                        }
                    }
                }
            })
        } 
        case ADD_CHECKBOX_OPTION: {
            const { id, index, index2, value } = action.payload;
            return update( state, {
                details: {
                    [index]: {
                        details: {
                            [index2]: {
                                options: {$push: [{id, checked: "checked", value}]}
                            }
                        }
                    }
                }
            })
        } 
        case DELETE_OPTION: {
            const { index, index2, index3 } = action.payload
            return update( state, {
                details: {
                    [index]: {
                        details: {
                            [index2]: {
                                options: {$splice: [[[index3], 1]]}
                            }
                        }
                    }
                }
            })
        }
        case DELETE_TYPE: {
            const { index1, index2 } = action.payload
            return update( state, {
                details: {
                    [index1]: {
                        details: {$splice: [[[index2], 1]]}
                    }
                }
            })
        }
        case DELETE_SECTION: {
            const { index } = action.payload
            return update(state, {
                details: {$splice: [[[index], 1]]}
            })
        }
        case EDIT_TEMPLATE: {
            return action.payload;
        }
        case CHANGE_TEMPLATE_ID: {
            const { newId } = action.payload
            return {
                ...state,
                id: newId
            }
        }
        case FILL_DATA: {
            const { index, dataL, detailid } = action.payload;
            return update( state, {
                field_list: {
                    [index]: {
                        data: {$set: dataL},
                        detailid: {$set: detailid}
                    }
                }
            })
        }
        case ADD_DETAILS: {
            const { id, field } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, style: [], details: [], data: "", detailid: "" }]
            };
        }
        case ADD_SECTION: {
            const { id, section } = action.payload;
            return update ( state, {
                sections: {$push: [{id, section}]}
            })
        }
        case UPDATE_SECTION: {
            const { id, secIndex, section } = action.payload;
            return update( state, {
                sections: {
                    [secIndex]: {$set: {id, section}}
                }
            })
        }
        case SWAP_DETAILS: {
            const { index1, index2, field1, field2 } = action.payload
            return update(state, {
                details: {
                    [index1]: {$set: field2},
                    [index2]: {$set: field1}
                }
            })
        }
        case SWAP_SUB_SEC: {
            const { index0, index1, index2, field1, field2 } = action.payload
            return update(state, {
                details: {
                    [index0]: {
                        details: {
                            [index1]: {$set: field2},
                            [index2]: {$set: field1}
                        }
                    }
                }
            })
        }
        case SWAP_SMALL_DETAILS: {
            const { index0, index1, index2, field1, field2, index3 } = action.payload
            return update(state, {
                details: {
                    [index0]: {
                        details: {
                            [index3] : {
                                options: {    
                                    [index1]: {$set: field2},
                                    [index2]: {$set: field1}
                                }
                            }
                        }
                    }
                }
            })
        }
        default: 
            return state;
    }
}