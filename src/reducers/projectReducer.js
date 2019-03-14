import { ADD_USER, REMOVE_USER, LOGGED_IN } from '../actions/userActions'

const initialState = {
    projectList: [
        {
            name: 'Dokan',
            description: 'Dokan Multivandor Plugin'
        },
        {
            name: 'WPUF',
            description: 'User Frontend'
        },
    ]
}

const projectReducer = (state=initialState, action ) => {
    
    switch ( action.type ) {
        case ADD_PROJECT:
        return Object.assign({}, state, {
            projectList: action.payload.projectList
        })
    }
    return state
}

export default projectReducer;