import update from 'immutability-helper';
import { 
    CHANGE_MAIN_FIELD,
    CREATE_REPORT,
    EDIT_REPORT,
    OPEN_DROPDOWN,
    SELECT_DROPDOWN_ITEM,
    CHANGE_TEXT,
    CHECK_BOX,
    UPDATE_REPORT,
    CHANGE_HEADER_INPUT,
    STYLE_HEADER_INPUT,
    STYLE_PARAGRAPH_INPUT,
    CHANGE_PARAGRAPH_INPUT,
    CHANGE_IMAGE_INPUT,
    STYLE_IMAGE_INPUT,
    ADD_UL_ITEM_INPUT,
    DELETE_LIST_ITEM_INPUT,
    CHANGE_UL_ITEM_INPUT,
    STYLE_UL_INPUT,
    ADD_OL_ITEM_INPUT,
    CHANGE_OL_ITEM_INPUT,
    STYLE_OL_INPUT,
    STYLE_GALLERY_IMAGES,
    CHANGE_COMPLETE,
    ADD_PAGEBREAK,
    SWAP_FIELDS,
    STYLE_PAGEBREAK,
    DELETE_FIELD,
    FIND_TRASH_REPORT,
    ADD_IMAGES,
    SELECT_IMAGE,
    REMOVE_IMAGES,
    ADD_GALLERY,
    RESET_REPORT,
    CHANGE_GLOBAL
} from '../actions/reportAction'

const date = new Date();

const initialState = {
    clientFirstName: "",
    clientLastName: "",
    clientEmail: "",
    clientPhone: null,
    address: "",
    city: "",
    state: "",
    price: null,
    date: date.toString().slice(4,15),
    image: "",
    completed: "Incomplete",
    template: "",
    clientContract: "",
    images: [],
    report: {
        field_list: [],
        globalStyle: {
            0: {
                style: 'roboto'
            },
            1: {
                style: '#fff'
            },
            2: {
                letterGal: "checked"
            }
        }
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case RESET_REPORT: {
            return initialState
        }
        case CHANGE_MAIN_FIELD: {
            const {field} = action.payload
            return {
                ...state,
                [field]: action.payload.text
            }
        }
        case CREATE_REPORT: {
            return {
                ...state,
                _id: action.payload.reportID,
                report: action.payload.newTemplate,
                clientContract: action.payload.contractID
            }
        }
        case EDIT_REPORT: {
            return action.payload
        }
        case OPEN_DROPDOWN: {
            var newState;
            const { index, index2, current } = action.payload;

            if (current == false) {
                newState = true;
            } else {
                newState = false;
            }

            return update(state, {
                report: {
                    details: {
                        [index]: {
                            details: {
                                [index2]: {
                                    open: {$set: newState}
                                }
                            }
                        }
                    }
                }
            })
        }
        case SELECT_DROPDOWN_ITEM: {
            const { index, index2, value } = action.payload;
            return update(state, {
                report: {
                    details: {
                        [index]: {
                            details: {
                                [index2]: {
                                    selected: {$set: value}
                                }
                            }
                        }
                    }
                }
            })
        }
        case CHANGE_TEXT: {
            const { index, index2, textValue } = action.payload;
            return update(state, {
                report: {
                    details: {
                        [index]: {
                            details: {
                                [index2]: {
                                    value: {$set: textValue}
                                }
                            }
                        }
                    }
                }
            })
        }
        case CHECK_BOX: {
            const { index, index2, index3, current } = action.payload
            var newValue;
            
            if (current == 'unchecked') {
                newValue = 'checked';
            } else {
                newValue = 'unchecked';
            }

            return update(state, {
                report: {
                    details: {
                        [index]: {
                            details: {
                                [index2]: {
                                    options: {
                                        [index3]: {
                                            checked: {$set: newValue}
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
        case UPDATE_REPORT: {
            return {
                ...state
            }
        }
        case CHANGE_HEADER_INPUT: {
            const { index, type, value } = action.payload;
            return update(state, {
                report: {
                    field_list: {
                        [index]: {
                            [type]: {$set: value}
                        }
                    }
                }
            })
        }
        case STYLE_HEADER_INPUT: {
            const { index, styleType, style } = action.payload;
            var sIndex;
            switch(styleType) {
                case 'alignButtons':
                    sIndex = 0;
                    break;
                case 'fontButtons':
                    sIndex = 1;
                    break;
                case 'textAlign':
                    sIndex = 2;
                    break;
                case 'fontSize':
                    sIndex = 3;
                    break;
                case 'fontColor':
                    sIndex = 4;
                    break;
                default:
                    break;
            }
            return update( state, {
                report: {
                    field_list: {
                        [index]: {
                            style: {
                                [sIndex]: {$set: {styleType, style}}
                            }
                        }
                    }
                }
            })
        }
        case CHANGE_PARAGRAPH_INPUT: {
            const { index, type, value } = action.payload;
            return update(state, {
                report: {
                    field_list: {
                        [index]: {
                            [type]: {$set: value}
                        }
                    }
                }
            })
        }
        case STYLE_PARAGRAPH_INPUT: {
            const { index, styleType, style } = action.payload;
            var sIndex;
            switch(styleType) {
                case 'alignButtons':
                    sIndex = 0;
                    break;
                case 'fontButtons':
                    sIndex = 1;
                    break;
                case 'textAlign':
                    sIndex = 2;
                    break;
                case 'fontSize':
                    sIndex = 3;
                    break;
                case 'fontColor':
                    sIndex = 4;
                    break;
                default:
                    break;
            }
            return update( state, {
                report: {
                    field_list: {
                        [index]: {
                            style: {
                                [sIndex]: {$set: {styleType, style}}
                            }
                        }
                    }
                }
            })
        }
        case CHANGE_IMAGE_INPUT: {
            const { index, uri } = action.payload;
            return update( state, {
                report: {
                    field_list: {
                        [index]: {
                            uri: {$set: uri}
                        }
                    }
                }
            })
        }
        case STYLE_IMAGE_INPUT: {
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
                report: {
                    field_list: {
                        [index]: {
                            style: {
                                [sIndex]: {$set: {styleType, style}}
                            }
                        }
                    }
                }
            })
        }
        case ADD_UL_ITEM_INPUT: {
            const { id, index, value } = action.payload;
            return update( state, {
                report: {
                    field_list: {
                        [index]: {
                            list: {$push: [{id, value}]}
                        }
                    }
                }
            })
        }
        case DELETE_LIST_ITEM_INPUT: {
            const { index1, index2 } = action.payload;
            return update( state, {
                report: {
                    field_list: {
                        [index1]: {
                            list: {$splice: [[[index2], 1]]}
                        }
                    }
                }
            })
        }
        case CHANGE_UL_ITEM_INPUT: {
            const { index, index2, value } = action.payload;
            return update(state, {
                report: {
                    field_list: {
                        [index]: {
                            list: {
                                [index2]: {
                                    value: {$set: value}
                                }
                            }
                        }
                    }
                }
            })
        }
        case STYLE_UL_INPUT: {
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
                report: {
                    field_list: {
                        [id]: {
                            style: {
                            [sIndex]: {$set: {styleType, style}}
                            }
                        }
                    } 
                }
            });
        }
        case ADD_OL_ITEM_INPUT: {
            const { id, index, value } = action.payload;
            return update( state, {
                report: {
                    field_list: {
                        [index]: {
                            list: {$push: [{id, value}]}
                        }
                    }
                }
            })
        }
        case CHANGE_OL_ITEM_INPUT: {
            const { index, index2, value } = action.payload;
            return update(state, {
                report: {
                    field_list: {
                        [index]: {
                            list: {
                                [index2]: {
                                    value: {$set: value}
                                }
                            }
                        }
                    }
                }
            })
        }
        case STYLE_OL_INPUT: {
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
                report: {
                    field_list: {
                        [id]: {
                            style: {
                            [sIndex]: {$set: {styleType, style}}
                            }
                        }
                    } 
                }
            });
        }
        case ADD_GALLERY: {
            const { newList} = action.payload;
            return update ( state, {
                report: {
                    field_list: {$set: newList}
                }
            })
        }
        case STYLE_GALLERY_IMAGES: {
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
                report: {
                    field_list: {
                        [index]: {
                            style: {
                                [sIndex]: {$set: {styleType, style}}
                            }
                        }
                    } 
                }
            });
        }
        case CHANGE_COMPLETE: {
            const { current } = action.payload;
            var newStatus;
            if ( current == "Incomplete") {
                newStatus = "Completed";
            } else {
                newStatus = "Incomplete"
            }
            return {
                ...state,
                completed: newStatus
            }

        }
        case ADD_PAGEBREAK: {
            const { id, field, style } = action.payload;
            return update ( state, {
                report: {
                    field_list: {$push: [{id, field, style}]}
                }
            })
        }
        case SWAP_FIELDS: {
            const { index1, index2, field1, field2 } = action.payload
            return update(state, {
                report: {
                    field_list: {
                        [index1]: {$set: field2},
                        [index2]: {$set: field1}
                    }
                }
            })
        }
        case STYLE_PAGEBREAK: {
            const { index, styleType, style } = action.payload;
            return update(state, {
                report: {
                    field_list: {
                        [index]: {
                            style: {
                                0: {$set: {styleType, style}}
                            }
                        }
                    }
                }
            })
        }
        case DELETE_FIELD: {
            const {index} = action.payload;
            return update( state, {
                report: {
                    field_list: {$splice: [[[index], 1]]}
                }
            })
        }
        case FIND_TRASH_REPORT: {
            return action.payload
        }
        case ADD_IMAGES: {
            const { images } = action.payload;
            return update ( state, {
                images: {$push: images}
            })
        }
        case SELECT_IMAGE: {
            const {current, index} = action.payload;
            var newVal;
            if (current) {
                newVal = false;
            } else {
                newVal = true;
            }
            return update ( state, {
                images: {
                    [index]: {
                        selected: {$set: newVal}
                    }
                }
            })
        }
        case REMOVE_IMAGES: {
            const { images } = action.payload;
            return update ( state, {
                images: {$set: images}
            })
        }
        case CHANGE_GLOBAL: {
            const { index, value } = action.payload
            return update(state, {
                report: {
                    globalStyle: {
                        [index] : {
                            letterGal: {$set: value}
                        }
                    }
                }
            })
        }
        default: 
            return state;
    }
}