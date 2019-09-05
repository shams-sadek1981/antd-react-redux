import {
    notification
} from 'antd';

import axios from 'axios'

import { get, post, put, deleteMethod, postWithoutToken } from '../functions'
import Cookies from 'universal-cookie';
import { BrowserRouter, browserHistory } from 'react-router-dom'

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
export const USER_SEARCH_BY = "USER_SEARCH_BY"
export const USER_SPINNING = "USER_SPINNING"
export const USER_SEARCH_BY_RESULT = "USER_SEARCH_BY_RESULT"
export const USER_CHANGE_PAGINATION = "USER_CHANGE_PAGINATION"
export const USER_SET_PERMISSIONS = "USER_SET_PERMISSIONS"

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

//-- initialize cookies
const cookies = new Cookies();

const manageCookie = (values) => {

    const { email, password, remember } = values

    if (remember) {
        cookies.set('password', password, { path: '/login' });
        cookies.set('email', email, { path: '/login' });
        cookies.set('remember', remember, { path: '/login' });
    }
    // else{
    //     cookies.remove('email', { path: '/login' });
    //     cookies.remove('password', { path: '/login' });
    //     cookies.remove('remember', { path: '/login' });
    // }
}

export const getPermissions = () => async (dispatch, getState) => {
    
    const url =  await process.env.REACT_APP_HOST + '/users/permissions'
    const token = await localStorage.getItem('token')

    await axios.get(url, {
        headers: {
            Authorization: token //the token is a variable which holds the token
        }
    }).then(result => {
            dispatch({
                type: USER_SET_PERMISSIONS,
                payload: {
                    permissions: result.data.userInfo.permissions,
                    userInfo: result.data.userInfo,
                }
            })
        }).catch(err => console.log(err))
}

/**
 * 
 * @param {*} history 
 * @param {*} userInfo 
 * @param {*} values 
 */
export const userLogin = (history, userInfo, values) => (dispatch, getState) => {

    postWithoutToken('/users/login', userInfo)
        .then(async data => {

            //-- set token in local storage
            await localStorage.setItem('token', data.token)

            //-- manage cookie
            await manageCookie(values)


            await history.push('/admin-panel')

        })
        .catch(err => openNotificationWithIcon('error', err.message, 'Your password or email is mismatch'))
}

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
            .then(data => {

                const findIndex = userList.findIndex(item => item._id == _id)

                let newUserList = [
                    ...userList.slice(0, findIndex),
                    data,
                    ...userList.slice(findIndex + 1)
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
            roles: []
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

        if (users.allUser.length > 0) return;

        const userList = get('/users/all-user')

        userList.then(data => {
            if (data) {
                dispatch({
                    type: LOAD_USER,
                    payload: {
                        allUser: data
                    }
                })
            }
        })
    }
}



/**
 * ----------------------------------------------------------------------------------------------------
 * get Result Helper function
 * ----------------------------------------------------------------------------------------------------
 * @param {*} current 
 * @param {*} name 
 * @param {*} project 
 * @param {*} status 
 * @param {*} text 
 */

const getTaskResult = (current, pageSize, text) => {

    const searchUrl = `/users/list?page=${current}&pageSize=${pageSize}&text=${text}`

    return get(searchUrl)
        .then(data => data)
        .catch(err => console.log(err))
}

/**
 * ------------------------------------------------------------------------------------------
 * User Result
 * ------------------------------------------------------------------------------------------
 */
export const userSearchByResult = () => {
    return (dispatch, getState) => {

        let { searchBy, pagination } = getState().userReducer
        let { current, pageSize } = pagination
        const { text } = searchBy


        getTaskResult(current, pageSize, text)
            .then(data => {

                dispatch({
                    type: USER_SEARCH_BY_RESULT,
                    payload: {
                        userList: data.result,
                        pagination: data.pagination,
                    }
                })

            }).catch(err => console.log(err))
    }
}//-- end function


//-- Toggle Spinning
export const toggleSpinning = (booleanValue) => {
    return (dispatch, getState) => {

        const { spinning } = getState().userReducer

        dispatch({
            type: USER_SPINNING,
            payload: {
                spinning: booleanValue
            }
        })
    }
}

export const searchBy = (fieldName, value) => {
    return (dispatch, getState) => {

        dispatch(toggleSpinning(true))

        // let { searchBy, pagination } = getState().userReducer
        // let { current, pageSize } = pagination
        // // const { text } = searchBy

        dispatch({
            type: USER_SEARCH_BY,
            payload: {
                searchBy: {
                    text: value
                }
            }
        })

        //-- Load Result
        dispatch(userSearchByResult())


        dispatch(toggleSpinning(false))

    }
}//-- end

//-- Change Pagination (Table Pagination)
export const changePagination = (pagination) => {
    return (dispatch, getState) => {

        console.log(pagination)
        dispatch(toggleSpinning(true))

        dispatch({
            type: USER_CHANGE_PAGINATION,
            payload: {
                pagination
            }
        })

        //-- Load Result
        dispatch(userSearchByResult())

        dispatch(toggleSpinning(false))
    }
}