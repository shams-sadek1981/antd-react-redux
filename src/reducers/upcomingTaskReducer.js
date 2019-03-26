import { 
    UPCOMING_TASK_LOAD,
    UPCOMING_TASK_TOGGLE_MODAL_VISIBLE,
    UPCOMING_TASK_EDIT_TASK,
    UPCOMING_TASK_REMOVE_TASK,
    UPCOMING_TASK_UPDATE_TASK,
    UPCOMING_TASK_UPDATE_CHECKLIST
} from '../actions/upcomingTaskActions'


//-- Initialize State
const initialState = {
    taskList: [],
    modal: {
        modalVisible: false,
        modalTitle: 'Create a new task',
        okText: 'Create',
        EditInfo: {
            taskName: '',
            description: '',
            projectName: '',
            taskType: '',
            estHour: '',
            assignedUser: ''
        }
    },
    taskTypes: [
        'New Feature',
        'Plugin Issue',
        'Enhancement',
    ],
    projects: [
        'Dokan',
        'weMail',
        'WPUF',
        'weForms',
        'ERP',
        'Project Manager'
    ],

}

const upcomingTaskReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPCOMING_TASK_UPDATE_CHECKLIST:
        case UPCOMING_TASK_UPDATE_TASK:
        case UPCOMING_TASK_REMOVE_TASK:
        case UPCOMING_TASK_LOAD:
            return Object.assign({}, state, {
                taskList: action.payload.taskList
            })

        case UPCOMING_TASK_EDIT_TASK:
        case UPCOMING_TASK_TOGGLE_MODAL_VISIBLE:
            return Object.assign({}, state, {
                modal: action.payload.modal
            })
    }

    return state
}

export default upcomingTaskReducer;