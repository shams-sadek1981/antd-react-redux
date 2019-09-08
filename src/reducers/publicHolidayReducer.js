import {
    PUBLIC_HOLIDAY_LOAD,
    PUBLIC_HOLIDAY_TOGGLE_MODAL_VISIBLE,
    PUBLIC_HOLIDAY_ADD_NEW,
    PUBLIC_HOLIDAY_SEARCH_BY
} from '../actions/publicHolidayActions'

const initialState = {
    modal: {
        modalVisible: false,
        modalTitle: 'Create a new Holiday',
        okText: 'Create',
        editInfo: {
            name: '',
        },
    },
    list: [],
    spinning: false,
    searchBy: {
        seartDate: '',
        endDate: '',
    },
    pagination: {
        current: 1,
        total: 0,
        pageSize: 30
    },
}

const publicHolidayReducer = (state=initialState, action ) => {
    
    switch ( action.type ) {
        case PUBLIC_HOLIDAY_LOAD:
        return Object.assign({}, state, {
            list: action.payload.list
        })

        case PUBLIC_HOLIDAY_SEARCH_BY:
        return Object.assign({}, state, {
            searchBy: action.payload.searchBy
        })


        case PUBLIC_HOLIDAY_ADD_NEW:
        case PUBLIC_HOLIDAY_TOGGLE_MODAL_VISIBLE:
        return Object.assign({}, state, {
            modal: action.payload.modal
        })

    }
    return state
}

export default publicHolidayReducer;