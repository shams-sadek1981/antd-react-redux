import { notification } from 'antd';
import moment from 'moment'
import axios from 'axios'

import { get, post, put, deleteMethod, postWithoutToken } from '../functions'
import { BrowserRouter, browserHistory } from 'react-router-dom'

//-- Define action names
export const EVALUATION_CHANGE_SEARCH_VALUE = "EVALUATION_CHANGE_SEARCH_VALUE"
export const EVALUATION_RESULT = "EVALUATION_RESULT"


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

export const changeName = (value) => (dispatch, getState) => {

    dispatch({
        type: 'MOHSIN_CHANGE_NAME',
        payload: {
            name: 'Talha Moshin',
            value: value
        }
    })
}

// Change Search Field
export const changeSearchField = (val, fieldName = "startDate") => (dispatch, getState) => {

    const { searchBy } = getState().evaluationReducer

    dispatch({
        type: 'EVALUATION_CHANGE_SEARCH_VALUE',
        payload: {
            searchBy: {
                ...searchBy,
                [fieldName]: val
            }
        }
    })
}

//-- Search Result
export const searchResult = () => (dispatch, getState) => {

    const { searchBy } = getState().evaluationReducer

    const { evaluationName, startDate, endDate, } = searchBy

    let queryString = ''

    if (evaluationName) {
        queryString +=  'evaluationName=' + evaluationName
    }
    
    if (startDate) {
        queryString +=  '&startDate=' + moment(startDate).format("YYYY-MMM-DD")
        queryString +=  '&endDate=' + moment(endDate).format("YYYY-MMM-DD")
    }

    const searchUrl = `/evaluation/get-all-marks?${queryString}`

    get(searchUrl)
        .then(data => {
            dispatch({
                type: EVALUATION_RESULT,
                payload: {
                    evaluationResult: data
                }
            })
        })
        .catch(err => console.log(err))
}