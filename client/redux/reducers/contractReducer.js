import { Platform } from 'react-native'
import { 
    ADD_HEADER_C,
    DELETE_FIELD_C,
    STYLE_HEADER_C,
    CHANGE_HEADER_C,
    STYLE_GLOBAL_C,
    ADD_PARAGRAPH_C,
    CHANGE_PARAGRAPH_C,
    STYLE_PARAGRAPH_C,
    ADD_IMAGE_C,
    STYLE_IMAGE_C,
    CHANGE_IMAGE_C,
    SWAP_FIELDS_C,
    ADD_UL_C,
    ADD_UL_ITEM_C,
    CHANGE_UL_ITEM_C,
    STYLE_UL_C,
    DELETE_LIST_ITEM_C,
    ADD_OL_C,
    ADD_OL_ITEM_C,
    CHANGE_OL_ITEM_C,
    STYLE_OL_C,
    ADD_SPACER_C,
    STYLE_SPACER_C,
    ADD_SEPARATOR_C,
    STYLE_SEPARATOR_C,
    ADD_PAGE_BREAK_C,
    ADD_NAME_C,
    STYLE_NAME_C,
    ADD_EMAIL_C,
    STYLE_EMAIL_C,
    ADD_PHONE_C,
    STYLE_PHONE_C,
    ADD_ADDRESS_C,
    STYLE_ADDRESS_C,
    ADD_PRICE_C,
    CHANGE_NUMBER_C,
    STYLE_NUMBER_C,
    ADD_DATE_C,
    STYLE_DATE_C,
    ADD_SIGNATURE_C,
    STYLE_SIGNATURE_C,
    ADD_HOUSE_IMAGE,
    STYLE_HOUSE_IMAGE,
    CREATE_CONTRACT,
    EDIT_CONTRACT,
    CHANGE_CONTRACT_ID,
    CHANGE_TITLE,
    RESET_CONTRACT
} from "../actions/contractAction";
import update from 'immutability-helper'

var date = new Date();

const initialState = {
    id: null,
    title: "Contract",
    created: date.toString().slice(4,15),
    field_list: [],
    globalStyle: [
        {
            styleType: "fontFamily",
            style: Platform.OS == "ios" ? "sfprodisplay" : "roboto"
        },
        {
            styleType: "backgroundColor",
            style: "#ffffff"
        }
    ]
};


export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_HEADER_C: {
            const { id, field, header, subheader, showSubHeader, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, header, subheader, showSubHeader, style }]
            };
        }
        case CHANGE_HEADER_C: {
            const { index, type, value } = action.payload;
            return update(state, {
                field_list: {
                    [index]: {
                        [type]: {$set: value}
                    }
                }
            })
        }
        case STYLE_HEADER_C: {            
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
        case ADD_PARAGRAPH_C: {
            const { id, field, paragraph, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, paragraph, style }]
            };
        }
        case CHANGE_PARAGRAPH_C: {
            const { index, value } = action.payload;
            return update(state, {
                field_list: {
                    [index]: {
                        paragraph: {$set: value}
                    }
                }
            })
        }
        case STYLE_PARAGRAPH_C: {            
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
        case ADD_IMAGE_C: {
            const { id, field, uri, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, uri, style }]
            };
        }
        case CHANGE_IMAGE_C: {
            const { index, uri } = action.payload;
            return update(state, {
                field_list: {
                    [index]: {
                        uri: {$set: uri}
                    }
                }
            })
        }
        case STYLE_IMAGE_C: {
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
        case DELETE_FIELD_C: {
            const { id } = action.payload
            return {
                ...state,
                field_list: state.field_list.filter((field) => field.id != id)
            };
        }
        case STYLE_GLOBAL_C: {
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
        case SWAP_FIELDS_C: {
            const { index1, index2, field1, field2 } = action.payload
            return update(state, {
                field_list: {
                    [index1]: {$set: field2},
                    [index2]: {$set: field1}
                }
            })
        }
        case ADD_UL_C: {
            const { id, field, list, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, list, style }]
            };
        }
        case ADD_UL_ITEM_C: {
            const { id, index, value } = action.payload;
            return update( state, {
                field_list: {
                    [index]: {
                        list: {$push: [{id, value}]}
                    }
                }
            })
        }
        case CHANGE_UL_ITEM_C: {
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
        case STYLE_UL_C: {
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
        case DELETE_LIST_ITEM_C: {
            const { index1, index2 } = action.payload
            return update( state, {
                field_list: {
                    [index1]: {
                        list: {$splice: [[[index2], 1]]}
                    }
                }
            })
        }
        case ADD_OL_C: {
            const { id, field, list, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, list, style }]
            };
        }
        case ADD_OL_ITEM_C: {
            const { id, index, value } = action.payload;
            return update( state, {
                field_list: {
                    [index]: {
                        list: {$push: [{id, value}]}
                    }
                }
            })
        }
        case CHANGE_OL_ITEM_C: {
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
        case STYLE_OL_C: {
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
        case ADD_SPACER_C: {
            const { id, field, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, style }]
            };
        }
        case STYLE_SPACER_C: {
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
        case ADD_SEPARATOR_C: {
            const { id, field, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, style }]
            }
        }
        case STYLE_SEPARATOR_C: {
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
        case ADD_PAGE_BREAK_C: {
            const { id, field, style } = action.payload;
            return update ( state, {
                field_list: {$push: [{id, field, style}]}
            })
        }
        case ADD_NAME_C: {
            const { id, field, prefix, showPrefix, firstName, lastName, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, prefix, showPrefix, firstName, lastName, style }]
            };
        }
        case STYLE_NAME_C: {            
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
        case ADD_EMAIL_C: {
            const { id, field, email, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, email, style }]
            };
        }
        case STYLE_EMAIL_C: {            
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
        case ADD_PHONE_C: {
            const { id, field, phone, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, phone, style }]
            };
        }
        case STYLE_PHONE_C: {            
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
        case ADD_ADDRESS_C: {
            const { id, field, streetAddress, city, state1, zipCode, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, streetAddress, city, state1, zipCode, style }]
            };
        }
        case STYLE_ADDRESS_C: {            
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
        case ADD_PRICE_C: {
            const { id, field, price, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, price, style }]
            };
        }
        case CHANGE_NUMBER_C: {
            const { index, type, value } = action.payload;
            return update(state, {
                field_list: {
                    [index]: {
                        [type]: {$set: value}
                    }
                }
            })
        }
        case STYLE_NUMBER_C: {            
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
        case ADD_DATE_C: {
            const { id, field, date, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, date, style }]
            };
        }
        case STYLE_DATE_C: {            
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
        case ADD_SIGNATURE_C: {
            const { id, field, signature, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, signature, style }]
            };
        }
        case STYLE_SIGNATURE_C: {            
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
        case ADD_HOUSE_IMAGE: {
            const { id, field, uri, style } = action.payload;
            return {
                ...state,
                field_list: [ ...state.field_list, { id, field, uri, style }]
            };
        }
        case STYLE_HOUSE_IMAGE: {
            const { index, styleType, style } = action.payload
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
                    [index]: {
                        style: {
                           [sIndex]: {$set: {styleType, style}}
                        }
                    }
                } 
            });
        }
        case CREATE_CONTRACT: {
            return {
                ...state,
                id: action.payload.responseData.data._id
            }
        }
        case EDIT_CONTRACT: {
            return action.payload;
        }
        case CHANGE_CONTRACT_ID: {
            const { newId } = action.payload
            return {
                ...state,
                id: newId
            }
        }
        case CHANGE_TITLE: {
            return {
                ...state,
                title: action.payload.value
            }
        }
        case RESET_CONTRACT: {
            return initialState;
        }
        default: 
            return state;
    }
}