import { 
    FETCH_TEMPLATES, 
    TRASH_TEMPLATE, 
    FETCH_TEMPLATE_TRASH, 
    DELETE_TEMPLATE,
    DUPLICATE_TEMPLATE,
    TEMPLATE_NOT_TRASH,
    CHANGE_CURRENT_ID,
    EMPTY_TEMPLATE_TRASH,
    CREATE_TEMPLATE,
    GET_USER_TEMPLATES,
    GET_USER_TEMP_TRASH
} from "../actions/templateAction";

const initialState = {
    currentId: '',
    templates: [],
    trash: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_TEMPLATES: {
            return {
                ...state,
                templates: action.payload
            }
        }
        case GET_USER_TEMPLATES: {
            return {
                ...state,
                templates: action.payload
            }
        }
        case TRASH_TEMPLATE: {
            const { id } = action.payload;
            return {
                ...state,
                templates: state.templates.filter((field) => field._id != id)
            };
        }
        case FETCH_TEMPLATE_TRASH: {
            return {
                ...state, 
                trash: action.payload
            }
        }
        case GET_USER_TEMP_TRASH: {
            return {
                ...state, 
                trash: action.payload
            }
        }
        case DUPLICATE_TEMPLATE: {
            return {
                ...state
            };
        }
        case DELETE_TEMPLATE: {
            const { id } = action.payload;
            return {
                ...state,
                trash: state.trash.filter((field) => field._id != id)
            };
        }
        case TEMPLATE_NOT_TRASH: {
            const { id } = action.payload;
            return { 
                ...state,
                trash: state.trash.filter((field) => field._id != id)
            };
        }
        case CHANGE_CURRENT_ID: {
            const id = action.payload;
            return { 
                ...state,
                currentId: id
            }
        }
        case EMPTY_TEMPLATE_TRASH: {
            return {
                templates: [...state.templates],
                trash: []
            }
        }
        case CREATE_TEMPLATE: {
            const { responseData, tempID } = action.payload
            return {
                currentId: tempID
            }
        }
        default: {
            return state;
        }
    }
}