import { 
    FETCH_CONTRACTS, 
    TRASH_CONTRACT, 
    FETCH_CONTRACT_TRASH, 
    DELETE_CONTRACT,
    DUPLICATE_CONTRACT,
    CONTRACT_NOT_TRASH,
    CHANGE_CURRENT_ID,
    EMPTY_CONTRACT_TRASH,
    CREATE_CONTRACT,
    GET_USER_CONTRACTS,
    GET_USER_CONT_TRASH
} from "../actions/contractAction";

const initialState = {
    currentId: '',
    contracts: [],
    trash: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_CONTRACTS: {
            return {
                ...state,
                contracts: action.payload
            }
        }
        case GET_USER_CONTRACTS: {
            return {
                ...state,
                contracts: action.payload
            }
        }
        case TRASH_CONTRACT: {
            const { id } = action.payload;
            return {
                ...state,
                contracts: state.contracts.filter((field) => field._id != id)
            };
        }
        case FETCH_CONTRACT_TRASH: {
            return {
                ...state, 
                trash: action.payload
            }
        }
        case GET_USER_CONT_TRASH: {
            return {
                ...state, 
                trash: action.payload
            }
        }
        case DUPLICATE_CONTRACT: {
            const contract = action.payload.contract
            const _id = action.payload._id
            return {
                contracts: [ ...state.contracts, {_id, contract, __v: 0}]
            };
        }
        case DELETE_CONTRACT: {
            return state;
        }
        case CONTRACT_NOT_TRASH: {
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
        case EMPTY_CONTRACT_TRASH: {
            return {
                contracts: [...state.contracts],
                trash: []
            }
        }
        case CREATE_CONTRACT: {
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