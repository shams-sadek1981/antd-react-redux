import {
    REPORTS_SEARCH_BY,
    REPORTS_CHANGE_TAB_KEY,
    REPORTS_SEARCH_BY_SUMMARY,
    REPORTS_PROJECT_SUMMARY,
    REPORTS_TASK_TYPE_SUMMARY
} from '../actions/reportsActions'

//-- Initialize State
const initialState = {
    tabKey: "4",
    searchBy: {
        name: 'all',
        startDate: null,
        endDate: null,
    },
    data: {
        result: []
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

    }

    return state;
}

export default reportsReducer;