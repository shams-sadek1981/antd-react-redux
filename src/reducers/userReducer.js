import { 
    ADD_USER,
    REMOVE_USER,
    LOGGED_IN,
    LOAD_USER,
    CHANGE_DEFAULT_ACTIVE_KEY
} from '../actions/userActions'

const initialState = {
    defaultActiveKey: "1",
    loggedIn: true,
    logStatus: 'Log Out',
    userList: [],
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case REMOVE_USER:
        case LOAD_USER:
        case ADD_USER:
            return Object.assign({}, state, {
                userList: action.payload.userList
            })

        case LOGGED_IN:
            return Object.assign({}, state, {
                loggedIn: action.payload.loggedIn,
                logStatus: action.payload.logStatus
            })
        
        case CHANGE_DEFAULT_ACTIVE_KEY:
            return Object.assign({}, state, {
                defaultActiveKey: action.payload.defaultActiveKey
            })
    }

    return state
}

export default userReducer;