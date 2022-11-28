import { 
    CREATE_CLIENT, 
    FETCH_CLIENTS,
    SEARCH_CLIENTS,
    ADD_CLIENT_REPORT,
    DELETE_CLIENT,
    GET_USER_CLIENTS
} from '../actions/clientAction'

const initialState = {
    clients: [],
    search: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_CLIENT: {
            return {
                ...state,
            }
        }
        case FETCH_CLIENTS: {
            return {
                ...state,
                clients: action.payload,
                search: action.payload,
            }
        }
        case GET_USER_CLIENTS: {
            return {
                ...state,
                clients: action.payload,
                search: action.payload,
            }
        }
        case SEARCH_CLIENTS: {
            return {
                ...state,
                search: action.payload,
            }
        }
        case ADD_CLIENT_REPORT: {
            return {
                ...state,
            }
        }
        case DELETE_CLIENT: {
            return {
                ...state,
            }
        }
        default: 
            return state;
    }
}
