import { 
    ADD_USER,
    REMOVE_USER,
    LOGGED_IN,
    LOAD_USER,
    CHANGE_DEFAULT_ACTIVE_KEY,
    TOGGLE_USER_MODAL_VISIBLE,
    EDIT_USER,
    UPDATE_USER,
    ADD_NEW_USER,
    USER_SEARCH_BY,
    USER_SEARCH_BY_RESULT,
    USER_SPINNING,
    USER_CHANGE_PAGINATION
} from '../actions/userActions'


//-- Initialize State
const initialState = {
    defaultActiveKey: "1",
    loggedIn: true,
    logStatus: 'Log Out',
    allUser: [],
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
            department: '',
        },
    },
    pagination: {
        current: 1,
        total: 0,
        pageSize: 10
    },
    spinning: false,
    searchBy: {
        text: '',
    },
    departmentList: [
        {
            name: 'Engineering'
        },
        {
            name: 'Design'
        },
        {
            name: 'Content & Marketing'
        },
        {
            name: 'Support'
        },
        {
            name: 'HR'
        },
    ]
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case REMOVE_USER:
        case ADD_USER:
        case UPDATE_USER:
        case USER_SEARCH_BY_RESULT:
            return Object.assign({}, state, {
                userList: action.payload.userList,
                pagination: action.payload.pagination
            })

        case LOAD_USER:
                return Object.assign({}, state, {
                    allUser: action.payload.allUser,
                })

        case USER_SEARCH_BY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
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

        case USER_SPINNING:
            return Object.assign({}, state, {
                spinning: action.payload.spinning
            })

        case USER_CHANGE_PAGINATION:
            return Object.assign({}, state, {
                pagination: action.payload.pagination
            })
    }

    return state
}

export default userReducer;