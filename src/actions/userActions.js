import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

//-- Define action names
export const ADD_USER = "ADD_USER"
export const REMOVE_USER = "REMOVE_USER"
export const LOGGED_IN = "LOGGED_IN"
export const LOAD_USER = "LOAD_USER"
export const CHANGE_DEFAULT_ACTIVE_KEY = "CHANGE_DEFAULT_ACTIVE_KEY"
export const TOGGLE_USER_MODAL_VISIBLE = "TOGGLE_USER_MODAL_VISIBLE"
export const EDIT_USER = "EDIT_USER"
export const UPDATE_USER = "UPDATE_USER"
export const ADD_NEW_USER = "ADD_NEW_USER"

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};


export const handleSubmit = (values) => {
    return (dispatch, getState) => {

        const { modal } = getState().userReducer
        const { okText } = modal

        if (okText == "Create") {
            //-- Create New User
            dispatch(saveUser(values))
        } else {
            //-- Update user
            dispatch(updateUser(values))
        }
    }
}


export const toggleModalVisible = () => {
    return (dispatch, getState) => {

        const { modal } = getState().userReducer

        dispatch({
            type: TOGGLE_USER_MODAL_VISIBLE,
            payload: {
                modal: {
                    ...modal,
                    modalVisible: !modal.modalVisible
                }
            }
        })
    }
}

export const changeLoggedIn = () => {
    return (dispatch, getState) => {

        const userInfo = getState().userReducer
        const loggedIn = !userInfo.loggedIn
        let logStatus = 'Log In'
        if (loggedIn) {
            logStatus = 'Log Out'
        }

        dispatch({
            type: LOGGED_IN,
            payload: {
                loggedIn,
                logStatus,
            }
        })
    }
}



/**
 * ------------------------------------------------------------------------------------------------------
 * Edit User
 * ------------------------------------------------------------------------------------------------------
 */
export const editUser = (id) => {
    return (dispatch, getState) => {

        const { userList, modal } = getState().userReducer

        const findUser = userList.find(item => item._id == id)

        dispatch({
            type: EDIT_USER,
            payload: {
                modal: {
                    ...modal,
                    modalTitle: 'Edit user',
                    okText: 'Update',
                    userEditInfo: findUser
                }
            }
        })

        dispatch(toggleModalVisible())
    }
}

//-- Update User
export const updateUser = (values) => {
    return (dispatch, getState) => {

        const { modal, userList } = getState().userReducer

        const { _id } = modal.userEditInfo

        put('/users/update/' + _id, values)
            .then( data => {

                const findIndex = userList.findIndex( item => item._id == _id)

                let newUserList = [
                    ...userList.slice(0,findIndex),
                    data,
                    ...userList.slice(findIndex+1)
                ]

                //-- Step-1
                dispatch({
                    type: UPDATE_USER,
                    payload: {
                        userList: newUserList,
                    }
                })

                //-- Step-2
                dispatch(toggleModalVisible())
            })
    }
}


/**
 * ------------------------------------------------------------------------------------------------------
 * New User
 * ------------------------------------------------------------------------------------------------------
 */

export const addNewUser = () => {
    return (dispatch, getState) => {

        const { modal } = getState().userReducer

        const userEditInfo = {
            name: '',
            email: '',
            password: '',
            mobile: '',
        }

        dispatch({
            type: ADD_NEW_USER,
            payload: {
                modal: {
                    ...modal,
                    modalTitle: 'Create a new user',
                    okText: 'Create',
                    userEditInfo
                }
            }
        })

        dispatch(toggleModalVisible())
    }
}

export const saveUser = (values) => {

    return (dispatch, getState) => {

        let { userList } = getState().userReducer

        post('/users/signup', values)
            .then(data => {

                userList.push(data.user)

                dispatch({
                    type: ADD_USER,
                    payload: {
                        userList
                    }
                })

                //-- change default active key
                dispatch(changeDefaultActiveKey('1'))

                dispatch(toggleModalVisible())

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Already exists the user'))
    }
}

export const changeDefaultActiveKey = (keyNo) => {

    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_DEFAULT_ACTIVE_KEY,
            payload: {
                defaultActiveKey: keyNo
            }
        })

    }
}

//-- Remove user
export const removeUser = (id) => {

    return (dispatch, getState) => {

        let { userList } = getState().userReducer

        deleteMethod('/users/delete/' + id)
            .then(data => {

                const newUserList = userList.filter(item => item._id != id)

                dispatch({
                    type: REMOVE_USER,
                    payload: {
                        userList: newUserList
                    }
                })
            })
    }
}


export const loadUser = () => {
    return (dispatch, getState) => {

        const users = getState().userReducer

        if (users.userList.length > 0) return;

        const userList = get('/users/list')

        userList.then(data => {
            if (data.result) {
                dispatch({
                    type: LOAD_USER,
                    payload: {
                        userList: data.result
                    }
                })
            }
        })
    }
}