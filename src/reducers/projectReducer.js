import { LOAD_PROJECT } from '../actions/projectActions'

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
        case LOAD_PROJECT:
        return Object.assign({}, state, {
            projectList: action.payload.projectList
        })
    }
    return state
}

export default projectReducer;