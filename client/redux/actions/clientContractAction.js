export const CREATE_CLIENT_CONTRACT = 'CREATE_CLIENT_CONTRACT'
export const CHANGE_MAIN_FIELD_C = 'CHANGE_MAIN_FIELD_C'
export const GET_CONTRACT = 'GET_CONTRACT'
export const FETCH_CLIENT_CONTRACTS = 'FETCH_CLIENT_CONTRACTS'
export const SEARCH_CC = 'SEARCH_CC'
export const MARK_SIGNED = 'MARK_SIGNED'
export const VIEW_CONTRACT = 'VIEW_CONTRACT'
export const CHANGE_SIGN = 'CHANGE_SIGN'
export const CHANGE_CONTRACT_ID = 'CHANGE_CONTRACT_ID'
export const UPDATE_CLIENT_CONTRACT = 'UPDATE_CLIENT_CONTRACT'
export const ADD_PAGE_BREAK = 'ADD_PAGE_BREAK'
export const STYLE_PAGE_BREAK = 'STYLE_PAGE_BREAK'
export const SWAP_FIELDS = 'SWAP_FIELDS'
export const DELETE_FIELD = 'DELETE_FIELD'

import { BASE_URL } from "../store"

export var nextId = new Date();

export const createClientContract = (clientFirstName, clientLastName, address, date, image, signed, clientContract) => {
    return async dispatch => {
        const response = await fetch(`${BASE_URL}/clientcontracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientFirstName,
                clientLastName,
                address,
                date,
                image,
                signed,
                clientContract
            })
        })
        const responseData = await response.json();
        const tempID = responseData.data._id
        dispatch({
            type: CREATE_CLIENT_CONTRACT,
            payload: {
                responseData,
                tempID
            }
        })
    }
}

export const changeMainFieldC = (field, text) => ({
    type: CHANGE_MAIN_FIELD_C,
    payload: {
        field,
        text
    }
})

export const getContract = (id) => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/contracts/${id}`)

        const resultData = await result.json();
        const contract = resultData.contract;

        dispatch({
            type: GET_CONTRACT,
            payload: contract
        })
    }
}

export const fetchClientContracts = () => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/clientcontracts`)

        const resultData = await result.json();
        dispatch({
            type: FETCH_CLIENT_CONTRACTS,
            payload: resultData
        })
    }
}

export const searchCC = (list) => ({
    type: SEARCH_CC,
    payload: list
})

export const markSigned = (sign, id) => {
    var signed;

    if (sign == "Signed") {
        signed = "Unsigned";
    } else {
        signed = "Signed";
    }
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/clientcontracts/${id}`)
        const resultData = await result.json();

        await fetch(`${BASE_URL}/clientcontracts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientFirstName: resultData.clientFirstName,
                clientLastName: resultData.clientLastName,
                address: resultData.address,
                date: resultData.date,
                signed: signed,
                clientContract: resultData.clientContract,
            })
        })

        const response = await fetch(`${BASE_URL}/clientcontracts/`)
        const responseData = await response.json();

        dispatch({
            type: MARK_SIGNED,
            payload: {
                sign,
                responseData
            }
        })
    }
}

export const viewContract = (id) => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/clientcontracts/${id}`)

        const resultData = await result.json();
        dispatch({
            type: VIEW_CONTRACT,
            payload: resultData
        })
    }
}

export const changeSign = (sign) => ({
    type: CHANGE_SIGN,
    payload: {
        sign
    }
})

export const changeContractId = (id) => ({
    type: CHANGE_CONTRACT_ID,
    payload: id
})

export const updateClientContract = (id, contract) => {
    return async dispatch => {
        const response = await fetch(`${BASE_URL}/clientcontracts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientFirstName: contract.clientFirstName,
                clientLastName: contract.clientLastName,
                address: contract.address,
                date: contract.date,
                signed: contract.signed,
                clientContract: contract.clientContract,
            })
        })
        const responseData = await response.json();
        dispatch({
            type: UPDATE_CLIENT_CONTRACT,
            payload: responseData
        })
    } 
}

export const addPagebreak = (field, style) => ({
    type: ADD_PAGE_BREAK,
    payload: {
        id: ++nextId,
        field,
        style
    }
})

export const stylePagebreak = (index, styleType, style) => ({
    type: STYLE_PAGE_BREAK,
    payload: {
        index,
        styleType,
        style
    }
})

export const swapFields = (index1, index2, field1, field2) => ({
    type: SWAP_FIELDS,
    payload: {
        index1, 
        index2,
        field1, 
        field2
    }
})

export const deleteField = index => ({
    type: DELETE_FIELD,
    payload: {
        index
    }
})