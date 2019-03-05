//-- Define action names
export const ADD_USER = "ADD_USER"
export const REMOVE_USER = "REMOVE_USER"
export const UPDATE_USER = "UPDATE_USER"
export const LOGGED_IN = "LOGGED_IN"

export const changeLoggedIn = () => {
    return (dispatch, getState) => {

        const userInfo = getState().userReducer
        const loggedIn = ! userInfo.loggedIn
        let logStatus = 'Log In'
        if (loggedIn) {
            logStatus = 'Log Out'
        }

        let userList = [
            {
                name: 'Saidul Islam',
                age: 22
            },
            {
                name: 'Farazi',
                age: 29
            },
        ]
        
        dispatch({
            type: LOGGED_IN,
            payload: {
                loggedIn,
                logStatus,
                userList
            }
        })
    }
}

export const addUser = (evt, userInfo) => {
    evt.preventDefault()
    return (dispatch, getState) => {

        console.log(evt)

        dispatch({
            type: ADD_USER,
            payload: {
                userList: userInfo
            }
        })

    }
}

export const removeUser = (userName) => {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_USER,
            payload: {
                userName: userName
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