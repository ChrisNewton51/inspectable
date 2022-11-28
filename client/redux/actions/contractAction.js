export const ADD_HEADER_C = 'ADD_HEADER_C'
export const CHANGE_HEADER_C = 'CHANGE_HEADER_C'
export const STYLE_HEADER_C = 'STYLE_HEADER_C'
export const ADD_PARAGRAPH_C = 'ADD_PARAGRAPH_C'
export const CHANGE_PARAGRAPH_C = 'CHANGE_PARAGRAPH_C'
export const STYLE_PARAGRAPH_C = 'STYLE_PARAGRAPH_C'
export const ADD_IMAGE_C = 'ADD_IMAGE_C'
export const STYLE_IMAGE_C = 'STYLE_IMAGE_C'
export const CHANGE_IMAGE_C = 'CHANGE_IMAGE_C'
export const DELETE_FIELD_C = 'DELETE_FIELD_C'
export const STYLE_GLOBAL_C = 'STYLE_GLOBAL_C'
export const SWAP_FIELDS_C = 'SWAP_FIELDS_C'
export const ADD_UL_C = 'ADD_UL_C'
export const ADD_UL_ITEM_C = 'ADD_UL_ITEM_C'
export const CHANGE_UL_ITEM_C = 'CHANGE_UL_ITEM_C'
export const STYLE_UL_C = 'STYLE_UL_C'
export const DELETE_LIST_ITEM_C = 'DELETE_LIST_ITEM_C'
export const ADD_OL_C = 'ADD_OL_C'
export const ADD_OL_ITEM_C = 'ADD_OL_ITEM_C'
export const CHANGE_OL_ITEM_C = 'CHANGE_OL_ITEM_C'
export const STYLE_OL_C = 'STYLE_OL_C'
export const ADD_SPACER_C = 'ADD_SPACER_C'
export const STYLE_SPACER_C = 'STYLE_SPACER_C'
export const ADD_SEPARATOR_C = 'ADD_SEPARATOR_C'
export const STYLE_SEPARATOR_C = 'STYLE_SEPARATOR_C'
export const ADD_PAGE_BREAK_C = 'ADD_PAGE_BREAK_C'
export const ADD_NAME_C = 'ADD_NAME_C'
export const STYLE_NAME_C = 'STYLE_NAME_C'
export const ADD_EMAIL_C = 'ADD_EMAIL_C'
export const STYLE_EMAIL_C = 'STYLE_EMAIL_C'
export const ADD_PHONE_C = 'ADD_PHONE_C'
export const STYLE_PHONE_C = 'STYLE_PHONE_C'
export const ADD_ADDRESS_C = 'ADD_ADDRESS_C'
export const STYLE_ADDRESS_C = 'STYLE_ADDRESS_C'
export const ADD_PRICE_C = 'ADD_PRICE_C'
export const CHANGE_NUMBER_C = 'CHANGE_NUMBER_C'
export const STYLE_NUMBER_C = 'STYLE_NUMBER_C'
export const ADD_DATE_C = 'ADD_DATE_C'
export const STYLE_DATE_C = 'STYLE_DATE_C'
export const ADD_SIGNATURE_C = 'ADD_SIGNATURE_C'
export const STYLE_SIGNATURE_C = 'STYLE_SIGNATURE_C'
export const ADD_HOUSE_IMAGE = 'ADD_HOUSE_IMAGE'
export const STYLE_HOUSE_IMAGE = 'STYLE_HOUSE_IMAGE'
export const CREATE_CONTRACT = 'CREATE_CONTRACT'
export const FETCH_CONTRACTS = 'FETCH_CONTRACTS'
export const EDIT_CONTRACT = 'EDIT_CONTRACT'
export const DUPLICATE_CONTRACT = 'DUPLICATE_CONTRACT'
export const TRASH_CONTRACT = 'TRASH_CONTRACT'
export const CHANGE_CURRENT_ID = 'CHANGE_CURRENT_ID'
export const CHANGE_CONTRACT_ID = 'CHANGE_CONTRACT_ID'
export const UPDATE_CONTRACT = 'UPDATE_CONTRACT'
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const FETCH_CONTRACT_TRASH = 'FETCH_CONTRACT_TRASH'
export const CONTRACT_NOT_TRASH = 'CONTRACT_NOT_TRASH'
export const EMPTY_CONTRACT_TRASH = 'EMPTY_CONTRACT_TRASH'
export const DELETE_CONTRACT = 'DELETE_CONTRACT'
export const RESET_CONTRACT = 'RESET_CONTRACT'
export const GET_USER_CONTRACTS = 'GET_USER_CONTRACTS'
export const GET_USER_CONT_TRASH = 'GET_USER_CONT_TRASH'

import { BASE_URL } from '../store'

export var nextId = new Date();
export var ulId = new Date();

export const addHeaderC = (field, header, subheader, showSubHeader, style) => ({
    type: ADD_HEADER_C,
    payload: {
        id: ++nextId,
        field,
        header,
        subheader,
        showSubHeader,
        style
    }
})

export const changeHeaderC = (index, type, value) => ({
    type: CHANGE_HEADER_C,
    payload: {
        index,
        type,
        value
    }
})

export const styleHeaderC = (id, styleType, style) => ({
    type: STYLE_HEADER_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const addParagraphC = (field, paragraph, style) => ({
    type: ADD_PARAGRAPH_C,
    payload: {
        id: ++nextId,
        field,
        paragraph,
        style,
    }
})

export const changeParagraphC = (index, value) => ({
    type: CHANGE_PARAGRAPH_C,
    payload: {
        index,
        value
    }
})

export const styleParagraphC = (id, styleType, style) => ({
    type: STYLE_PARAGRAPH_C,
    payload: {
        id,
        styleType, 
        style
    }
})

export const addImageC = (field, uri, style) => ({
    type: ADD_IMAGE_C,
    payload: {
        id: ++nextId,
        field,
        uri, 
        style,
    }
})

export const changeImageC = (index, uri) => ({
    type: CHANGE_IMAGE_C,
    payload: {
        index, 
        uri
    }
})

export const styleImageC = (id, styleType, style) => ({
    type: STYLE_IMAGE_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const deleteFieldC = id => ({
    type: DELETE_FIELD_C,
    payload: {
        id
    }
})

export const styleGlobalC = (styleType, style) => ({
    type: STYLE_GLOBAL_C,
    payload: {
        styleType,
        style
    }
})

export const swapFieldsC = (index1, index2, field1, field2) => ({
    type: SWAP_FIELDS_C,
    payload: {
        index1, 
        index2,
        field1, 
        field2
    }
})

export const addULC = (field, list, style) => ({
    type: ADD_UL_C,
    payload: {
        id: ++nextId,
        field,
        list,
        style
    }
})

export const addULItemC = (index, value) => ({
    type: ADD_UL_ITEM_C,
    payload: {
        id: ++ulId,
        index,
        value
    }
})

export const changeULItemC = (index, index2, value) => ({
    type: CHANGE_UL_ITEM_C,
    payload: {
        index,
        index2,
        value
    }
})

export const styleULC = (id, styleType, style) => ({
    type: STYLE_UL_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const deleteListItemC = (index1, index2) => ({
    type: DELETE_LIST_ITEM_C,
    payload: {
        index1, 
        index2
    }
})

export const addOLC = (field, list, style) => ({
    type: ADD_OL_C,
    payload: {
        id: ++nextId,
        field,
        list,
        style
    }
})

export const addOLItemC = (index, value) => ({
    type: ADD_OL_ITEM_C,
    payload: {
        id: ++ulId,
        index,
        value
    }
})

export const changeOLItemC = (index, index2, value) => ({
    type: CHANGE_OL_ITEM_C,
    payload: {
        index,
        index2,
        value
    }
})

export const styleOLC = (id, styleType, style) => ({
    type: STYLE_OL_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const addSpacerC = (field, style) => ({
    type: ADD_SPACER_C,
    payload: {
        id: ++nextId,
        field,
        style
    }
})

export const styleSpacerC = (index, styleType, style) => ({
    type: STYLE_SPACER_C,
    payload: {
        index,
        styleType,
        style
    }
})

export const addSeparatorC = (field, style) => ({
    type: ADD_SEPARATOR_C,
    payload: {
        id: ++nextId,
        field,
        style
    }
})

export const styleSeparatorC = (index, styleType, style) => ({
    type: STYLE_SEPARATOR_C,
    payload: {
        index,
        styleType,
        style
    }
})

export const addPagebreakC = (field, style) => ({
    type: ADD_PAGE_BREAK_C,
    payload: {
        id: ++nextId,
        field,
        style
    }
})

export const addNameC = (field, prefix, showPrefix, firstName, lastName, style) => ({
    type: ADD_NAME_C,
    payload: {
        id: ++nextId,
        field,
        prefix,
        showPrefix,
        firstName,
        lastName,
        style
    }
})

export const styleNameC = (id, styleType, style) => ({
    type: STYLE_NAME_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const addEmailC = (field, email, style) => ({
    type: ADD_EMAIL_C,
    payload: {
        id: ++nextId,
        field,
        email,
        style
    }
})

export const changeEmailC = (index, type, value) => ({
    type: CHANGE_EMAIL_C,
    payload: {
        index,
        type,
        value
    }
})

export const styleEmailC = (id, styleType, style) => ({
    type: STYLE_EMAIL_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const addPhoneC = (field, phone, style) => ({
    type: ADD_PHONE_C,
    payload: {
        id: ++nextId,
        field,
        phone,
        style
    }
})

export const stylePhoneC = (id, styleType, style) => ({
    type: STYLE_PHONE_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const addAddressC = (field, streetAddress, city, state1, zipCode, style) => ({
    type: ADD_ADDRESS_C,
    payload: {
        id: ++nextId,
        field,
        streetAddress,
        city,
        state1,
        zipCode,
        style
    }
})

export const styleAddressC = (id, styleType, style) => ({
    type: STYLE_ADDRESS_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const addPriceC = (field, price, style) => ({
    type: ADD_PRICE_C,
    payload: {
        id: ++nextId,
        field,
        price,
        style
    }
})

export const changeNumberC = (index, type, value) => ({
    type: CHANGE_NUMBER_C,
    payload: {
        index,
        type,
        value
    }
})

export const styleNumberC = (id, styleType, style) => ({
    type: STYLE_NUMBER_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const addDateC = (field, date, style) => ({
    type: ADD_DATE_C,
    payload: {
        id: ++nextId,
        field,
        date,
        style
    }
})

export const styleDateC = (id, styleType, style) => ({
    type: STYLE_DATE_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const addSignatureC = (field, signature, style) => ({
    type: ADD_SIGNATURE_C,
    payload: {
        id: ++nextId,
        field,
        signature,
        style
    }
})

export const styleSignatureC = (id, styleType, style) => ({
    type: STYLE_SIGNATURE_C,
    payload: {
        id,
        styleType,
        style
    }
})

export const addHouseImage = (field, uri, style) => ({
    type: ADD_HOUSE_IMAGE,
    payload: {
        id: ++nextId,
        field,
        uri, 
        style,
    }
})

export const styleHouseImage = (index, styleType, style) => ({
    type: STYLE_HOUSE_IMAGE,
    payload: {
        index,
        styleType,
        style
    }
})

export const createContract = (contract, userId, user) => {
    var conts = user.contracts
    return async dispatch => {
        const response = await fetch(`${BASE_URL}/contracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contract
            })
        })
        const responseData = await response.json();
        const tempID = responseData.data._id

        conts.push(tempID)
        user.contracts = conts

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
            type: CREATE_CONTRACT,
            payload: {
                responseData,
                tempID
            }
        })
    }
}

export const fetchContracts = () => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/contracts`)

        const resultData = await result.json();

        dispatch({
            type: FETCH_CONTRACTS,
            payload: resultData
        })
    }
}

export const editContract = (id) => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/contracts/${id}`)

        const resultData = await result.json();
        dispatch({
            type: EDIT_CONTRACT,
            payload: resultData.contract
        })
    }
}

export const duplicateContract = (id, userId, user) => {
    var conts = user.contracts
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/contracts/${id}`)

        const resultData = await result.json();
        var contract = resultData.contract;

        const response = await fetch(`${BASE_URL}/contracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                contract
            })
        })
        const responseData = await response.json();

        conts.push(responseData.data._id);
        user.contracts = conts;

        await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                user
            })
        })

        dispatch({
            type: DUPLICATE_CONTRACT,
            payload: responseData.data
        })
    }
}

export const trashContract = (id, userId, user) => {
    var conts = user.contracttrash
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/contracts/${id}`)

        const resultData = await result.json();
        const contract = resultData.contract;

        const trashR = await fetch(`${BASE_URL}/contracttrash`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contract
            })
        })
        const trashData = await trashR.json();

        await fetch(`${BASE_URL}/contracts/${id}`, {
            method: 'DELETE'
        })

        user.contracts = user.contracts.filter((tid) => tid != id)
        conts.push(trashData.data._id)
        user.contracttrash = conts

        await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                user
            })
        })

        dispatch({
            type: TRASH_CONTRACT,
            payload: {
                id
            }
        })
    }
}

export const changeCurrentId = (id) => ({
    type: CHANGE_CURRENT_ID,
    payload: id
})

export const changeContractId = (newId) => ({
    type: CHANGE_CONTRACT_ID,
    payload: {
        newId
    }
})

export const updateContract = (id, contract) => {
    return async dispatch => {
        const response = await fetch(`${BASE_URL}/contracts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contract,
                id
            })
        })
        const responseData = await response.json();
        dispatch({
            type: UPDATE_CONTRACT,
            payload: responseData
        })
    } 
}

export const changeTitle = (value) => ({
    type: CHANGE_TITLE,
    payload: {
        value
    }
})

export const fetchContractTrash = () => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/contracttrash`)

        const resultData = await result.json();

        dispatch({
            type: FETCH_CONTRACT_TRASH,
            payload: resultData
        })
    }
}

export const deleteContract = (id, userId, user) => {
    return async dispatch => {
        await fetch(`${BASE_URL}/contracttrash/${id}`, {
            method: 'DELETE'
        })

        user.contracttrash = user.contracttrash.filter((tid) => tid != id)
        await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                user
            })
        })
        dispatch({
            type: DELETE_CONTRACT,
        })
    }
}

export const contractNotTrash = (id, userId, user) => {
    var conts = user.contracts
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/contracttrash/${id}`)

        const resultData = await result.json();
        const contract = resultData.contract;

        const trashT = await fetch(`${BASE_URL}/contracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contract
            })
        })
        const trashData = await trashT.json();

        await fetch(`${BASE_URL}/contracttrash/${id}`, {
            method: 'DELETE'
        })

        user.contracttrash = user.contracttrash.filter((tid) => tid != id)
        conts.push(trashData.data._id)
        user.contracts = conts

        await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                user
            })
        })

        dispatch({
            type: CONTRACT_NOT_TRASH,
            payload: {
                id
            }
        })
    }
}

export const emptyContractTrash = (userId, user) => {
    return async dispatch => {
        await fetch(`${BASE_URL}/contracttrash`, {
            method: 'DELETE'
        })

        user.contracttrash = []
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
            type: EMPTY_CONTRACT_TRASH,
        })
    }
}

export const resetContract = () => ({
    type: RESET_CONTRACT
})

export const getUserContracts = (ids) => {
    var conts = [];
    return async dispatch => {
        for (var i = 0; i < ids.length; i++) {
            const response = await fetch(`${BASE_URL}/contracts/${ids[i]}`)
            const responseData = await response.json();
            conts.push(responseData)
        }
        
        dispatch({
            type: GET_USER_CONTRACTS,
            payload: conts
        })
    } 
}

export const getUserContTrash = (ids) => {
    var conts = [];
    return async dispatch => {
        for (var i = 0; i < ids.length; i++) {
            const response = await fetch(`${BASE_URL}/contracttrash/${ids[i]}`)
            const responseData = await response.json();
            conts.push(responseData)
            
        }
        dispatch({
            type: GET_USER_CONT_TRASH,
            payload: conts
        })
    } 
}
