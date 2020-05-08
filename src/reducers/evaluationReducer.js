import {
    EVALUATION_CHANGE_SEARCH_VALUE,
    EVALUATION_RESULT
} from '../actions/evaluationActions'

import moment from 'moment'

const startDate = moment().startOf('month')
const endDate = moment().endOf('month')
const dateFormat = 'YYYY-MMM-DD';

//-- Initialize State
const initialState = {
    name: "Shams Sadik",
    searchBy: {
        evaluationName: '2020-Q1',
        startDate: moment(startDate, dateFormat),
        endDate: moment(endDate, dateFormat)
    },
    evaluationResult: {
        users: []
    }
}

const evaluationReducer = (state = initialState, action) => {

    switch (action.type) {

        case EVALUATION_CHANGE_SEARCH_VALUE:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy
            })

        case EVALUATION_RESULT:
            
            return Object.assign({}, state, {
                evaluationResult: action.payload.evaluationResult
            })
    }

    return state;
}

export default evaluationReducer;