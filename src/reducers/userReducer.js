import { ADD_USER, REMOVE_USER, LOGGED_IN } from '../actions/userActions'

const initialState = {
    loggedIn: true,
    logStatus: 'Log Out',
    userList: [
        {
            name: 'Shams Sadek',
            age: 36
        },
        {
            name: 'Faiza Fatema',
            age: 9
        },
        {
            name: 'Nazmun Nahar',
            age: 32
        }
    ]
}

const userReducer = (state=initialState, action ) => {
    
    switch ( action.type ) {
        case ADD_USER:
        return Object.assign({}, state, {
            userList: action.payload.userList
        })

        case LOGGED_IN:
            return Object.assign({}, state, {
                loggedIn: action.payload.loggedIn,
                logStatus: action.payload.logStatus,
                userList: action.payload.userList,
            })
        default:
        return state
    }
}

export default userReducer;