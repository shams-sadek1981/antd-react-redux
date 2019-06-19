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
    ],
    projects: [
        'All Plugin',
        'Dokan',
        'Dokan App',
        'WP ERP',
        'wePOS',
        'Project Manager',
        'weForms',
        'weMail',
        'WPUF',
        "Appsero",
        "WCCT",
        "Bnimoy",
        "bedIQ"
    ],
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