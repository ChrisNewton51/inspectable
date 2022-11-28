import { 
    CREATE_REPORT, 
    FETCH_REPORTS,
    CHANGE_REPORT_ID,
    SEARCH_REPORTS,
    FETCH_REPORT_TRASH,
    DELETE_REPORT,
    TRASH_REPORT,
    EMPTY_REPORT_TRASH,
    REPORT_NOT_TRASH,
    GET_USER_REPORTS,
    GET_USER_REP_TRASH
} from '../actions/reportAction'
import update from 'immutability-helper'

const initialState = {
    currentId: '',
    reports: [],
    search: [],
    trash: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_REPORT: {
            return {
                ...state,
                currentId: action.payload.reportID
            }
        }
        case FETCH_REPORTS: {
            return {
                ...state,
                reports: action.payload,
                search: action.payload,
            }
        }
        case GET_USER_REPORTS: {
            return {
                ...state,
                reports: action.payload,
                search: action.payload,
            }
        }
        case CHANGE_REPORT_ID: {
            const id = action.payload;
            return { 
                ...state,
                currentId: id
            }
        }
        case SEARCH_REPORTS: {
            return {
                ...state,
                search: action.payload
            }
        }
        case FETCH_REPORT_TRASH: {
            return {
                ...state, 
                trash: action.payload
            }
        }
        case GET_USER_REP_TRASH: {
            return {
                ...state, 
                trash: action.payload
            }
        }
        case DELETE_REPORT: {
            const { id, index } = action.payload;
            return update( state, {
                trash: {$splice: [[[index], 1]]}
            });
        }
        case TRASH_REPORT: {
            const { id, index } = action.payload;
            return update( state, {
                reports: {$splice: [[[index], 1]]},
                search: {$splice: [[[index], 1]]}
            });
        }
        case EMPTY_REPORT_TRASH: {
            return update( state, {
                trash: []
            });
        }
        case REPORT_NOT_TRASH: {
            const { id, index } = action.payload;
            return update( state, {
                trash: {$splice: [[[index], 1]]}
            });
        }
        default: 
            return state;
    }
}
