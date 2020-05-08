import moment from 'moment'

import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

//-- Define action names
export const UPLOAD_EVALUATION_CHANGE_DATA = "UPLOAD_EVALUATION_CHANGE_DATA"


// changeDataForEvaluation
export const changeDataForEvaluation = (fieldName, value) => async (dispatch, getState) => {

    // console.log('TEST-4000: ', value)

    let { evaluation } = getState().uploadReducer
    // let { evaluatiionName, startDate, endDate } = evaluation

    //-- set evaluation
    evaluation = {
        ...evaluation,
        [fieldName]: value
    }


    dispatch({
        type: UPLOAD_EVALUATION_CHANGE_DATA,
        payload: {
            evaluation
        }
    })

}//-- end