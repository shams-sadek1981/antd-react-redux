import {
    UPCOMING_TASK_SPINNING,
    UPCOMING_TASK_LOAD,
    UPCOMING_TASK_TOGGLE_MODAL_VISIBLE,
    UPCOMING_TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE,
    UPCOMING_TASK_EDIT_TASK,
    UPCOMING_TASK_REMOVE_TASK,
    UPCOMING_TASK_UPDATE_TASK,
    UPCOMING_TASK_ADD_NEW_TASK,
    UPCOMING_TASK_SEARCH_BY_USER,
    UPCOMING_TASK_CAL_EST_HOUR,
    UPCOMING_TASK_SEARCH_BY,
} from '../actions/upcomingTaskActions'

import {
    TASK_ADD_NEW_SUB_TASK,
    TASK_SAVE_NEW_SUB_TASK,
    TASK_DELETE_SUB_TASK,
    TASK_EDIT_SUB_TASK,
    TASK_UPDATE_SUB_TASK,
    TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE
} from '../actions/task/subTaskActions'

//-- Initialize State
const initialState = {
    spinning: false,
    taskList: [],
    "totalTask": 1,
    "totalEstHour": 412,
    "totalSubTask": 5,
    "userName": "Hadi",
    "userEstHour": 0,
    "userTotalSubTask": 0,
    modal: {
        modalVisible: false,
        modalTitle: 'Create a new task',
        okText: 'Create',
        EditInfo: {
            taskName: '',
            description: '',
            projectName: '',
            taskType: '',
            estHour: '',
            assignedUser: ''
        }
    },
    subTaskModal: {
        modalVisible: false,
        taskId: '',
        modalTitle: 'Create Sub Task',
        okText: 'Create',
        EditInfo: {
            name: '',
            estHour: '',
            assignedUser: ''
        }
    },
    taskTypes: [
        'New Feature',
        'Plugin Issue',
        'Enhancement',
        'R&D'
    ],
    projects: [
        'All Plugin',
        'Dokan',
        'weMail',
        'WPUF',
        'weForms',
        'ERP',
        'Project Manager',
        'POS'
    ],
    nameColors: [
        {
            name: 'Mishu',
            color: 'magenta'
        },
        {
            name: 'Sabbir',
            color: 'green'
        },
    ],
    searchBy: {
        project: 'all',
        name: 'all'
    }

}

const upcomingTaskReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPCOMING_TASK_SPINNING:
            return Object.assign({}, state, {
                spinning: action.payload.spinning
            })

        case TASK_DELETE_SUB_TASK:
        case TASK_SAVE_NEW_SUB_TASK:
        case UPCOMING_TASK_UPDATE_TASK:
        case UPCOMING_TASK_REMOVE_TASK:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
            })

        case UPCOMING_TASK_LOAD:
        case UPCOMING_TASK_SEARCH_BY_USER:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
                "totalTask": action.payload.totalTask,
                "totalEstHour": action.payload.totalEstHour,
                "totalSubTask": action.payload.totalSubTask,
                "userName": action.payload.userName,
                "userEstHour": action.payload.userEstHour,
                "userTotalSubTask": action.payload.userTotalSubTask
            })

        case UPCOMING_TASK_ADD_NEW_TASK:
        case UPCOMING_TASK_EDIT_TASK:
        case UPCOMING_TASK_TOGGLE_MODAL_VISIBLE:
            return Object.assign({}, state, {
                modal: action.payload.modal
            })


        case TASK_ADD_NEW_SUB_TASK:
        case TASK_EDIT_SUB_TASK:
        case TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE:
            return Object.assign({}, state, {
                subTaskModal: action.payload.subTaskModal
            })

        case UPCOMING_TASK_CAL_EST_HOUR:
            return Object.assign({}, state, {
                totalEstHour: action.payload.totalEstHour
            })

        case UPCOMING_TASK_SEARCH_BY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy
            })

        case TASK_UPDATE_SUB_TASK:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
                subTaskModal: action.payload.subTaskModal
            })
    }

    return state;
}

export default upcomingTaskReducer;