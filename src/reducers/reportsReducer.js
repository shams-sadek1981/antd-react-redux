import {
    REPORTS_SEARCH_BY,
    REPORTS_CHANGE_TAB_KEY,
    REPORTS_SEARCH_BY_SUMMARY,
    REPORTS_PROJECT_SUMMARY,
    REPORTS_TASK_TYPE_SUMMARY,
    REPORTS_SUBTASK_SUMMARY
} from '../actions/reportsActions'

//-- Initialize State
const initialState = {
    tabKey: "1",
    searchBy: {
        name: 'all',
        startDate: null,
        endDate: null,
    },
    data: {
        result: [],
        projectData: {
            result: []
        },
        taskTypeData: {
            result: []
        },
        subTaskData: {
            result: []
        }
    },
    userSummary: {
        result: []
    },
    projectSummary: {
        result: []
    },
    taskTypeSummary: {
        result: []
    },
    subTaskSummary: {
        result: []
    },
}

const reportsReducer = (state = initialState, action) => {

    switch (action.type) {

        case REPORTS_SEARCH_BY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                data: action.payload.data
            })
        
        case REPORTS_CHANGE_TAB_KEY:
            return Object.assign({}, state, {
                tabKey: action.payload.tabKey,
            })

        case REPORTS_SEARCH_BY_SUMMARY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                userSummary: action.payload.userSummary,
            })

        case REPORTS_PROJECT_SUMMARY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                projectSummary: action.payload.projectSummary,
            })

        case REPORTS_TASK_TYPE_SUMMARY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                taskTypeSummary: action.payload.taskTypeSummary,
            })

        case REPORTS_SUBTASK_SUMMARY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                subTaskSummary: action.payload.subTaskSummary,
            })

    }

    return state;
}

export default reportsReducer;