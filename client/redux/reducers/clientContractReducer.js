import { 
    CHANGE_MAIN_FIELD_C,
    CREATE_CLIENT_CONTRACT,
    GET_CONTRACT,
    MARK_SIGNED,
    VIEW_CONTRACT,
    CHANGE_SIGN,
    UPDATE_CLIENT_CONTRACT,
    ADD_PAGE_BREAK,
    STYLE_PAGE_BREAK,
    SWAP_FIELDS,
    DELETE_FIELD
} from '../actions/clientContractAction'
import update from 'immutability-helper'

const date = new Date();

const initialState = {
    clientFirstName: "",
    clientLastName: "",
    address: "",
    date: date.toString().slice(4,15),
    image: "",
    signed: "Unsigned",
    contractId: "",
    clientContract: {
        field_list: [],
        globalStyle: {
            0: {
                style: 'roboto'
            },
            1: {
                style: '#fff'
            }
        }
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_MAIN_FIELD_C: {
            const {field} = action.payload
            return {
                ...state,
                [field]: action.payload.text
            }
        }
        case CREATE_CLIENT_CONTRACT: {
            return {
                ...state,
                _id: action.payload.tempID,
                contract: action.payload.newTemplate
            }
        }
        case GET_CONTRACT: {
            return {
                ...state,
                contract: action.payload
            }
        }
        case MARK_SIGNED: {
            const { sign } = action.payload;
            var newStatus;
            if ( sign == "Unsigned") {
                newStatus = "Signed";
            } else {
                newStatus = "Unsigned"
            }
            return {
                ...state,
                signed: newStatus
            }

        }
        case VIEW_CONTRACT: {
            return action.payload;
        }
        case CHANGE_SIGN: {
            const {sign} = action.payload;
            return {
                ...state,
                signed: sign
            }
        }
        case UPDATE_CLIENT_CONTRACT: {
            return {
                ...state
            }
        }
        case ADD_PAGE_BREAK: {
            const { id, field, style } = action.payload;
            return update ( state, {
                clientContract: {
                    field_list: {$push: [{id, field, style}]}
                }
            })
        }
        case STYLE_PAGE_BREAK: {
            const { index, styleType, style } = action.payload;
            return update(state, {
                clientContract: {
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
        case SWAP_FIELDS: {
            const { index1, index2, field1, field2 } = action.payload
            return update(state, {
                clientContract: {
                    field_list: {
                        [index1]: {$set: field2},
                        [index2]: {$set: field1}
                    }
                }
            })
        }
        case DELETE_FIELD: {
            const {index} = action.payload;
            return update( state, {
                clientContract: {
                    field_list: {$splice: [[[index], 1]]}
                }
            })
        }
        default: 
            return state;
    }
}
