import {
    UPLOAD_EVALUATION_CHANGE_DATA,
} from '../actions/uploadActions'


//-- Initialize State
const initialState = {
    evaluation: {
        evaluatiionName: '2020-Q1',
        startDate: '',
        endDate: '',
    },
    task: {

    }
}

const uploadReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPLOAD_EVALUATION_CHANGE_DATA:
            return Object.assign({}, state, {
                evaluation: action.payload.evaluation
            })
    }

    return state;
}

export default uploadReducer;