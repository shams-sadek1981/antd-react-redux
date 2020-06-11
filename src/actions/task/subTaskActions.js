import { get, post, put, deleteMethod } from '../../functions'
import { loadUpcomingTask } from '../upcomingTaskActions'
import moment from 'moment'

export const TASK_ADD_NEW_SUB_TASK = "TASK_ADD_NEW_SUB_TASK"
export const TASK_SAVE_NEW_SUB_TASK = "TASK_SAVE_NEW_SUB_TASK"

export const TASK_DELETE_SUB_TASK = "TASK_DELETE_SUB_TASK"

export const TASK_EDIT_SUB_TASK = "TASK_EDIT_SUB_TASK"
export const TASK_UPDATE_SUB_TASK = "TASK_UPDATE_SUB_TASK"

export const TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE = "TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE"

//-- Handle Subtask Submit
export const handleSubTaskSubmit = (values) => (dispatch, getState) => {

    const { subTaskModal } = getState().upcomingTaskReducer
    const { okText } = subTaskModal

    if (okText == "Create") {
        //-- Create New Task
        dispatch(saveNewSubTask(values))
    } else {
        //-- Update Task
        dispatch(updateSubTask(values))
    }
}

/**
 * ------------------------------------------------------------------------------------------------------
 * Add New Sub Task
 * ------------------------------------------------------------------------------------------------------
 */
export const addNewSubTask = (taskId) => (dispatch, getState) => {

    const { subTaskModal, taskList } = getState().upcomingTaskReducer

    const task = taskList.find(item => item._id == taskId)

    const EditInfo = {
        taskName: task.taskName,
        name: '',
        assignedUser: '',
        estHour: '',
    }

    dispatch({
        type: TASK_ADD_NEW_SUB_TASK,
        payload: {
            subTaskModal: {
                ...subTaskModal,
                modalTitle: 'Create a new Subtask',
                okText: 'Create',
                EditInfo,
                modalVisible: true,
                taskId
            }
        }
    })
}


/**
 * ----------------------------------------------------------------------------------------------------
 * Sub Task Create
 * ----------------------------------------------------------------------------------------------------
 */
export const saveNewSubTask = (values) => (dispatch, getState) => {

    const { subTaskModal } = getState().upcomingTaskReducer
    const { userInfo } = getState().userReducer
    const { taskId } = subTaskModal

    //-- set new values
    let newValues = { ...values, createdBy: userInfo.name }
    if (values.startDate != undefined) {
        newValues = {
            ...values,
            startDate: moment(values.startDate).format("YYYY-MM-DD")
        }
    }

    if (values.dueDate != undefined) {
        newValues = {
            ...values,
            dueDate: moment(values.dueDate).format("YYYY-MM-DD")
        }
    }

    if (values.completedAt != undefined) {
        newValues = {
            ...values,
            completedAt: moment(values.completedAt).format("YYYY-MM-DD")
        }
    }

    post('/upcoming-task/subtask/create/' + taskId, newValues)
        .then(data => {

            dispatch(toggleSubtaskModalVisible())

            dispatch(loadUpcomingTask())

        })
        .catch(err => console.log(err))
}




/**
 * ----------------------------------------------------------------------------------------------------
 * Sub Task Delete
 * ----------------------------------------------------------------------------------------------------
 */
export const deleteSubTask = (taskId, subTaskId) => {

    return (dispatch, getState) => {

        deleteMethod(`/upcoming-task/subtask/delete/${subTaskId}`, { id: taskId })
            .then(data => {

                dispatch(loadUpcomingTask())

            })
            .catch(err => console.log(err))
    }
}



/**
 * ------------------------------------------------------------------------------------------------------
 * Edit Sub Task
 * ------------------------------------------------------------------------------------------------------
 */
export const editSubTask = (taskId, subTaskId) => {

    return (dispatch, getState) => {

        const { taskList, subTaskModal } = getState().upcomingTaskReducer

        const findTask = taskList.find(item => item._id == taskId)
        const { subTasks } = findTask
        const findSubTask = subTasks.find(item => item._id == subTaskId)

        dispatch({
            type: TASK_EDIT_SUB_TASK,
            payload: {
                subTaskModal: {
                    ...subTaskModal,
                    modalTitle: 'Edit Subtask',
                    okText: 'Update',
                    EditInfo: { ...findSubTask, taskName: findTask.taskName },
                    modalVisible: true,
                    taskId
                }
            }
        })
    }
}

/**
 * ----------------------------------------------------------------------------------------------------
 * Sub Task Update
 * ----------------------------------------------------------------------------------------------------
 */
export const updateSubTaskStatus = (values) => {

    return (dispatch, getState) => {

        const subTaskId = values._id

        put(`/upcoming-task/subtask/update/${subTaskId}`, values)
            .then(data => {
                dispatch(loadUpcomingTask())
            })
            .catch(err => console.log(err))
    }
}


export const updateSubTask = (values) => (dispatch, getState) => {

    const { userInfo } = getState().userReducer
    const newValues = { ...values, updatedBy: userInfo.name }

    const subTaskId = values._id

    put(`/upcoming-task/subtask/update/${subTaskId}`, newValues)
        .then(data => {

            dispatch(toggleSubtaskModalVisible())

            dispatch(loadUpcomingTask())

        })
        .catch(err => console.log(err))
}


/**
 * ----------------------------------------------------------------------------------------------------
 * Single Modal form toggle (visible or no)
 * ----------------------------------------------------------------------------------------------------
 */
export const toggleSubtaskModalVisible = () => {
    return (dispatch, getState) => {

        const { subTaskModal } = getState().upcomingTaskReducer

        dispatch({
            type: TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE,
            payload: {
                subTaskModal: {
                    ...subTaskModal,
                    modalVisible: !subTaskModal.modalVisible,
                }
            }
        })
    }
}