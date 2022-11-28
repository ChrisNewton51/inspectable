export const CHANGE_MAIN_FIELD = 'CHANGE_MAIN_FIELD'
export const CREATE_REPORT = 'CREATE_REPORT'
export const FETCH_REPORTS = 'FETCH_REPORTS'
export const CHANGE_REPORT_ID = 'CHANGE_REPORT_ID'
export const EDIT_REPORT = 'EDIT_REPORT'
export const OPEN_DROPDOWN = 'OPEN_DROPDOWN'
export const SELECT_DROPDOWN_ITEM = 'SELECT_DROPDOWN_ITEM'
export const CHANGE_TEXT = 'CHANGE_TEXT'
export const CHECK_BOX = 'CHECK_BOX'
export const UPDATE_REPORT = 'UPDATE_REPORT'
export const CHANGE_HEADER_INPUT = 'CHANGE_HEADER_INPUT'
export const CHANGE_PARAGRAPH_INPUT = 'CHANGE_PARAGRAPH_INPUT'
export const STYLE_HEADER_INPUT = 'STYLE_HEADER_INPUT'
export const STYLE_PARAGRAPH_INPUT = 'STYLE_PARAGRAPH_INPUT'
export const STYLE_IMAGE_INPUT = 'STYLE_IMAGE_INPUT'
export const CHANGE_IMAGE_INPUT = 'CHANGE_IMAGE_INPUT'
export const ADD_UL_ITEM_INPUT = 'ADD_UL_ITEM_INPUT'
export const DELETE_LIST_ITEM_INPUT = 'DELETE_LIST_ITEM_INPUT'
export const CHANGE_UL_ITEM_INPUT = 'CHANGE_UL_ITEM_INPUT'
export const STYLE_UL_INPUT = 'STYLE_UL_INPUT'
export const ADD_OL_ITEM_INPUT = 'ADD_OL_ITEM_INPUT'
export const CHANGE_OL_ITEM_INPUT = 'CHANGE_OL_ITEM_INPUT'
export const STYLE_OL_INPUT = 'STYLE_OL_INPUT'
export const ADD_GALLERY_IMAGES = 'ADD_GALLERY_IMAGES'
export const STYLE_GALLERY_IMAGES = 'STYLE_GALLERY_IMAGES'
export const CHANGE_COMPLETE = 'CHANGE_COMPLETE'
export const FILL_HEIGHT = 'FILL_HEIGHT'
export const ADD_PAGEBREAK = 'ADD_PAGEBREAK'
export const SWAP_FIELDS = 'SWAP_FIELDS'
export const STYLE_PAGEBREAK = 'STYLE_PAGEBREAK'
export const DELETE_FIELD = 'DELETE_FIELD'
export const SEARCH_REPORTS = 'SEARCH_REPORTS'
export const TRASH_REPORT = 'TRASH_REPORT'
export const FETCH_REPORT_TRASH = 'FETCH_REPORT_TRASH'
export const DELETE_REPORT = 'DELETE_REPORT'
export const REPORT_NOT_TRASH = 'REPORT_NOT_TRASH'
export const EMPTY_REPORT_TRASH = 'EMPTY_REPORT_TRASH'
export const FIND_TRASH_REPORT = 'FIND_TRASH_REPORT'
export const GET_USER_REPORTS = 'GET_USER_REPORTS'
export const GET_USER_REP_TRASH = 'GET_USER_REP_TRASH'
export const ADD_IMAGES = 'ADD_IMAGES'
export const SELECT_IMAGE = 'SELECT_IMAGE'
export const REMOVE_IMAGES = 'REMOVE_IMAGES'
export const ADD_GALLERY = 'ADD_GALLERY'
export const RESET_REPORT = 'RESET_REPORT'
export const CHANGE_GLOBAL = 'CHANGE_GLOBAL'

import { BASE_URL } from "../store"

export var ulId = new Date();
export var nextId = new Date();

export const resetReport = () => ({
    type: RESET_REPORT
})

export const changeMainField = (field, text) => ({
    type: CHANGE_MAIN_FIELD,
    payload: {
        field,
        text
    }
})

export const createReport = (clientFirstName, clientLastName, clientEmail, clientPhone, address, city, state, price, date, image, completed, templateId, clientContract, userId, user) => {
    var reps = user.reports;
    var ccs = user.clientcontracts;
    return async dispatch => {
        const template = await fetch(`${BASE_URL}/templates/${templateId}`);

        const templateData = await template.json();
        const newTemplate = templateData.template

        newTemplate.title = address

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
                signed: "Unsigned",
                clientContract
            })
        })
        const responseData = await response.json();
        const contractID = responseData.data._id

        const report = await fetch(`${BASE_URL}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientFirstName,
                clientLastName,
                clientEmail,
                clientPhone,
                address,
                city,
                state,
                price,
                date,
                image,
                completed,
                template: templateId,
                clientContract: contractID,
                report: newTemplate
            })
        });

        const reportData = await report.json();
        const reportID = reportData.data._id;

        reps.push(reportID)
        ccs.push(contractID)
        user.reports = reps
        user.clientcontracts = ccs

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
            type: CREATE_REPORT,
            payload: {
                newTemplate,
                reportID,
                contractID
            }
        })
    }
}

export const fetchReports = () => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/reports`)

        const resultData = await result.json();
        dispatch({
            type: FETCH_REPORTS,
            payload: resultData
        })
    }
}

export const changeReportId = (id) => ({
    type: CHANGE_REPORT_ID,
    payload: id
})

export const editReport = (id) => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/reports/${id}`)

        const resultData = await result.json();
        dispatch({
            type: EDIT_REPORT,
            payload: resultData
        })
    }
}

export const openDropdown = (index, index2, current) => ({
    type: OPEN_DROPDOWN,
    payload: {
        index, 
        index2,
        current
    }
})

export const selectDropdownItem = (index, index2, value) => ({
    type: SELECT_DROPDOWN_ITEM,
    payload: {
        index,
        index2,
        value
    }
})

export const changeText = (index, index2, textValue) => ({
    type: CHANGE_TEXT,
    payload: {
        index,
        index2,
        textValue
    }
})

export const checkBox = (index, index2, index3, current) => ({
    type: CHECK_BOX,
    payload: {
        index,
        index2,
        index3,
        current
    }
})

export const updateReport = (id, report) => {
    return async dispatch => {
        const response = await fetch(`${BASE_URL}/reports/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                report
            })
        })
        const responseData = await response.json();
        dispatch({
            type: UPDATE_REPORT,
            payload: responseData
        })
    } 
}

export const changeHeaderInput = (index, type, value) => ({
    type: CHANGE_HEADER_INPUT,
    payload: {
        index, 
        type,
        value
    }
})

export const styleHeaderInput = (index, styleType, style) => ({
    type: STYLE_HEADER_INPUT,
    payload: {
        index,
        styleType,
        style
    }
})

export const changeParagraphInput = (index, type, value) => ({
    type: CHANGE_PARAGRAPH_INPUT,
    payload: {
        index, 
        type,
        value
    }
})

export const styleParagraphInput = (index, styleType, style) => ({
    type: STYLE_PARAGRAPH_INPUT,
    payload: {
        index,
        styleType,
        style
    }
})

export const changeImageInput = (index, uri) => ({
    type: CHANGE_IMAGE_INPUT,
    payload: {
        index,
        uri
    }
})

export const styleImageInput = (index, styleType, style) => ({
    type: STYLE_IMAGE_INPUT,
    payload: {
        index,
        styleType,
        style
    }
})

export const addULItemInput = (index, value) => ({
    type: ADD_UL_ITEM_INPUT,
    payload: {
        id: ++ulId,
        index,
        value
    }
})

export const deleteListItemInput = (index1, index2) => ({
    type: DELETE_LIST_ITEM_INPUT, 
    payload: {
        index1,
        index2
    }
})

export const changeULItemInput = (index, index2, value) => ({
    type: CHANGE_UL_ITEM_INPUT,
    payload: {
        index, 
        index2,
        value
    }
})

export const addOLItemInput = (index, value) => ({
    type: ADD_OL_ITEM_INPUT,
    payload: {
        id: ++ulId,
        index,
        value
    }
})

export const styleOLInput = (id, styleType, style) => ({
    type: STYLE_OL_INPUT,
    payload: {
        id,
        styleType,
        style
    }
})

export const changeOLItemInput = (index, index2, value) => ({
    type: CHANGE_OL_ITEM_INPUT,
    payload: {
        index, 
        index2,
        value
    }
})

export const styleULInput = (id, styleType, style) => ({
    type: STYLE_UL_INPUT,
    payload: {
        id,
        styleType,
        style
    }
})

export const addGalleryImages = (index, imageList) => ({
    type: ADD_GALLERY_IMAGES,
    payload: {
        index,
        imageList
    }
})

export const styleGalleryImages = (index, styleType, style) => ({
    type: STYLE_GALLERY_IMAGES,
    payload: {
        index,
        styleType,
        style
    }
})

export const changeComplete = (current) => ({
    type: CHANGE_COMPLETE,
    payload: {
        current
    }
})

export const addPagebreak = (field, style) => ({
    type: ADD_PAGEBREAK,
    payload: {
        id: ++nextId,
        field,
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

export const stylePagebreak = (index, styleType, style) => ({
    type: STYLE_PAGEBREAK,
    payload: {
        index,
        styleType,
        style
    }
})

export const deleteField = index => ({
    type: DELETE_FIELD,
    payload: {
        index
    }
})

export const searchReports = (list) => ({
    type: SEARCH_REPORTS,
    payload: list
})

export const trashReport = (id, index, userId, user) => {
    var repts = user.reporttrash;
    var ccts = user.cctrash;

    return async dispatch => {

        // Get report to trash
        const result = await fetch(`${BASE_URL}/reports/${id}`)
        const resultData = await result.json();

        // Copy data for trash
        const rtrash = await fetch(`${BASE_URL}/reporttrash`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientFirstName: resultData.clientFirstName,
                clientLastName: resultData.clientLastName,
                clientEmail: resultData.clientEmail,
                clientPhone: resultData.clientPhone,
                address: resultData.address,
                city: resultData.city,
                state: resultData.state,
                price: resultData.price,
                date: resultData.date,
                image: resultData.image,
                completed: resultData.completed,
                template: resultData.template,
                clientContract: resultData.clientContract,
                report: resultData.report
            })
        })
        const rtrashData = await rtrash.json();

        // Put associated client contract in trash
        const cc = await fetch(`${BASE_URL}/clientcontracts/${resultData.clientContract}`)
        const ccData = await cc.json();
        const response = await fetch(`${BASE_URL}/cctrash`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientFirstName: ccData.clientFirstName,
                clientLastName: ccData.clientLastName,
                address: ccData.address,
                date: ccData.date,
                image: ccData.image,
                signed: ccData.signed,
                clientContract: ccData.clientContract
            })
        })
        const responseData = await response.json();
        
        // Update trash with new contract id
        const rtupdate = await fetch(`${BASE_URL}/reporttrash/${rtrashData.data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientFirstName: rtrashData.data.clientFirstName,
                clientLastName: rtrashData.data.clientLastName,
                clientEmail: rtrashData.data.clientEmail,
                clientPhone: rtrashData.data.clientPhone,
                address: rtrashData.data.address,
                city: rtrashData.data.city,
                state: rtrashData.data.state,
                price: rtrashData.data.price,
                date: rtrashData.data.date,
                image: rtrashData.data.image,
                completed: rtrashData.data.completed,
                template: rtrashData.data.template,
                clientContract: responseData.data._id,
                report: rtrashData.data.report
            })
        })
        const rtupdateData = await rtupdate.json();

        user.reports = user.reports.filter((tid) => tid != id)
        user.clientcontracts = user.clientcontracts.filter((rid) => rid != resultData.clientContract)
        repts.push(rtrashData.data._id)
        ccts.push()

        await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user
            })
        })

        // Delete old report and contract
        await fetch(`${BASE_URL}/clientcontracts/${resultData.clientContract}`, {
            method: 'DELETE'
        })
        await fetch(`${BASE_URL}/reports/${id}`, {
            method: 'DELETE'
        })        

        dispatch({
            type: TRASH_REPORT,
            payload: {
                id,
                index
            }
        })
    }
}

export const fetchReportTrash = () => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/reporttrash`)

        const resultData = await result.json();

        dispatch({
            type: FETCH_REPORT_TRASH,
            payload: resultData
        })
    }
}

export const deleteReport = (id, index, userId, user) => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/reporttrash/${id}`)
        const resultData = await result.json();

        await fetch(`${BASE_URL}/cctrash/${resultData.clientContract}`, {
            method: 'DELETE'
        })

        await fetch(`${BASE_URL}/reporttrash/${id}`, {
            method: 'DELETE'
        })

        user.reporttrash = user.reporttrash.filter((tid) => tid != id)
        user.cctrash = user.cctrash.filter((tid) => tid != id)

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
            type: DELETE_REPORT,
            payload: {
                id,
                index
            }
        })
    }
}

export const reportNotTrash = (id, userId, user) => {
    
    var repts = user.reports;
    var ccts = user.clientcontracts;

    return async dispatch => {

        const result = await fetch(`${BASE_URL}/reporttrash/${id}`)
        const resultData = await result.json();

        const reports = await fetch(`${BASE_URL}/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientFirstName: resultData.clientFirstName,
                clientLastName: resultData.clientLastName,
                clientEmail: resultData.clientEmail,
                clientPhone: resultData.clientPhone,
                address: resultData.address,
                city: resultData.city,
                state: resultData.state,
                price: resultData.price,
                date: resultData.date,
                image: resultData.image,
                completed: resultData.completed,
                template: resultData.template,
                clientContract: resultData.clientContract,
                report: resultData.report
            })
        })
        const reportData = await reports.json();

        const cc = await fetch(`${BASE_URL}/cctrash/${resultData.clientContract}`)
        const ccData = await cc.json();
        const response = await fetch(`${BASE_URL}/clientcontracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientFirstName: ccData.clientFirstName,
                clientLastName: ccData.clientLastName,
                address: ccData.address,
                date: ccData.date,
                image: ccData.image,
                signed: ccData.signed,
                clientContract: ccData.clientContract
            })
        })
        const responseData = await response.json();
        const reportOb = {
            report: {
                clientFirstName: reportData.data.clientFirstName,
                clientLastName: reportData.data.clientLastName,
                clientEmail: reportData.data.clientEmail,
                clientPhone: reportData.data.clientPhone,
                address: reportData.data.address,
                city: reportData.data.city,
                state: reportData.data.state,
                price: reportData.data.price,
                date: reportData.data.date,
                image: reportData.data.image,
                completed: reportData.data.completed,
                template: reportData.data.template,
                clientContract: responseData.data._id,
                report: reportData.data.report
            }
        };
        const report = reportOb.report;

        // Update trash with new contract id
        const rupdate = await fetch(`${BASE_URL}/reports/${reportData.data._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                report
            })
        })
        const rupdateData = await rupdate.json();

        user.reporttrash = user.reporttrash.filter((tid) => tid != id)
        user.cctrash = user.cctrash.filter((rid) => rid != resultData.clientContract)
        repts.push(reportData.data._id)
        ccts.push()

        await fetch(`${BASE_URL}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user
            })
        })


        await fetch(`${BASE_URL}/reporttrash/${id}`, {
            method: 'DELETE'
        })
        await fetch(`${BASE_URL}/cctrash/${resultData.clientContract}`, {
            method: 'DELETE'
        })

        dispatch({
            type: REPORT_NOT_TRASH,
            payload: {
                id
            }
        })
    }
}

export const emptyReportTrash = () => {
    return async dispatch => {
        await fetch(`${BASE_URL}/reporttrash`, {
            method: 'DELETE'
        })

        dispatch({
            type: EMPTY_REPORT_TRASH,
        })
    }
}

export const findTrashReport = (id) => {
    return async dispatch => {
        const result = await fetch(`${BASE_URL}/reporttrash/${id}`)

        const resultData = await result.json();
        dispatch({
            type: FIND_TRASH_REPORT,
            payload: resultData
        })
    }
}

export const getUserReports = (ids) => {
    var reps = [];
    return async dispatch => {
        for (var i = 0; i < ids.length; i++) {
            const response = await fetch(`${BASE_URL}/reports/${ids[i]}`)
            const responseData = await response.json();
            reps.push(responseData)
        }
        
        dispatch({
            type: GET_USER_REPORTS,
            payload: reps
        })
    } 
}

export const getUserRepTrash = (ids) => {
    var reps = [];
    return async dispatch => {
        for (var i = 0; i < ids.length; i++) {
            const response = await fetch(`${BASE_URL}/reporttrash/${ids[i]}`)
            const responseData = await response.json();
            reps.push(responseData)
        }
        
        dispatch({
            type: GET_USER_REP_TRASH,
            payload: reps
        })
    } 
}

export const addImages = images => ({
    type: ADD_IMAGES,
    payload: {
        images
    }
})

export const selectImage = (current, index) => ({
    type: SELECT_IMAGE,
    payload: {
        current,
        index
    }
})

export const removeImages = (images) => ({
    type: REMOVE_IMAGES,
    payload: {
        images
    }
})

export const addGallery = (newList) => ({
    type: ADD_GALLERY,
    payload: {
        newList
    }
})

export const changeGlobal = (index, value) => ({
    type: CHANGE_GLOBAL,
    payload: {
        index,
        value
    }
})
