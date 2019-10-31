import moment from 'moment'
import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

import { loadUser } from './userActions'
import { getAllProject } from '../actions/projectActions'

//-- Define action names
export const REPORTS_SEARCH_BY = "REPORTS_SEARCH_BY"
export const REPORTS_CHANGE_TAB_KEY = "REPORTS_CHANGE_TAB_KEY"
export const REPORTS_SEARCH_BY_SUMMARY = "REPORTS_SEARCH_BY_SUMMARY"
export const REPORTS_PROJECT_SUMMARY = "REPORTS_PROJECT_SUMMARY"
export const REPORTS_TASK_TYPE_SUMMARY = "REPORTS_TASK_TYPE_SUMMARY"
export const REPORTS_SUBTASK_SUMMARY = "REPORTS_SUBTASK_SUMMARY"
export const REPORTS_SET_DATE_RANGE = "REPORTS_SET_DATE_RANGE"
export const REPORTS_TASK_STATUS_BY_DATE = "REPORTS_TASK_STATUS_BY_DATE"
export const REPORT_CHANGE_DATE = "REPORT_CHANGE_DATE"
export const REPORT_TOGGLE_SPINNING = "REPORT_TOGGLE_SPINNING"


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};


//-- set Date Range
export const setDateRange = (startDate, endDate) => {

    return (dispatch, getState) => {

        const reports = getState().reportsReducer
        const { name } = reports.searchBy

        //-- Subtract 7 for official report
        const presentDate = moment().subtract(10, "days")

        const startDate = moment(presentDate).startOf('month').format("YYYY-MMM-DD")
        const endDate = moment(presentDate).endOf('month').format("YYYY-MMM-DD")

        // console.log(startDate)

        dispatch({
            type: 'REPORTS_SET_DATE_RANGE',
            payload: {
                searchBy: {
                    name,
                    startDate,
                    endDate
                }
            }
        })
    }
}

//-- Change tab key
export const changeTabKey = (keyNo) => (dispatch, getState) => {

    //-- load projects name
    dispatch(getAllProject())

    dispatch({
        type: 'REPORTS_CHANGE_TAB_KEY',
        payload: {
            tabKey: keyNo
        }
    })

    switch (keyNo) {
        case "2":
            dispatch(searchByUserSummary())
            break;

        case "3":
            dispatch(searchByProjectSummary())
            break;

        case "4":
            dispatch(searchByTaskTypeSummary())
            break;

        case "5":
            dispatch(searchBySubTaskSummary())
            break;
        default:
            break;
    }
}


//-- Search By User
export const searchBy = () => (dispatch, getState) => {

    // let { userName, startDate, endDate } = values
    // startDate = moment(startDate).format('YYYY-MMM-DD')
    // endDate = moment(endDate).format('YYYY-MMM-DD')

    const reportsReducer = getState().reportsReducer
    const { userName, startDate, endDate } = reportsReducer.searchBy

    const searchUrl = `/upcoming-task/subtask/report-user?startDate=${startDate}&endDate=${endDate}&userName=${userName}`

    const { searchBy } = getState().reportsReducer

    return get(searchUrl)
        .then(data => {
            dispatch({
                type: REPORTS_SEARCH_BY,
                payload: {
                    data,
                    searchBy: {
                        ...searchBy,
                        name: userName,
                        startDate,
                        endDate
                    }
                }
            })
        })
        .catch(err => console.log(err))
}


//-- Search By User Summary
export const searchByUserSummary = (values) => (dispatch, getState) => {

    dispatch(toggleSpinning(true))

    let { startDate, endDate } = getState().reportsReducer.searchBy

    // startDate = moment(startDate).format('YYYY-MMM-DD')
    // endDate = moment(endDate).format('YYYY-MMM-DD')

    const searchUrl = `/upcoming-task/subtask/report-user-summary?startDate=${startDate}&endDate=${endDate}`

    const { searchBy } = getState().reportsReducer

    return get(searchUrl)
        .then(data => {
            dispatch({
                type: REPORTS_SEARCH_BY_SUMMARY,
                payload: {
                    userSummary: data,
                    searchBy: {
                        ...searchBy,
                        startDate,
                        endDate
                    }
                }
            })

            dispatch(toggleSpinning(false))
        })
        .catch(err => console.log(err))
}

//-- Search By Project Summary
export const searchByProjectSummary = (values) => (dispatch, getState) => {

    dispatch(toggleSpinning(true))

    const { startDate, endDate } = getState().reportsReducer.searchBy

    const searchUrl = `/upcoming-task/subtask/report-project-summary?startDate=${startDate}&endDate=${endDate}`

    const { searchBy } = getState().reportsReducer

    return get(searchUrl)
        .then(data => {
            dispatch({
                type: REPORTS_PROJECT_SUMMARY,
                payload: {
                    projectSummary: data,
                    searchBy: {
                        ...searchBy,
                        startDate,
                        endDate
                    }
                }
            })

            dispatch(toggleSpinning(false))

        })
        .catch(err => console.log(err))
}


//-- Search By Task Type Summary
export const searchByTaskTypeSummary = (values) => (dispatch, getState) => {

    dispatch(toggleSpinning(true))

    const { startDate, endDate, project } = getState().reportsReducer.searchBy

    const searchUrl = `/upcoming-task/subtask/report-task-type-summary?startDate=${startDate}&endDate=${endDate}&projectName=${project}`

    const { searchBy } = getState().reportsReducer

    return get(searchUrl)
        .then(data => {
            dispatch({
                type: REPORTS_TASK_TYPE_SUMMARY,
                payload: {
                    taskTypeSummary: data,
                    searchBy: {
                        ...searchBy,
                        startDate,
                        endDate
                    }
                }
            })

            dispatch(toggleSpinning(false))
        })
        .catch(err => console.log(err))
}


//-- Search By SubTask Summary
export const searchBySubTaskSummary = (values) => (dispatch, getState) => {

    dispatch(toggleSpinning(true))

    const { startDate, endDate, project } = getState().reportsReducer.searchBy

    const searchUrl = `/upcoming-task/subtask/report-subtask-summary?startDate=${startDate}&endDate=${endDate}&projectName=${project}`

    const { searchBy } = getState().reportsReducer

    return get(searchUrl)
        .then(data => {
            dispatch({
                type: REPORTS_SUBTASK_SUMMARY,
                payload: {
                    subTaskSummary: data,
                    searchBy: {
                        ...searchBy,
                        startDate,
                        endDate
                    }
                }
            })

            dispatch(toggleSpinning(false))
        })
        .catch(err => console.log(err))
}


/**
 * ----------------------------------------------------------------------------------------
 * Report Task Status
 * ----------------------------------------------------------------------------------------
 */
export const reportTaskStatusByDate = (values) => (dispatch, getState) => {

    dispatch(toggleSpinning(true))

    const { startDate, endDate, project } = getState().reportsReducer.searchBy

    const searchUrl = `/upcoming-task/task/report-task-status?startDate=${startDate}&endDate=${endDate}&project=${project}`

    const { searchBy } = getState().reportsReducer

    return get(searchUrl)
        .then(data => {
            dispatch({
                type: REPORTS_TASK_STATUS_BY_DATE,
                payload: {
                    reportTaskStatus: data,
                    searchBy: {
                        ...searchBy,
                        startDate,
                        endDate,
                        project
                    }
                }
            })

            dispatch(toggleSpinning(false))

        })
        .catch(err => console.log(err))
}


export const toggleSpinning = value => dispatch => {
    dispatch({
        type: REPORT_TOGGLE_SPINNING,
        payload: {
            spinning: value
        }
    })
}

export const changeSearchField = (val, fieldName = "startDate") => (dispatch, getState) => {

    dispatch(toggleSpinning(true))

    const reportsReducer = getState().reportsReducer

    const searchByReducer = reportsReducer.searchBy

    if (val instanceof moment) {
        val = moment(val).format("YYYY-MMM-DD")
    }

    if (typeof val == 'Object') {
        val = val.key
    }


    dispatch({
        type: REPORT_CHANGE_DATE,
        payload: {
            searchBy: {
                ...searchByReducer,
                [fieldName]: val
            }
        }
    })


    if (fieldName == "project") {
        dispatch(reportTaskStatusByDate())
    } else {
        dispatch(searchBy())
    }

    dispatch(toggleSpinning(false))

}