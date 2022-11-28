export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAIL = 'REGISTER_USER_FAIL';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';
export const LOGOUT_USER = 'LOGOUT_USER';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHECK_PASSWORD = 'CHECK_PASSWORD';
export const CHECK_EMAIL = 'CHECK_EMAIL';
export const CHECK_QUESTIONS = 'CHECK_QUESTIONS';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const UPDATE_USER = 'UPDATE_USER';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from "../store"
var token;

export const registerUser = (authData) => {
    const {fullName, email, phone, password, question1, answer1, question2, answer2, question3, answer3} = authData;
    
    return async dispatch => {
        
        // Logic to make a post request to register the user
        const result = await fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                phone, 
                password,
                question1,
                answer1,
                question2,
                answer2,
                question3,
                answer3
            })
        });

        const resultData = await result.json();

        if(resultData.success) {
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: resultData
            });
        } else {
            dispatch({
                type: REGISTER_USER_FAIL
            });
        }

        return resultData;
    }
}

export const loginUser = (authData) => {
    const {email, password} = authData;

    return async dispatch => {

        // Logic to make a post request to login the user
        const result = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const resultData = await result.json();

        if(resultData.success) {
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: resultData
            });
        } else {
            dispatch({
                type: LOGIN_USER_FAIL
            });
        }

        return resultData;
    }
}
export const LOGIN_TOKEN = token;
export const logoutUser = () => ({
    type: LOGOUT_USER,
})

export const changePassword = (email, currentPassword, newPassword, confirmNewPassword) => {

    return async dispatch => {

        // Logic to make a post request to login the user
        const result = await fetch(`${BASE_URL}/users/changepassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                currentPassword,
                newPassword,
                confirmNewPassword
            })
        });

        const resultData = await result.json();

        dispatch({
            type: CHANGE_PASSWORD,
            payload: resultData
        });

        return resultData;
    }
}

export const checkPassword = (email, password) => {

    return async dispatch => {

        // Logic to make a post request to login the user
        const result = await fetch(`${BASE_URL}/users/checkpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const resultData = await result.json();

        dispatch({
            type: CHECK_PASSWORD,
            payload: resultData
        });
        
        return resultData.success;
    }
}

export const forgotPassword = (email, newPassword, confirmNewPassword) => {

    return async dispatch => {

        // Logic to make a post request to login the user
        const result = await fetch(`${BASE_URL}/users/forgotpassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                newPassword,
                confirmNewPassword
            })
        });

        const resultData = await result.json();

        dispatch({
            type: FORGOT_PASSWORD,
            payload: resultData
        });

        return resultData;
    }
}

export const checkEmail = (email) => {
    
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/users/checkemail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        });
        
        const resultData = await result.json();

        dispatch({
            type: CHECK_EMAIL,
            payload: resultData
        });
        
        return resultData;
    }
}

export const checkQuestions = (email, answer1, answer2, answer3) => {
    
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/users/checkquestions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                answer1,
                answer2,
                answer3
            })
        });
        
        const resultData = await result.json();
        
        dispatch({
            type: CHECK_QUESTIONS,
            payload: resultData
        });
        
        return resultData.success;
    }
}

export const updateUser = (id, user) => {
    return async dispatch => {
        const response = await fetch(`${BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                user
            })
        })
        const responseData = await response.json();
        dispatch({
            type: UPDATE_USER,
            payload: responseData
        })
    } 
}