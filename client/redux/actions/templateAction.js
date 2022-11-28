export const RESET_APP = 'RESET_APP'
export const ADD_HEADER = 'ADD_HEADER'
export const CHANGE_HEADER = 'CHANGE_HEADER'
export const STYLE_HEADER = 'STYLE_HEADER'
export const ADD_PARAGRAPH = 'ADD_PARAGRAPH'
export const CHANGE_PARAGRAPH = 'CHANGE_PARAGRAPH'
export const STYLE_PARAGRAPH = 'STYLE_PARAGRAPH'
export const ADD_IMAGE = 'ADD_IMAGE'
export const STYLE_IMAGE = 'STYLE_IMAGE'
export const CHANGE_IMAGE = 'CHANGE_IMAGE'
export const DELETE_FIELD = 'DELETE_FIELD'
export const STYLE_GLOBAL = 'STYLE_GLOBAL'
export const SWAP_FIELDS = 'SWAP_FIELDS'
export const ADD_UL = 'ADD_UL'
export const ADD_UL_ITEM = 'ADD_UL_ITEM'
export const CHANGE_UL_ITEM = 'CHANGE_UL_ITEM'
export const STYLE_UL = 'STYLE_UL'
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM'
export const ADD_OL = 'ADD_OL'
export const ADD_OL_ITEM = 'ADD_OL_ITEM'
export const CHANGE_OL_ITEM = 'CHANGE_OL_ITEM'
export const STYLE_OL = 'STYLE_OL'
export const ADD_SPACER = 'ADD_SPACER'
export const STYLE_SPACER = 'STYLE_SPACER'
export const ADD_SEPARATOR = 'ADD_SEPARATOR'
export const STYLE_SEPARATOR = 'STYLE_SEPARATOR'
export const ADD_HEADER_INPUT = 'ADD_HEADER_INPUT'
export const ADD_PARAGRAPH_INPUT = 'ADD_PARAGRAPH_INPUT'
export const ADD_IMAGE_INPUT = 'ADD_IMAGE_INPUT'
export const ADD_UL_INPUT = 'ADD_UL_INPUT'
export const ADD_OL_INPUT = 'ADD_OL_INPUT'
export const FETCH_TEMPLATES = 'FETCH_TEMPLATES'
export const CREATE_TEMPLATE = 'CREATE_TEMPLATE'
export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE'
export const RESET_TEMPLATE = 'RESET_TEMPLATE'
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const ADD_TEMPLATE = 'ADD_TEMPLATE'
export const ADD_DETAIL_SECTION = 'ADD_DETAIL_SECTION'
export const CHANGE_SECTION_TITLE = 'CHANGE_SECTION_TITLE'
export const ADD_DROPDOWN = 'ADD_DROPDOWN'
export const ADD_TEXT = 'ADD_TEXT'
export const ADD_CHECKBOXES = 'ADD_CHECKBOXES'
export const CHANGE_LABEL = 'CHANGE_LABEL'
export const ADD_OPTION = 'ADD_OPTION'
export const DELETE_OPTION = 'DELETE_OPTION'
export const DELETE_TYPE = 'DELETE_TYPE'
export const DELETE_SECTION = 'DELETE_SECTION'
export const EDIT_TEMPLATE = 'EDIT_TEMPLATE'
export const DUPLICATE_TEMPLATE = 'DUPLICATE_TEMPLATE'
export const TRASH_TEMPLATE = 'TRASH_TEMPLATE'
export const FETCH_TEMPLATE_TRASH = 'FETCH_TEMPLATE_TRASH'
export const DELETE_TEMPLATE = 'DELETE_TEMPLATE'
export const TEMPLATE_NOT_TRASH = 'TEMPLATE_NOT_TRASH'
export const CHANGE_TEMPLATE_ID = 'CHANGE_TEMPLATE_ID'
export const CHANGE_CURRENT_ID = 'CHANGE_CURRENT_ID'
export const EMPTY_TEMPLATE_TRASH = 'EMPTY_TEMPLATE_TRASH'
export const ADD_CHECKBOX_OPTION = 'ADD_CHECKBOX_OPTION'
export const FILL_DATA = 'FILL_DATA'
export const ADD_DETAILS = 'ADD_DETAILS'
export const GET_USER_TEMPLATES = 'GET_USER_TEMPLATES'
export const GET_USER_TEMP_TRASH = 'GET_USER_TEMP_TRASH'
export const ADD_SECTION = 'ADD_SECTION'
export const UPDATE_SECTION = 'UPDATE_SECTION'
export const SWAP_DETAILS = 'SWAP_DETAILS'
export const SWAP_SUB_SEC = 'SWAP_SUB_SEC'
export const SWAP_SMALL_DETAILS = 'SWAP_SMALL_DETAILS'
export const CHANGE_TEMP_TEXT = 'CHANGE_TEMP_TEXT'

import { BASE_URL } from '../store'


export var nextId = new Date();
export var ulId = new Date();
export var detailId = new Date();
export var detail2Id = new Date();
export var optionId = new Date();

export const resetApp = () => ({
    type: RESET_APP
})

export const addHeader = (field, header, subheader, showSubHeader, style) => ({
    type: ADD_HEADER,
    payload: {
        id: ++nextId,
        field,
        header,
        subheader,
        showSubHeader,
        style
    }
})

export const changeHeader = (index, type, value) => ({
    type: CHANGE_HEADER,
    payload: {
        index,
        type,
        value
    }
})

export const styleHeader = (id, styleType, style) => ({
    type: STYLE_HEADER,
    payload: {
        id,
        styleType,
        style
    }
})

export const addParagraph = (field, paragraph, style) => ({
    type: ADD_PARAGRAPH,
    payload: {
        id: ++nextId,
        field,
        paragraph,
        style,
    }
})

export const changeParagraph = (index, value) => ({
    type: CHANGE_PARAGRAPH,
    payload: {
        index,
        value
    }
})

export const styleParagraph = (id, styleType, style) => ({
    type: STYLE_PARAGRAPH,
    payload: {
        id,
        styleType, 
        style
    }
})

export const addImage = (field, uri, style) => ({
    type: ADD_IMAGE,
    payload: {
        id: ++nextId,
        field,
        uri, 
        style,
    }
})

export const changeImage = (index, uri) => ({
    type: CHANGE_IMAGE,
    payload: {
        index, 
        uri
    }
})

export const styleImage = (id, styleType, style) => ({
    type: STYLE_IMAGE,
    payload: {
        id,
        styleType,
        style
    }
})

export const deleteField = id => ({
    type: DELETE_FIELD,
    payload: {
        id
    }
})

export const styleGlobal = (styleType, style) => ({
    type: STYLE_GLOBAL,
    payload: {
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

export const addUL = (field, list, style) => ({
    type: ADD_UL,
    payload: {
        id: ++nextId,
        field,
        list,
        style
    }
})

export const addULItem = (index, value) => ({
    type: ADD_UL_ITEM,
    payload: {
        id: ++ulId,
        index,
        value
    }
})

export const changeULItem = (index, index2, value) => ({
    type: CHANGE_UL_ITEM,
    payload: {
        index,
        index2,
        value
    }
})

export const styleUL = (id, styleType, style) => ({
    type: STYLE_UL,
    payload: {
        id,
        styleType,
        style
    }
})

export const deleteListItem = (index1, index2) => ({
    type: DELETE_LIST_ITEM,
    payload: {
        index1, 
        index2
    }
})

export const addOL = (field, list, style) => ({
    type: ADD_OL,
    payload: {
        id: ++nextId,
        field,
        list,
        style
    }
})

export const addOLItem = (index, value) => ({
    type: ADD_OL_ITEM,
    payload: {
        id: ++ulId,
        index,
        value
    }
})

export const changeOLItem = (index, index2, value) => ({
    type: CHANGE_OL_ITEM,
    payload: {
        index,
        index2,
        value
    }
})

export const styleOL = (id, styleType, style) => ({
    type: STYLE_OL,
    payload: {
        id,
        styleType,
        style
    }
})

export const addSpacer = (field, style) => ({
    type: ADD_SPACER,
    payload: {
        id: ++nextId,
        field,
        style
    }
})

export const styleSpacer = (index, styleType, style) => ({
    type: STYLE_SPACER,
    payload: {
        index,
        styleType,
        style
    }
})

export const addSeparator = (field, style) => ({
    type: ADD_SEPARATOR,
    payload: {
        id: ++nextId,
        field,
        style
    }
})

export const styleSeparator = (index, styleType, style) => ({
    type: STYLE_SEPARATOR,
    payload: {
        index,
        styleType,
        style
    }
})

export const addHeaderInput = (field, header, subheader, showSubHeader, style) => ({
    type: ADD_HEADER_INPUT,
    payload: {
        id: ++nextId,
        field,
        header,
        subheader,
        showSubHeader,
        style
    }
})

export const addParagraphInput = (field, paragraph, style) => ({
    type: ADD_PARAGRAPH_INPUT,
    payload: {
        id: ++nextId,
        field,
        paragraph,
        style,
    }
})

export const addImageInput = (field, uri, style) => ({
    type: ADD_IMAGE_INPUT,
    payload: {
        id: ++nextId,
        field,
        uri, 
        style,
    }
})

export const addULInput = (field, list, style) => ({
    type: ADD_UL_INPUT,
    payload: {
        id: ++nextId,
        field,
        list,
        style
    }
})

export const addOLInput = (field, list, style) => ({
    type: ADD_OL_INPUT,
    payload: {
        id: ++nextId,
        field,
        list,
        style
    }
})

export const fetchTemplates = () => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/templates`)

        const resultData = await result.json();

        dispatch({
            type: FETCH_TEMPLATES,
            payload: resultData
        })
    }
}

export const createTemplate = (template, userId, user) => {
    var temps = user.templates;
    return async dispatch => {
        
        const response = await fetch(`${BASE_URL}/templates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                template
            })
        })
        const responseData = await response.json();
        const tempID = responseData.data._id

        temps.push(tempID)
        user.templates = temps

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
            type: CREATE_TEMPLATE,
            payload: {
                responseData,
                tempID
            }
        })
    }
}

export const updateTemplate = (id, userId, template) => {
    return async dispatch => {
        const response = await fetch(`${BASE_URL}/templates/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                template,
                id,
                userId
            })
        })
        const responseData = await response.json();
        dispatch({
            type: UPDATE_TEMPLATE,
            payload: responseData
        })
    } 
}

export const resetTemplate = () => ({
    type: RESET_TEMPLATE
})

export const changeTitle = (value) => ({
    type: CHANGE_TITLE,
    payload: {
        value
    }
})

export const addDetailSection = () => ({
    type: ADD_DETAIL_SECTION,
    payload: {
        id: ++detailId,
        details: [],
        title: 'Detail Section'
    }
})

export const changeSectionTitle = (index, value) => ({
    type: CHANGE_SECTION_TITLE,
    payload: {
        index,
        value
    }
})

export const addDropdown = (index) => ({
    type: ADD_DROPDOWN,
    payload: {
        id: ++detail2Id,
        index,
        label: 'Dropdown Label',
        type: 'dropdown',
        options: []
    }
})

export const addText = (index) => ({
    type: ADD_TEXT,
    payload: {
        id: ++detail2Id,
        index,
        label: 'Text Label',
        type: 'text',
    }
})

export const addCheckboxes = (index) => ({
    type: ADD_CHECKBOXES,
    payload: {
        id: ++detail2Id,
        index,
        label: 'Checkboxes Label',
        type: 'checkboxes',
        options: []
    }
})

export const changeLabel = (index, index2, value) => ({
    type: CHANGE_LABEL,
    payload: {
        index, 
        index2,
        value
    }
})

export const addOption = (index, index2, value) => ({
    type: ADD_OPTION,
    payload: {
        id: ++optionId,
        index,
        index2,
        value
    }
})

export const addCheckboxOption = (index, index2, value) => ({
    type: ADD_CHECKBOX_OPTION,
    payload: {
        id: ++optionId,
        index,
        index2,
        value
    }
})

export const deleteOption = (index, index2, index3) => ({
    type: DELETE_OPTION,
    payload: {
        index,
        index2,
        index3
    }
})

export const deleteType = (index1, index2) => ({
    type: DELETE_TYPE,
    payload: {
        index1, 
        index2
    }
})

export const deleteSection = (index) => ({
    type: DELETE_SECTION,
    payload: {
        index
    }
})

export const editTemplate = (id) => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/templates/${id}`)

        const resultData = await result.json();
        dispatch({
            type: EDIT_TEMPLATE,
            payload: resultData.template
        })
    }
}

export const duplicateTemplate = (id, userId, user) => {
    var temps = user.templates;
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/templates/${id}`)

        const resultData = await result.json();
        var template = resultData.template;

        const response = await fetch(`${BASE_URL}/templates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                template
            })
        })
        const responseData = await response.json();
        
        temps.push(responseData.data._id);
        user.templates = temps;

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
            type: DUPLICATE_TEMPLATE,
            payload: responseData.data
        })
    }
}

export const trashTemplate = (id, userId, user) => {
    var temps = user.templatetrash;
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/templates/${id}`)

        const resultData = await result.json();
        const template = resultData.template;

        const trashR = await fetch(`${BASE_URL}/templatetrash`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                template
            })
        })
        const trashData = await trashR.json();

        await fetch(`${BASE_URL}/templates/${id}`, {
            method: 'DELETE'
        })

        user.templates = user.templates.filter((tid) => tid != id)
        temps.push(trashData.data._id)
        user.templatetrash = temps

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
            type: TRASH_TEMPLATE,
            payload: {
                id
            }
        })
    }
}

export const fetchTemplateTrash = () => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/templatetrash`)

        const resultData = await result.json();

        dispatch({
            type: FETCH_TEMPLATE_TRASH,
            payload: resultData
        })
    }
}

export const deleteTemplate = (id, userId, user) => {
    return async dispatch => {
        await fetch(`${BASE_URL}/templatetrash/${id}`, {
            method: 'DELETE'
        })

        user.templatetrash = user.templatetrash.filter((tid) => tid != id)
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
            type: DELETE_TEMPLATE,
            payload: {
                id
            }
        })
    }
}

export const templateNotTrash = (id, userId, user) => {
    var temps = user.templates;
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/templatetrash/${id}`)

        const resultData = await result.json();
        const template = resultData.template;

        const trashT = await fetch(`${BASE_URL}/templates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                template
            })
        })
        const trashData = await trashT.json();

        await fetch(`${BASE_URL}/templatetrash/${id}`, {
            method: 'DELETE'
        })

        user.templatetrash = user.templatetrash.filter((tid) => tid != id)
        temps.push(trashData.data._id)
        user.templates = temps

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
            type: TEMPLATE_NOT_TRASH,
            payload: {
                id
            }
        })
    }
}

export const changeTemplateId = (newId) => ({
    type: CHANGE_TEMPLATE_ID,
    payload: {
        newId
    }
})

export const changeCurrentId = (id) => ({
    type: CHANGE_CURRENT_ID,
    payload: id
})

export const emptyTemplateTrash = (userId, user) => {
    return async dispatch => {
        await fetch(`${BASE_URL}/templatetrash`, {
            method: 'DELETE'
        })

        user.templatetrash = []
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
            type: EMPTY_TEMPLATE_TRASH,
        })
    }
}

export const fillData = (index, dataL, detailid) => ({
    type: FILL_DATA,
    payload: {
        index,
        dataL,
        detailid
    }
})

export const addDetails = (field) => ({
    type: ADD_DETAILS,
    payload: {
        id: ++nextId,
        field
    }
})

export const getUserTemplates = (ids) => {
    var temps = [];
    return async dispatch => {
        for (var i = 0; i < ids.length; i++) {
            const response = await fetch(`${BASE_URL}/templates/${ids[i]}`)
            const responseData = await response.json();
            temps.push(responseData)
        }
        
        dispatch({
            type: GET_USER_TEMPLATES,
            payload: temps
        })
    } 
}

export const changeTempText = (index, index2, textValue) => ({
    type: CHANGE_TEMP_TEXT,
    payload: {
        index,
        index2,
        textValue
    }
})

export const getUserTempTrash = (ids) => {
    var temps = [];
    return async dispatch => {
        for (var i = 0; i < ids.length; i++) {
            const response = await fetch(`${BASE_URL}/templatetrash/${ids[i]}`)
            const responseData = await response.json();
            temps.push(responseData)
            
        }
        dispatch({
            type: GET_USER_TEMP_TRASH,
            payload: temps
        })
    } 
}

export const addSection = (id, section) => ({
    type: ADD_SECTION,
    payload: {
        id, 
        section
    }
})

export const updateSection = (secIndex, id, section) => ({
    type: UPDATE_SECTION,
    payload: {
        id,
        secIndex,
        section
    }
})

export const swapDetails = (index1, index2, field1, field2) => ({
    type: SWAP_DETAILS,
    payload: {
        index1, 
        index2,
        field1, 
        field2
    }
})

export const swapSubSec = (index0, index1, index2, field1, field2) => ({
    type: SWAP_SUB_SEC,
    payload: {
        index0,
        index1, 
        index2,
        field1, 
        field2
    }
})

export const swapSmallDetails = (index0, index1, index2, field1, field2, index3) => ({
    type: SWAP_SMALL_DETAILS,
    payload: {
        index0,
        index1, 
        index2,
        field1, 
        field2,
        index3
    }
})
