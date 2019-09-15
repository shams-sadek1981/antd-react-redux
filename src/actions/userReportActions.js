import { notification } from 'antd';
import moment from 'moment'
import axios from 'axios'

import { get, post, put, deleteMethod, postWithoutToken } from '../functions'
import Cookies from 'universal-cookie';
import { BrowserRouter, browserHistory } from 'react-router-dom'

//-- Define action names
export const USER_REPORT_CHANGE_DATE = "USER_REPORT_CHANGE_DATE"
export const USER_REPORT_SET_DATE_RANGE = "USER_REPORT_SET_DATE_RANGE"
export const USER_REPORT_SEARCH_BY = "USER_REPORT_SEARCH_BY"


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};



//-- set Date Range
export const setDateRange = (startDate, endDate) => (dispatch, getState) => {

    const reports = getState().reportsReducer
    const { name } = reports.searchBy

    //-- Subtract 1 for official report
    const presentDate = moment().subtract(1, "days")

    const startDate = moment(presentDate).startOf('month').format("YYYY-MMM-DD")
    const endDate = moment(presentDate).endOf('month').format("YYYY-MMM-DD")

    // console.log(startDate)

    dispatch({
        type: 'USER_REPORT_SET_DATE_RANGE',
        payload: {
            searchBy: {
                name,
                startDate,
                endDate
            }
        }
    })
}

export const changeSearchField = (val, fieldName = "startDate") => (dispatch, getState) => {

    const reportPersonal = getState().reportPersonalReducer

    const searchBy = reportPersonal.searchBy

    if (val instanceof moment) {
        val = moment(val).format("YYYY-MMM-DD")
    }

    if (typeof val == 'Object') {
        val = val.key
    }


    dispatch({
        type: USER_REPORT_CHANGE_DATE,
        payload: {
            searchBy: {
                ...searchBy,
                [fieldName]: val
            }
        }
    })

    dispatch(searchByUser())
}

//-- Search By User
export const searchByUser = () => (dispatch, getState) => {

    const reportPersonal = getState().reportPersonalReducer
    const users = getState().userReducer

    const { name } = users.userInfo
    const { startDate, endDate } = reportPersonal.searchBy

    const searchUrl = `/upcoming-task/subtask/report-user?startDate=${startDate}&endDate=${endDate}&userName=${name}`

    return get(searchUrl)
        .then(data => {
            dispatch({
                type: USER_REPORT_SEARCH_BY,
                payload: {
                    data
                }
            })
        })
        .catch(err => console.log(err))
}