import {
    RELEASE_TOGGLE_SUB_TASK_MODAL_VISIBLE,
    RELEASE_REMOVE_TASK,
    RELEASE_UPDATE_ITEM,
    RELEASE_CAL_EST_HOUR,
} from '../actions/releaseActions'

import {
    SPRINT_ADD_NEW,
    SPRINT_TOGGLE_MODAL_VISIBLE,
    SPRINT_SEARCH_BY_RESULT,
    SPRINT_EDIT_ITEM,
    SPRINT_CHANGE_TABKEY,
    SPRINT_BY_UPCOMING_TASK,
    SPRINT_SPINNING,
    SPRINT_LOADING,
    SPRINT_SEARCH_BY,
    SPRINT_EDIT_TASK,
    SPRINT_TASK_TOGGLE_MODAL_VISIBLE,
    SPRINT_LOAD_BY_PROJECT,
    SPRINT_LOAD_RELEASE_BY_PROJECT,
    SPRINT_EDIT_SUBTASK,
    SPRINT_SUBTASK_MODAL_TOGGLE_VISIBLE,
    SPRINT_SET_SPRINT_AND_USER,
    SPRINT_ADD_NEW_SUBTASK,
    SPRINT_ADD_NEW_TASK,
    SPRINT_CHANGE_PAGINATION
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
        project: ['all'],
        name: 'all',
        text: '',
        status: false,
        sprintName: null,
        sprintByUser: null
    },
    taskList:[],
    // taskListByFilter:[],
    spinning: false,
    loading: false,
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
    upcomingTaskModal: {
        modalVisible: false,
        modalTitle: 'Edit Task',
        okText: 'Update',
        release: '',
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
        taskName: 'Elementor',
        modalTitle: 'Create Subtask',
        okText: 'Create',
        EditInfo: {
            name: '',
            estHour: '',
            assignedUser: ''
        },
        startDate: null
    },
    projects: [],
    sprintList: [{
        // name: 'ERP Sprint Oct-2019'
    }],
    releaseList: [{
        version: 'Pro v2.3.4'
    }],
    subTaskList: ['API','SRS', 'R&D', 'Mockup', 'Design', 'Frontend', 'Develop', 'Merge', 'Testing', 'Documentation']
}

const sprintReducer = (state = initialState, action) => {

    switch (action.type) {

        case SPRINT_SPINNING:
            return Object.assign({}, state, {
                spinning: action.payload.spinning
            })

        case SPRINT_LOADING:
            return Object.assign({}, state, {
                loading: action.payload.loading
            })

        case RELEASE_UPDATE_ITEM:
        case RELEASE_REMOVE_TASK:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
                // taskListByFilter: action.payload.taskList
            })

        case SPRINT_SEARCH_BY_RESULT:
            return Object.assign({}, state, {
                list: action.payload.list,
                pagination: action.payload.pagination,
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

        case SPRINT_CHANGE_PAGINATION:
            return Object.assign({}, state, {
                pagination: action.payload.pagination
            })
            
        case SPRINT_BY_UPCOMING_TASK:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
                list: action.payload.list,
            })

        case SPRINT_LOAD_BY_PROJECT:
            return Object.assign({}, state, {
                sprintList: action.payload.sprintList
            })

        case SPRINT_LOAD_RELEASE_BY_PROJECT:
            return Object.assign({}, state, {
                releaseList: action.payload.releaseList
            })

        case SPRINT_TASK_TOGGLE_MODAL_VISIBLE:
        case SPRINT_EDIT_TASK:
        case SPRINT_ADD_NEW_TASK:
            return Object.assign({}, state, {
                upcomingTaskModal: action.payload.upcomingTaskModal
            })

        case SPRINT_SUBTASK_MODAL_TOGGLE_VISIBLE:
        case SPRINT_EDIT_SUBTASK:
        case SPRINT_ADD_NEW_SUBTASK:
            return Object.assign({}, state, {
                subTaskModal: action.payload.subTaskModal
            })

        case SPRINT_SET_SPRINT_AND_USER:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy
            })
    }

    return state;
}

export default sprintReducer;