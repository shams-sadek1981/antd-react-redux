import moment from 'moment'
import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

import { loadUser } from './userActions'

//-- Define action names
export const REPORTS_SEARCH_BY = "REPORTS_SEARCH_BY"
export const REPORTS_CHANGE_TAB_KEY = "REPORTS_CHANGE_TAB_KEY"
export const REPORTS_SEARCH_BY_SUMMARY = "REPORTS_SEARCH_BY_SUMMARY"
export const REPORTS_PROJECT_SUMMARY = "REPORTS_PROJECT_SUMMARY"
export const REPORTS_TASK_TYPE_SUMMARY = "REPORTS_TASK_TYPE_SUMMARY"
export const REPORTS_SUBTASK_SUMMARY = "REPORTS_SUBTASK_SUMMARY"
export const REPORTS_SET_DATE_RANGE = "REPORTS_SET_DATE_RANGE"


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};


//-- set Date Range
export const setDateRange = (startDate, endDate) => {

    return ( dispatch, getState) => {

        const reports = getState().reportsReducer
        const { name } = reports.searchBy

        const startDate = moment().startOf('month').format("YYYY-MMM-DD")
        const endDate = moment().endOf('month').format("YYYY-MMM-DD")

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
export const changeTabKey = (keyNo) => {
    return ( dispatch, getState) => {
        dispatch({
            type: 'REPORTS_CHANGE_TAB_KEY',
            payload: {
                tabKey: keyNo
            }
        })
    }
}


//-- Search By User
export const searchBy = (values) => {

    return ( dispatch, getState ) => {

        let { userName, startDate, endDate } = values
        startDate = moment(startDate).format('YYYY-MMM-DD')
        endDate = moment(endDate).format('YYYY-MMM-DD')

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
}


//-- Search By User Summary
export const searchByUserSummary = (values) => {

    return ( dispatch, getState ) => {

        let { startDate, endDate } = values
        startDate = moment(startDate).format('YYYY-MMM-DD')
        endDate = moment(endDate).format('YYYY-MMM-DD')

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
            })
            .catch(err => console.log(err))
    }
}

//-- Search By Project Summary
export const searchByProjectSummary = (values) => {

    return ( dispatch, getState ) => {

        let { startDate, endDate } = values
        startDate = moment(startDate).format('YYYY-MMM-DD')
        endDate = moment(endDate).format('YYYY-MMM-DD')

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
            })
            .catch(err => console.log(err))
    }
}


//-- Search By Task Type Summary
export const searchByTaskTypeSummary = (values) => {

    return ( dispatch, getState ) => {

        let { startDate, endDate } = values
        startDate = moment(startDate).format('YYYY-MMM-DD')
        endDate = moment(endDate).format('YYYY-MMM-DD')

        const searchUrl = `/upcoming-task/subtask/report-task-type-summary?startDate=${startDate}&endDate=${endDate}`

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
            })
            .catch(err => console.log(err))
    }
}


//-- Search By SubTask Summary
export const searchBySubTaskSummary = (values) => {

    return ( dispatch, getState ) => {

        let { startDate, endDate } = values
        
        startDate = moment(startDate).format('YYYY-MMM-DD')
        endDate = moment(endDate).format('YYYY-MMM-DD')

        const searchUrl = `/upcoming-task/subtask/report-subtask-summary?startDate=${startDate}&endDate=${endDate}`

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
            })
            .catch(err => console.log(err))
    }
}