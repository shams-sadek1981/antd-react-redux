import {
    notification
} from 'antd';

import { get, post, deleteMethod } from '../functions'

//-- Define action names
export const ADD_USER = "ADD_USER"
export const REMOVE_USER = "REMOVE_USER"
export const UPDATE_USER = "UPDATE_USER"
export const LOGGED_IN = "LOGGED_IN"
export const LOAD_USER = "LOAD_USER"
export const CHANGE_DEFAULT_ACTIVE_KEY = "CHANGE_DEFAULT_ACTIVE_KEY"

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

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

export const addUser = (values) => {

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

export const removeUser = (id) => {

    return (dispatch, getState) => {
        
        let { userList } = getState().userReducer
        
        deleteMethod('/users/delete/' + id)
            .then( data => {
        
                const newUserList = userList.filter( item => item._id != id)

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

// export const updateUser = (findUser, updateUser) => {
//     return ( dispatch, getState ) => {

//         dispatch({
//             type: UPDATE_USER,
//             payload: {
//                 find
//             }
//         })
//     }
// }