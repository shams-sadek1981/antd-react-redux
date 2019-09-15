import {
    USER_REPORT_CHANGE_DATE,
    USER_REPORT_SET_DATE_RANGE,
    USER_REPORT_SEARCH_BY
} from '../actions/userReportActions'

//-- Initialize State
const initialState = {
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
        reportTaskStatus: {
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
    reportTaskStatus: {
        result: []
    }
}

const reportpersonalReducer = (state = initialState, action) => {

    switch (action.type) {

        case USER_REPORT_SET_DATE_RANGE:
        case USER_REPORT_CHANGE_DATE:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
            })

        case USER_REPORT_SEARCH_BY:
            return Object.assign({}, state, {
                data: action.payload.data
            })

    }

    return state;
}

export default reportpersonalReducer;