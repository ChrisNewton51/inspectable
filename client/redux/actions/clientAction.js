export const CREATE_CLIENT = 'CREATE_CLIENT'
export const FETCH_CLIENTS = 'FETCH_CLIENTS'
export const SEARCH_CLIENTS = 'SEARCH_CLIENTS'
export const UPDATE_CLIENT = 'UPDATE_CLIENT'
export const DELETE_CLIENT = 'DELETE_CLIENT'
export const GET_USER_CLIENTS = 'GET_USER_CLIENTS'

import { BASE_URL } from "../store"

export var nextId = new Date();

export const createClient = (firstName, lastName, email, phoneNumber, reports, userId, user) => {
    var clients = user.clients;
    return async dispatch => {

        const result = await fetch(`${BASE_URL}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phoneNumber,
                reports
            })
        });
        const resultData = await result.json();
        clients.push(resultData.data._id)
        user.clients = clients
        await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user
            })
        })
        
        dispatch({
            type: CREATE_CLIENT
        })
    }
}

export const fetchClients = () => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/clients`)

        const resultData = await result.json();
        dispatch({
            type: FETCH_CLIENTS,
            payload: resultData
        })
    }
}

export const getUserClients = (ids) => {
    var clients = [];
    return async dispatch => {
        for (var i = 0; i < ids.length; i++) {
            const response = await fetch(`${BASE_URL}/clients/${ids[i]}`)
            const responseData = await response.json();
            clients.push(responseData)
        }
        
        dispatch({
            type: GET_USER_CLIENTS,
            payload: clients
        })
    } 
}

export const searchClients = (list) => ({
    type: SEARCH_CLIENTS,
    payload: list
})

export const updateClient = (id, client) => {
    return async dispatch => {
        const response = await fetch(`${BASE_URL}/clients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                client
            )
        })
        const responseData = await response.json();
        dispatch({
            type: UPDATE_CLIENT,
            payload: responseData
        })
    } 
}

export const deleteClient = (id, userId, user) => {
    return async dispatch => {
        await fetch(`${BASE_URL}/clients/${id}`, {
            method: 'DELETE'
        })

        user.clients = user.clients.filter((tid) => tid != id)

        await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user
            })
        })

        dispatch({
            type: DELETE_CLIENT,
            payload: {
                id
            }
        })
    }
}