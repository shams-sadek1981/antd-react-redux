import {
    RELEASE_TOGGLE_SUB_TASK_MODAL_VISIBLE,
    RELEASE_REMOVE_TASK,
    RELEASE_UPDATE_ITEM,
    RELEASE_CAL_EST_HOUR,
    RELEASE_CHANGE_PAGINATION,
} from '../actions/releaseActions'

import {
    SPRINT_ADD_NEW,
    SPRINT_TOGGLE_MODAL_VISIBLE,
    SPRINT_SEARCH_BY_RESULT,
    SPRINT_EDIT_ITEM,
    SPRINT_CHANGE_TABKEY,
    SPRINT_BY_UPCOMING_TASK,
    SPRINT_SPINNING,
    SPRINT_SEARCH_BY
} from '../actions/sprintActions'


//-- Initialize State
const initialState = {
    tabKey: "1",
    pagination: {
        current: 1,
        total: 0,
        pageSize: 10
    },
    searchBy: {
        project: 'all',
        name: 'all',
        text: '',
        status: false
    },
    taskList:[],
    spinning: false,
    list: [],
    modal: {
        modalVisible: false,
        modalTitle: 'Create a new sprint',
        okText: 'Create',
        EditInfo: {
            projects: [],
            name: '',
            description: '',
            startDate: '',
            endDate: '',
        }
    },
    projects: [
        'All Plugin',
        'Dokan',
        'Dokan App',
        'weMail',
        'WPUF',
        'weForms',
        'ERP',
        'Project Manager',
        'wePOS'
    ],
}

const sprintReducer = (state = initialState, action) => {

    switch (action.type) {

        case SPRINT_SPINNING:
            return Object.assign({}, state, {
                spinning: action.payload.spinning
            })

        case RELEASE_UPDATE_ITEM:
        case RELEASE_REMOVE_TASK:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
            })

        case SPRINT_SEARCH_BY_RESULT:
            return Object.assign({}, state, {
                list: action.payload.list,
                // pagination: action.payload.pagination,
                // "totalEstHour": action.payload.totalEstHour,
                // "totalSubTask": action.payload.totalSubTask,
                // "userName": action.payload.userName,
                // "userEstHour": action.payload.userEstHour,
                // "userTotalSubTask": action.payload.userTotalSubTask
            })

        case SPRINT_ADD_NEW:
        case SPRINT_EDIT_ITEM:
        case SPRINT_TOGGLE_MODAL_VISIBLE:
            return Object.assign({}, state, {
                modal: action.payload.modal
            })


        case RELEASE_CAL_EST_HOUR:
            return Object.assign({}, state, {
                totalEstHour: action.payload.totalEstHour
            })

        case SPRINT_CHANGE_TABKEY:
            return Object.assign({}, state, {
                tabKey: action.payload.tabKey,
                searchBy: action.payload.searchBy,
                pagination: action.payload.pagination,
                list: action.payload.list,
            })

        case SPRINT_SEARCH_BY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                pagination: action.payload.pagination
            })

        case RELEASE_CHANGE_PAGINATION:
            return Object.assign({}, state, {
                pagination: action.payload.pagination
            })
            
        case SPRINT_BY_UPCOMING_TASK:
            return Object.assign({}, state, {
                taskList: action.payload.taskList
            })
    }

    return state;
}

export default sprintReducer;