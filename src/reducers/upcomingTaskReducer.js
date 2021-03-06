import {
    UPCOMING_TASK_SPINNING,
    UPCOMING_TASK_TOGGLE_MODAL_VISIBLE,
    UPCOMING_TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE,
    UPCOMING_TASK_EDIT_TASK,
    UPCOMING_TASK_REMOVE_TASK,
    UPCOMING_TASK_ADD_NEW_TASK,
    UPCOMING_TASK_CAL_EST_HOUR,
    UPCOMING_TASK_SEARCH_BY,
    UPCOMING_TASK_SEARCH_BY_RESULT,
    UPCOMING_TASK_CHANGE_TABKEY,
    UPCOMING_TASK_CHANGE_PAGINATION,
    UPCOMING_TASK_LOAD_RELEASE,
    UPCOMING_TASK_LOAD_SPRINT,
    UPCOMING_TASK_NEWLY_ADDED
} from '../actions/upcomingTaskActions'

import {
    TASK_ADD_NEW_SUB_TASK,
    TASK_SAVE_NEW_SUB_TASK,
    TASK_DELETE_SUB_TASK,
    TASK_EDIT_SUB_TASK,
    TASK_UPDATE_SUB_TASK,
    TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE
} from '../actions/task/subTaskActions'
import moment from 'moment'

//-- Initialize State
const initialState = {
    tabKey: "1",
    pagination: {
        current: 1,
        total: 0,
        pageSize: 10
    },
    searchBy: {
        project: ['all'],
        name: 'all',
        text: '',
        completedAt: null,
        running: false,
        newlyAdded: true,
        releaseStatus: 'all'
    },
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
        release: 'Pro v2.3.4',
        EditInfo: {
            taskName: '',
            description: '',
            projectName: '',
            taskType: '',
            estHour: '',
            assignedUser: ''
        }
    },
    releaseList: [{
        version: 'Pro v2.3.4'
    }],
    sprintList: [{
        // name: 'ERP Sprint Oct-2019'
    }],
    subTaskModal: {
        modalVisible: false,
        taskId: '',
        taskName: 'Elementor',
        modalTitle: 'Create Sub Task',
        okText: 'Create',
        EditInfo: {
            name: '',
            estHour: '',
            timeLog: '',
            assignedUser: ''
        },
        startDate: null
    },
    taskTypes: [
        'New Feature',
        'Plugin Issue',
        'Enhancement',
        'R&D'
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
    subTaskList: ['API','SRS', 'R&D', 'Mockup', 'Design', 'Frontend', 'Develop', 'Merge', 'Testing', 'Documentation']
}

const upcomingTaskReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPCOMING_TASK_SPINNING:
            return Object.assign({}, state, {
                spinning: action.payload.spinning
            })

        case TASK_DELETE_SUB_TASK:
        case TASK_SAVE_NEW_SUB_TASK:
        case UPCOMING_TASK_REMOVE_TASK:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
            })

        case UPCOMING_TASK_SEARCH_BY_RESULT:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
                pagination: action.payload.pagination,
                "totalEstHour": action.payload.totalEstHour,
                "totalSubTask": action.payload.totalSubTask,
                "userName": action.payload.userName,
                "userEstHour": action.payload.userEstHour,
                "userTotalSubTask": action.payload.userTotalSubTask
            })

        case UPCOMING_TASK_ADD_NEW_TASK:
            return Object.assign({}, state, {
                modal: action.payload.modal,
                searchBy: action.payload.searchBy
            })

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


        case TASK_UPDATE_SUB_TASK:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
                subTaskModal: action.payload.subTaskModal
            })

        // case UPCOMING_TASK_CHANGE_TABKEY:
        //     return Object.assign({}, state, {
        //         tabKey: action.payload.tabKey,
        //         searchBy: action.payload.searchBy,
        //         pagination: action.payload.pagination,
        //         taskList: action.payload.taskList,
        //         totalEstHour: action.payload.totalEstHour,
        //         totalSubTask: action.payload.totalSubTask,
        //         userName: action.payload.userName,
        //         userEstHour: action.payload.userEstHour,
        //         userTotalSubTask: action.payload.userTotalSubTask
        //     })

        case UPCOMING_TASK_CHANGE_TABKEY:
            return Object.assign({}, state, {
                tabKey: action.payload.tabKey,
                searchBy: action.payload.searchBy,
                pagination: action.payload.pagination
            })

        case UPCOMING_TASK_SEARCH_BY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                pagination: action.payload.pagination
            })

        case UPCOMING_TASK_CHANGE_PAGINATION:
            return Object.assign({}, state, {
                pagination: action.payload.pagination
            })

        case UPCOMING_TASK_LOAD_RELEASE:
            return Object.assign({}, state, {
                releaseList: action.payload.releaseList
            })

        case UPCOMING_TASK_LOAD_SPRINT:
            return Object.assign({}, state, {
                sprintList: action.payload.sprintList
            })

        case UPCOMING_TASK_NEWLY_ADDED:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy
            })
    }

    return state;
}

export default upcomingTaskReducer;