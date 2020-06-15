import {
    REPORTS_SEARCH_BY,
    REPORTS_CHANGE_TAB_KEY,
    REPORTS_SEARCH_BY_SUMMARY,
    REPORTS_PROJECT_SUMMARY,
    REPORTS_TASK_TYPE_SUMMARY,
    REPORTS_SUBTASK_SUMMARY,
    REPORTS_SET_DATE_RANGE,
    REPORTS_TASK_STATUS_BY_DATE,
    REPORT_CHANGE_DATE,
    REPORT_TOGGLE_SPINNING,
    REPORTS_SPRINT_SUMMARY,
    SPRINT_BARCHART_OPTION_TOGGLE
} from '../actions/reportsActions'

//-- Initialize State
const initialState = {
    spinning: false,
    tabKey: "1",
    searchBy: {
        name: 'all',
        project: 'Dokan',
        startDate: null,
        endDate: null
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
        },
        sprintData: {
            result: []
        },
        reportTaskStatus: {
            result: []
        },
        efficiencyInfo: {
            efficiency: 0,
            totalEstWithTimeLog: 0,
            totalTaskWithTimeLog: 0,
            totalTimeLog: 0
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
    sprintSummary: {
        chartBy: {
            efficiency: true,
            estHour: true,
            timeLog: true,
            taskCount: true,
            progress: true
        },
        result: [],
        summary: {
            totalTask: 0,
            userDetails: []
        }
    },
    reportTaskStatus: {
        result: []
    }
}

const reportsReducer = (state = initialState, action) => {

    switch (action.type) {

        case REPORT_CHANGE_DATE:
        case REPORTS_SET_DATE_RANGE:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
            })

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

        case REPORTS_SPRINT_SUMMARY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                // sprintSummary: action.payload.sprintSummary,
                sprintSummary: Object.assign({}, state.sprintSummary, action.payload.sprintSummary)
            })

        case SPRINT_BARCHART_OPTION_TOGGLE:
            return Object.assign({}, state, {
                sprintSummary: {
                    ...state.sprintSummary,
                    chartBy: action.payload.chartBy
                }
            })

        case REPORTS_TASK_STATUS_BY_DATE:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                reportTaskStatus: action.payload.reportTaskStatus,
            })

        case REPORT_TOGGLE_SPINNING:
            return Object.assign({}, state, {
                spinning: action.payload.spinning,
            })

    }

    return state;
}

export default reportsReducer;