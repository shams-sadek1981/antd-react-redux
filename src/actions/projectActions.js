import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

export const PROJECT_ADD_NEW = "PROJECT_ADD_NEW"
export const PROJECT_EDIT = "PROJECT_EDIT"
export const PROJECT_UPDATE = "PROJECT_UPDATE"
export const PROJECT_LOAD = "PROJECT_LOAD"
export const PROJECT_CHANGE_PAGINATION = "PROJECT_CHANGE_PAGINATION"
export const PROJECT_SPINNING = "PROJECT_SPINNING"
export const PROJECT_SEARCH_BY_RESULT = "PROJECT_SEARCH_BY_RESULT"
export const PROJECT_SEARCH_BY = "PROJECT_SEARCH_BY"
export const PROJECT_TOGGLE_MODAL_VISIBLE = "PROJECT_TOGGLE_MODAL_VISIBLE"
export const PROJECT_CHANGE_DEFAULT_ACTIVE_KEY = "PROJECT_TOGGLE_MODAL_VISIBLE"


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

/**
 * --------------------------------------------------------------------------------------------------
 * get all project
 * --------------------------------------------------------------------------------------------------
 */
export const getAllProject = () => (dispatch, getState) => {

    const searchUrl = `/project`

    return get(searchUrl)
        .then(data => {
            dispatch({
                type: PROJECT_LOAD,
                payload: {
                    list: data.result
                }
            })
        })
        .catch(err => console.log(err))
}


/**
 * 
 * @param {*} current 
 * @param {*} pageSize 
 * @param {*} text 
 */
const getResult = (current, pageSize, text) => {

    const searchUrl = `/project/list?page=${current}&pageSize=${pageSize}&text=${text}`

    return get(searchUrl)
        .then(data => data)
        .catch(err => console.log(err))
}

/**
 * ------------------------------------------------------------------------------------------
 * Project Result
 * ------------------------------------------------------------------------------------------
 */
export const SearchByResult = () => (dispatch, getState) => {

    let { searchBy, pagination } = getState().projectReducer
    let { current, pageSize } = pagination
    const { text } = searchBy


    getResult(current, pageSize, text)
        .then(data => {

            dispatch({
                type: PROJECT_SEARCH_BY_RESULT,
                payload: {
                    list: data.result,
                    pagination: data.pagination,
                }
            })

        }).catch(err => console.log(err))
}


/**
 * 
 * @param {*} fieldName 
 * @param {*} value 
 */
export const searchBy = (fieldName, value) => (dispatch, getState) => {

        dispatch(toggleSpinning(true))

        dispatch({
            type: PROJECT_SEARCH_BY,
            payload: {
                searchBy: {
                    text: value
                }
            }
        })

        //-- Load Result
        dispatch(SearchByResult())


        dispatch(toggleSpinning(false))

}


/**
 * //-- Change Pagination (Table Pagination)
 * @param {*} pagination 
 */
export const changePagination = (pagination) => {
    return (dispatch, getState) => {

        dispatch(toggleSpinning(true))

        dispatch({
            type: PROJECT_CHANGE_PAGINATION,
            payload: {
                pagination
            }
        })

        //-- Load Result
        dispatch(SearchByResult())

        dispatch(toggleSpinning(false))
    }
}

//-- Toggle Spinning
export const toggleSpinning = (booleanValue) => {
    return (dispatch, getState) => {

        const { spinning } = getState().projectReducer

        dispatch({
            type: PROJECT_SPINNING,
            payload: {
                spinning: booleanValue
            }
        })
    }
}



/**
 * ------------------------------------------------------------------------------------------------------
 * New Project
 * ------------------------------------------------------------------------------------------------------
 */

export const addNewProject = () => (dispatch, getState) => {

    const { modal } = getState().projectReducer

    const editInfo = {
        name: '',
        description: '',
    }

    dispatch({
        type: PROJECT_ADD_NEW,
        payload: {
            modal: {
                ...modal,
                modalTitle: 'Create a new project',
                okText: 'Create',
                editInfo
            }
        }
    })

    dispatch(toggleModalVisible())
}


/**
 * ----------- Toggle Modal Visible ------------
 */
export const toggleModalVisible = () => {
    return (dispatch, getState) => {

        const { modal } = getState().projectReducer

        dispatch({
            type: PROJECT_TOGGLE_MODAL_VISIBLE,
            payload: {
                modal: {
                    ...modal,
                    modalVisible: !modal.modalVisible
                }
            }
        })
    }
}



/**
 * 
 */
export const handleSubmit = (values) => {
    return (dispatch, getState) => {

        const { modal } = getState().projectReducer
        const { okText } = modal

        if (okText == "Create") {
            //-- Create New User
            dispatch(saveProject(values))
        } else {
            //-- Update user
            dispatch(updateProject(values))
        }
    }
}


/**
 * 
 */
export const saveProject = (values) => (dispatch, getState) => {

        post('/project/create', values)
            .then(data => {

                //-- Load Result
                dispatch(SearchByResult())

                dispatch(toggleModalVisible())

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Already exists this project'))
}



/**
 * ---- Update Project
 */
export const updateProject = (values) => (dispatch, getState) => {

        const { modal, list, pagination } = getState().projectReducer

        const { _id } = modal.editInfo

        put('/project/' + _id, values)
            .then(data => {

                //-- Load Result
                dispatch(SearchByResult())

                //-- Step-2
                dispatch(toggleModalVisible())
            })
}


/**
 * --- Remove Project ---
 */
export const removeProject = (id) => (dispatch, getState) => {

        deleteMethod('/project/' + id)
            .then(data => {
                //-- Load Result
                dispatch(SearchByResult())
            })
}


/**
 * ------------------------------------------------------------------------------------------------------
 * Edit Project
 * ------------------------------------------------------------------------------------------------------
 */
export const editProject = (id) => (dispatch, getState) => {

        const { list, modal } = getState().projectReducer

        const findUser = list.find(item => item._id == id)

        dispatch({
            type: PROJECT_EDIT,
            payload: {
                modal: {
                    ...modal,
                    modalTitle: 'Edit Project',
                    okText: 'Update',
                    editInfo: findUser
                }
            }
        })

        dispatch(toggleModalVisible())
}