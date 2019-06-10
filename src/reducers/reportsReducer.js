import {
    REPORTS_SEARCH_BY
} from '../actions/reportsActions'

//-- Initialize State
const initialState = {
    searchBy: {
        name: 'all',
        startDate: null,
        endDate: null,
    },
    data: {
        result: []
    }
}

const reportsReducer = (state = initialState, action) => {

    switch (action.type) {

        case REPORTS_SEARCH_BY:
            return Object.assign({}, state, {
                searchBy: action.payload.searchBy,
                data: action.payload.data
            })

    }

    return state;
}

export default reportsReducer;