import { 
    FETCH_CLIENT_CONTRACTS, 
    SEARCH_CC,
    MARK_SIGNED,
    CHANGE_CONTRACT_ID
} from "../actions/clientContractAction";

const initialState = {
    currentId: '',
    clientcontracts: [],
    search: [],
    trash: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_CLIENT_CONTRACTS: {
            return {
                ...state,
                clientcontracts: action.payload,
                search: action.payload
            }
        }
        case SEARCH_CC: {
            return {
                ...state,
                search: action.payload
            }
        }
        case MARK_SIGNED: {
            return {
                ...state,
                clientcontracts: action.payload.responseData,
                search: action.payload.responseData
            }
        }
        case CHANGE_CONTRACT_ID: {
            const id = action.payload;
            return { 
                ...state,
                currentId: id
            }
        }
        default: {
            return state;
        }
    }
}