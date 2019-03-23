import { 
    ADD_USER,
    REMOVE_USER,
    LOGGED_IN,
    LOAD_USER,
    CHANGE_DEFAULT_ACTIVE_KEY,
    TOGGLE_USER_MODAL_VISIBLE,
    EDIT_USER,
    UPDATE_USER,
    ADD_NEW_USER
} from '../actions/userActions'


//-- Initialize State
const initialState = {
    defaultActiveKey: "1",
    loggedIn: true,
    logStatus: 'Log Out',
    userList: [],
    modal: {
        modalVisible: false,
        modalTitle: 'Create a new user',
        okText: 'Create',
        userEditInfo: {
            name: '',
            email: '',
            password: '',
            mobile: '',
        },
    }
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case REMOVE_USER:
        case LOAD_USER:
        case ADD_USER:
        case UPDATE_USER:
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

        case ADD_NEW_USER:
        case EDIT_USER:
        case TOGGLE_USER_MODAL_VISIBLE:
            return Object.assign({}, state, {
                modal: action.payload.modal
            })
    }

    return state
}

export default userReducer;