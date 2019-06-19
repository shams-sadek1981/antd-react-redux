import { LOAD_TASK_TYPE } from '../actions/taskTypeActions'

const initialState = {
    taskTypeList: [
        {
            name: 'New Feature',
        },
        {
            name: 'Client Issue',
        },
        {
            name: 'Bug Fix',
        }
    ]
}

const taskTypeReducer = (state=initialState, action ) => {
    
    switch ( action.type ) {
        case LOAD_TASK_TYPE:
        return Object.assign({}, state, {
            taskTypeList: action.payload.taskTypeList
        })
    }
    return state
}

export default taskTypeReducer;