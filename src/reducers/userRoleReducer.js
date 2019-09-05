import {
    USER_ROLE_ADD,
    USER_ROLE_EDIT,
    USER_ROLE_UPDATE,
    USER_ROLE_TOGGLE_MODAL_VISIBLE,
    USER_ROLE_CHANGE_DEFAULT_ACTIVE_KEY,
    USER_ROLE_SEARCH_BY_RESULT,
    USER_ROLE_SEARCH_BY_ROLE_ID,
    USER_ROLE_PERMISSION_LIST,
    USER_ROLE_CHANGE_PERMISSION,
    USER_ROLE_CHANGE_ALL_PERMISSION
} from '../actions/userRoleActions'


//-- Initialize State
const initialState = {
    defaultActiveKey: "2",
    roleList: [],
    roleItem: {
        _id: '',
        name: '',
        description: "",
        permissions: []
    },
    permissionList: [],
    plainOptions: [],
    checkedList: ['create_upcoming_task', 'delete_upcoming_task'],
    indeterminate: true,
    checkAll: false,
    modal: {
        modalVisible: false,
        modalTitle: 'Create a new role',
        okText: 'Create',
        editInfo: {
            name: '',
            description: '',
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
    }
    
}

const userRoleReducer = (state = initialState, action) => {

    switch (action.type) {
        // case REMOVE_USER:
        // case ADD_USER:
        case USER_ROLE_UPDATE:
        case USER_ROLE_SEARCH_BY_RESULT:
            return Object.assign({}, state, {
                roleList: action.payload.roleList,
                // pagination: action.payload.pagination
            })

        case USER_ROLE_ADD:
        case USER_ROLE_EDIT:
            return Object.assign({}, state, {
                modal: action.payload.modal
                // pagination: action.payload.pagination
            })

        
        case USER_ROLE_CHANGE_DEFAULT_ACTIVE_KEY:
            return Object.assign({}, state, {
                defaultActiveKey: action.payload.defaultActiveKey
            })

        case USER_ROLE_CHANGE_ALL_PERMISSION:
            return Object.assign({}, state, {
                roleItem: action.payload.roleItem,
                checkAll: action.payload.checkAll,
                indeterminate: action.payload.indeterminate,
            })

        case USER_ROLE_PERMISSION_LIST:
            return Object.assign({}, state, {
                permissionList: action.payload.permissionList,
                plainOptions: action.payload.plainOptions
            })

        case USER_ROLE_CHANGE_PERMISSION:
        case USER_ROLE_SEARCH_BY_ROLE_ID:
            return Object.assign({}, state, {
                roleItem: action.payload.roleItem,
                // checkedList: action.payload.checkedList
            })

        // case ADD_NEW_USER:
        // case EDIT_USER:
        case USER_ROLE_TOGGLE_MODAL_VISIBLE:
            return Object.assign({}, state, {
                modal: action.payload.modal
            })

        // case USER_SPINNING:
        //     return Object.assign({}, state, {
        //         spinning: action.payload.spinning
        //     })

        // case USER_CHANGE_PAGINATION:
        //     return Object.assign({}, state, {
        //         pagination: action.payload.pagination
        //     })

        // case USER_SET_PERMISSIONS:
        //     return Object.assign({}, state, {
        //         permissions: action.payload.permissions,
        //         userInfo: action.payload.userInfo
        //     })
    }

    return state
}

export default userRoleReducer;