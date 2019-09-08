import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'
import moment from 'moment'
import { start } from 'pretty-error';

export const PUBLIC_HOLIDAY_LOAD = "PUBLIC_HOLIDAY_LOAD"
export const PUBLIC_HOLIDAY_ADD_NEW = "PUBLIC_HOLIDAY_ADD_NEW"
export const PUBLIC_HOLIDAY_TOGGLE_MODAL_VISIBLE = "PUBLIC_HOLIDAY_TOGGLE_MODAL_VISIBLE"
export const PUBLIC_HOLIDAY_SEARCH_BY = "PUBLIC_HOLIDAY_SEARCH_BY"
// export const PROJECT_EDIT = "PROJECT_EDIT"
// export const PROJECT_UPDATE = "PROJECT_UPDATE"
// export const PROJECT_LOAD = "PROJECT_LOAD"
// export const PROJECT_CHANGE_PAGINATION = "PROJECT_CHANGE_PAGINATION"
// export const PROJECT_SPINNING = "PROJECT_SPINNING"
// export const PROJECT_SEARCH_BY_RESULT = "PROJECT_SEARCH_BY_RESULT"
// export const PROJECT_SEARCH_BY = "PROJECT_SEARCH_BY"
// export const PROJECT_CHANGE_DEFAULT_ACTIVE_KEY = "PROJECT_TOGGLE_MODAL_VISIBLE"


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

/**
 * --- Search By ---
 */
export const searchBy = (startDate=null, endDate=null) => (dispatch, getState) => {

    // console.log( moment(startDate).format('YYYY-MMM-DD'))

    if ( startDate == null) {
        startDate = moment().startOf('year')
    }

    if ( endDate == null) {
        endDate = moment().endOf('year')
    }

    dispatch({
        type: PUBLIC_HOLIDAY_SEARCH_BY,
        payload: {
            searchBy: {
                startDate: moment(startDate).format('YYYY-MMM-DD'),
                endDate
            }
        }
    })

    
    dispatch(getAllHolidays())

}

/**
 * --------------------------------------------------------------------------------------------------
 * get all holidays
 * --------------------------------------------------------------------------------------------------
 */
export const getAllHolidays = () => (dispatch, getState) => {

    const publicHoliday = getState().publicHolidayReducer

    const { startDate, endDate } = publicHoliday.searchBy

    return get(`/public-holiday?startDate=${startDate}&endDate=${endDate}`)
        .then(data => {
            dispatch({
                type: PUBLIC_HOLIDAY_LOAD,
                payload: {
                    list: data
                }
            })
        })
        .catch(err => console.log(err))
}

/**
 * ------------------------------------------------------------------------------------------------------
 * New Project
 * ------------------------------------------------------------------------------------------------------
 */

export const addNewHoliday = () => (dispatch, getState) => {

    const { modal } = getState().publicHolidayReducer

    const editInfo = {
        holiday: '',
        description: '',
    }

    dispatch({
        type: PUBLIC_HOLIDAY_ADD_NEW,
        payload: {
            modal: {
                ...modal,
                modalVisible: !modal.modalVisible,
                modalTitle: 'Create a new Holiday',
                okText: 'Create',
                editInfo
            }
        }
    })

    // dispatch(toggleModalVisible())
}


/**
 * ----------- Toggle Modal Visible ------------
 */
export const toggleModalVisible = () => {
    return (dispatch, getState) => {

        const { modal } = getState().publicHolidayReducer

        dispatch({
            type: PUBLIC_HOLIDAY_TOGGLE_MODAL_VISIBLE,
            payload: {
                modal: {
                    ...modal,
                    modalVisible: !modal.modalVisible
                }
            }
        })
    }
}

/**
 * -- Handle Submit
 */
export const handleSubmit = (values) => (dispatch, getState) => {

        const { modal } = getState().publicHolidayReducer
        const { okText } = modal

        if (okText == "Create") {
            //-- Create New User
            dispatch(saveProject({
                ...values,
                holiday: moment(values.holiday).format('YYYY-MMM-DD')
            }))
        } else {
            //-- Update user
            // dispatch(updateProject(values))
        }
}

/**
 * --- Save Public Holiday
 */
export const saveProject = (values) => (dispatch, getState) => {

    post('/public-holiday', values)
        .then(data => {

            //-- Load Result
            dispatch(getAllHolidays())

            dispatch(toggleModalVisible())

        })
        .catch(err => openNotificationWithIcon('error', err.message, 'Already exists this holiday'))
}

/**
 * --- Remove Project ---
 */
export const removeHoliday = (id) => (dispatch, getState) => {

    deleteMethod('/public-holiday/' + id)
        .then(data => {
            //-- Load Result
            dispatch(getAllHolidays())
        })
}