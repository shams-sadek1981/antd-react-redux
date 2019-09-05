import {
    notification
} from 'antd';

import axios from 'axios'

import { get, post, put, deleteMethod, postWithoutToken } from '../functions'
import Cookies from 'universal-cookie';
import { BrowserRouter, browserHistory } from 'react-router-dom'

//-- Define action names
export const USER_ROLE_ADD = "USER_ROLE_ADD"
export const USER_ROLE_EDIT = "USER_ROLE_EDIT"
export const USER_ROLE_UPDATE = "USER_ROLE_UPDATE"
export const USER_ROLE_TOGGLE_MODAL_VISIBLE = "USER_ROLE_TOGGLE_MODAL_VISIBLE"
export const USER_ROLE_SPINNING = "USER_ROLE_SPINNING"
export const USER_ROLE_CHANGE_DEFAULT_ACTIVE_KEY = "USER_ROLE_CHANGE_DEFAULT_ACTIVE_KEY"
export const USER_ROLE_SEARCH_BY_RESULT = "USER_ROLE_SEARCH_BY_RESULT"
export const USER_ROLE_SEARCH_BY_ROLE_ID = "USER_ROLE_SEARCH_BY_ROLE_ID"
export const USER_ROLE_PERMISSION_LIST = "USER_ROLE_PERMISSION_LIST"
export const USER_ROLE_CHANGE_PERMISSION = "USER_ROLE_CHANGE_PERMISSION"
export const USER_ROLE_CHANGE_ALL_PERMISSION = "USER_ROLE_CHANGE_ALL_PERMISSION"

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};


export const toggleModalVisible = () => (dispatch, getState) => {

    const { modal } = getState().userRoleReducer

    dispatch({
        type: USER_ROLE_TOGGLE_MODAL_VISIBLE,
        payload: {
            modal: {
                ...modal,
                modalVisible: !modal.modalVisible
            }
        }
    })
}


/**
 * -----------------------------------------------------------------
 * Add New Role
 * -----------------------------------------------------------------
 */
export const addNewRole = () => (dispatch, getState) => {

    const { modal } = getState().userRoleReducer

    const editInfo = {
        name: '',
        description: '',
    }

    dispatch({
        type: USER_ROLE_ADD,
        payload: {
            modal: {
                ...modal,
                modalTitle: 'Create a new role',
                okText: 'Create',
                editInfo
            }
        }
    })

    dispatch(toggleModalVisible())
}

/**
 * 
 * @param {*} fieldName 
 * @param {*} value 
 */
export const searchBy = (fieldName, value) => {
    return (dispatch, getState) => {

        dispatch(toggleSpinning(true))

        // let { searchBy, pagination } = getState().userReducer
        // let { current, pageSize } = pagination
        // // const { text } = searchBy

        dispatch({
            type: 'USER_ROLE_SEARCH_BY',
            payload: {
                searchBy: {
                    text: value
                }
            }
        })

        //-- Load Result
        // dispatch(userSearchByResult())


        dispatch(toggleSpinning(false))

    }
}

/**
 * Handle Submit
 * @param {*} values 
 */
export const handleSubmit = (values) => {
    return (dispatch, getState) => {

        const { modal } = getState().userRoleReducer
        const { okText } = modal

        if (okText == "Create") {
            //-- Create New User
            dispatch(saveRole(values))
        } else {
            //-- Update user
            dispatch(updateRole(values))
        }
    }
}

/**
 * --- Save user ---
 * @param {*} values
 */
export const saveRole = (values) => {

    return (dispatch, getState) => {

        let { userRoleList } = getState().userRoleReducer

        post('/user-role', values)
            .then(data => {

                dispatch(userRoleSearchByResult())
                //-- change default active key
                // dispatch(changeDefaultActiveKey('1'))

                dispatch(toggleModalVisible())

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Already exists this role'))
    }
}

//-- Update User
export const updateRole = (values) => (dispatch, getState) => {

    const { modal, roleList } = getState().userRoleReducer

    const { _id } = modal.editInfo


    put('/user-role/' + _id, values)
        .then(data => {

            console.log(data)

            const findIndex = roleList.findIndex(item => item._id == _id)

            let newRoleList = [
                ...roleList.slice(0, findIndex),
                data,
                ...roleList.slice(findIndex + 1)
            ]

            //-- Step-1
            dispatch({
                type: USER_ROLE_UPDATE,
                payload: {
                    roleList: newRoleList,
                }
            })

            //-- Step-2
            dispatch(toggleModalVisible())
        })
}


//-- Toggle Spinning
export const toggleSpinning = (booleanValue) => {
    return (dispatch, getState) => {

        const { spinning } = getState().userRoleReducer

        dispatch({
            type: USER_ROLE_SPINNING,
            payload: {
                spinning: booleanValue
            }
        })
    }
}

/**
 * Default Active Key
 * @param {*} keyNo 
 */
export const changeDefaultActiveKey = (keyNo) => (dispatch, getState) => {
    dispatch({
        type: USER_ROLE_CHANGE_DEFAULT_ACTIVE_KEY,
        payload: {
            defaultActiveKey: keyNo
        }
    })
}


/**
 * ------------------------------------------------------------------------------------------
 * User Role Result
 * ------------------------------------------------------------------------------------------
 */
export const userRoleSearchByResult = () => {
    return (dispatch, getState) => {

        let { searchBy, pagination } = getState().userRoleReducer
        let { current, pageSize } = pagination
        const { text } = searchBy


        getResult(current, pageSize, text)
            .then(data => {

                dispatch({
                    type: USER_ROLE_SEARCH_BY_RESULT,
                    payload: {
                        roleList: data.result,
                        // pagination: data.pagination,
                    }
                })

            }).catch(err => console.log(err))
    }
}//-- end function

/**
 * 
 * @param {*} current 
 * @param {*} pageSize 
 * @param {*} text 
 */
const getResult = (current, pageSize, text) => {

    const searchUrl = `/user-role?page=${current}&pageSize=${pageSize}&text=${text}`

    return get(searchUrl)
        .then(data => data)
        .catch(err => console.log(err))
}


/**
 * --- Remove Role ---
 * @param {*} id 
 */
export const removeRole = (id) => (dispatch, getState) => {
    deleteMethod('/user-role/' + id)
        .then(data => {
            dispatch(userRoleSearchByResult())
        })
}


/**
 * ------------------------------------------------------------------------------------------------------
 * Edit User
 * ------------------------------------------------------------------------------------------------------
 */
export const editRole = (id) => (dispatch, getState) => {

    const { roleList, modal } = getState().userRoleReducer

    const findRole = roleList.find(item => item._id == id)

    dispatch({
        type: USER_ROLE_EDIT,
        payload: {
            modal: {
                ...modal,
                modalTitle: 'Edit Role',
                okText: 'Update',
                editInfo: findRole
            }
        }
    })

    dispatch(toggleModalVisible())
}


/**
 * 
 * @param {*} _id 
 */
export const searchByUserRoleID = (_id) => (dispatch, getState) => {

    get('/user-role/' + _id)
        .then(data => {
            dispatch({
                type: USER_ROLE_SEARCH_BY_ROLE_ID,
                payload: {
                    roleItem: data
                }
            })
        })
        .catch(err => console.log(err))
}


export const getUserPermissionList = () => (dispatch, getState) => {

    get('/user-permission')
        .then(data => {
            dispatch({
                type: USER_ROLE_PERMISSION_LIST,
                payload: {
                    permissionList: data.result,
                    plainOptions: data.plainOptions
                }
            })
        })
        .catch(err => console.log(err))
}

/**
 * Permission OnChange
 */
export const permissionOnChange = (checkedList) => (dispatch, getState) => {

    const permissionList = checkedList.map( item => ({
        permissionName: item
    }))

    const { _id } = getState().userRoleReducer.roleItem

    put('/user-role/' + _id, {
        permissions: permissionList
    }).then( data => {

        dispatch({
            type: USER_ROLE_CHANGE_PERMISSION,
            payload: {
                roleItem: data
            }
        })
    })
    .catch( err => console.log(err))
}


/**
 * Chaek All Permission
 */
export const checkAllOnChange = (checkAll) => (dispatch, getState) => {

    const { permissionList, roleItem } = getState().userRoleReducer

    const { _id } = roleItem
    
    let newCheckedList = []
    if( checkAll ) {
        newCheckedList = permissionList.map( item => ({
            permissionName: item.name
        }))
    }

    put('/user-role/' + _id, {
        permissions: newCheckedList
    }).then( data => {
        dispatch({
            type: USER_ROLE_CHANGE_ALL_PERMISSION,
            payload: {
                roleItem: data,
                checkAll
            }   
        })
    })
    .catch( err => console.log(err))
    
}