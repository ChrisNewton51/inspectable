import {
    REGISTER_USER_SUCCESS, 
    LOGIN_USER_SUCCESS, 
    LOGIN_USER_FAIL,
    REGISTER_USER_FAIL,
    LOGOUT_USER,
    CHANGE_PASSWORD,
    CHECK_PASSWORD,
    CHECK_EMAIL,
    CHECK_QUESTIONS,
    FORGOT_PASSWORD,
    UPDATE_USER
} from '../actions/authAction';
import { 
    CREATE_TEMPLATE,
    DUPLICATE_TEMPLATE,
    TRASH_TEMPLATE,
    DELETE_TEMPLATE,
    TEMPLATE_NOT_TRASH
} from '../actions/templateAction';
import update from 'immutability-helper'

const initialState = {
    user: {},
    errors: {}
}

export default function(state = initialState, action) {

    switch(action.type) {
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case REGISTER_USER_FAIL:
            return {
                ...state,
                errors: true
            }    
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                errors: true
            }
        case LOGOUT_USER:
            return initialState;
        case CHANGE_PASSWORD: 
            return {
                ...state
            }
        case CHECK_PASSWORD: {
            return {
                ...state
            }
        }
        case CHECK_EMAIL: {
            return {
                ...state
            }
        }
        case CHECK_QUESTIONS: {
            return {
                ...state
            }
        }
        case FORGOT_PASSWORD: {
            return {
                ...state
            }
        }
        case UPDATE_USER: {
            return {
                ...state
            }
        }
        default: 
            return {
                ...state
            }
    }
}
