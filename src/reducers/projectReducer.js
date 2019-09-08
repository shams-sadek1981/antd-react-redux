import {
    PROJECT_LOAD,
    PROJECT_SPINNING,
    PROJECT_CHANGE_PAGINATION,
    PROJECT_SEARCH_BY_RESULT,
    PROJECT_SEARCH_BY,
    PROJECT_TOGGLE_MODAL_VISIBLE,
    PROJECT_ADD_NEW,
    PROJECT_EDIT
} from '../actions/projectActions'

const initialState = {
    modal: {
        modalVisible: false,
        modalTitle: 'Create a new user',
        okText: 'Create',
        editInfo: {
            name: '',
        },
    },
    list: [],
    pagination: {
        current: 1,
        total: 0,
        pageSize: 10
    },
    spinning: false,
    searchBy: {
        text: '',
    },
}

const projectReducer = (state=initialState, action ) => {
    
    switch ( action.type ) {
        case PROJECT_LOAD:
        return Object.assign({}, state, {
            list: action.payload.list
        })


        case PROJECT_CHANGE_PAGINATION:
        return Object.assign({}, state, {
            pagination: action.payload.pagination
        })

        case PROJECT_SEARCH_BY_RESULT:
        return Object.assign({}, state, {
            pagination: action.payload.pagination,
            list: action.payload.list
        })

        case PROJECT_SPINNING:
        return Object.assign({}, state, {
            spinning: action.payload.spinning
        })

        case PROJECT_SEARCH_BY:
        return Object.assign({}, state, {
            searchBy: action.payload.searchBy
        })

        case PROJECT_EDIT:
        case PROJECT_ADD_NEW:
        case PROJECT_TOGGLE_MODAL_VISIBLE:
            return Object.assign({}, state, {
                modal: action.payload.modal
        })

    }
    return state
}

export default projectReducer;