import { 
    UPCOMING_TASK_SPINNING,
    UPCOMING_TASK_LOAD,
    UPCOMING_TASK_TOGGLE_MODAL_VISIBLE,
    UPCOMING_TASK_EDIT_TASK,
    UPCOMING_TASK_REMOVE_TASK,
    UPCOMING_TASK_UPDATE_TASK,
    UPCOMING_TASK_UPDATE_CHECKLIST,
    UPCOMING_TASK_ADD_NEW_TASK,
    UPCOMING_TASK_SEARCH_BY_USER,
} from '../actions/upcomingTaskActions'


//-- Initialize State
const initialState = {
    spinning: false,
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
        'Project Manager',
        'POS'
    ],
    nameColors: [
        {
            name: 'Mishu',
            color: 'magenta'
        },
        {
            name: 'Sabbir',
            color: 'green'
        },
    ]

}

const upcomingTaskReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPCOMING_TASK_SPINNING:
            return Object.assign({}, state, {
                spinning: action.payload.spinning
            })

        case UPCOMING_TASK_SEARCH_BY_USER:
        case UPCOMING_TASK_UPDATE_CHECKLIST:
        case UPCOMING_TASK_UPDATE_TASK:
        case UPCOMING_TASK_REMOVE_TASK:
        case UPCOMING_TASK_LOAD:
            return Object.assign({}, state, {
                taskList: action.payload.taskList,
            })

        case UPCOMING_TASK_ADD_NEW_TASK:
        case UPCOMING_TASK_EDIT_TASK:
        case UPCOMING_TASK_TOGGLE_MODAL_VISIBLE:
            return Object.assign({}, state, {
                modal: action.payload.modal
            })
    }

    return state;
}

export default upcomingTaskReducer;