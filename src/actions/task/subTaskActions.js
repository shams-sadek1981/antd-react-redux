import { get, post, put, deleteMethod } from '../../functions'
import { loadUpcomingTask } from '../upcomingTaskActions'

export const TASK_ADD_NEW_SUB_TASK = "TASK_ADD_NEW_SUB_TASK"
export const TASK_SAVE_NEW_SUB_TASK = "TASK_SAVE_NEW_SUB_TASK"

export const TASK_DELETE_SUB_TASK = "TASK_DELETE_SUB_TASK"

export const TASK_EDIT_SUB_TASK = "TASK_EDIT_SUB_TASK"
export const TASK_UPDATE_SUB_TASK = "TASK_UPDATE_SUB_TASK"

export const TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE = "TASK_TOGGLE_SUB_TASK_MODAL_VISIBLE"

//-- Handle Subtask Submit
export const handleSubTaskSubmit = (values) => {
    return (dispatch, getState) => {

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
}

/**
 * ------------------------------------------------------------------------------------------------------
 * Add New Sub Task
 * ------------------------------------------------------------------------------------------------------
 */
export const addNewSubTask = (taskId) => {
    console.log(taskId)
    return (dispatch, getState) => {

        const { subTaskModal } = getState().upcomingTaskReducer

        const EditInfo = {
            name: '',
            assignedUser: '',
            estHour: '',
        }

        dispatch({
            type: TASK_ADD_NEW_SUB_TASK,
            payload: {
                subTaskModal: {
                    ...subTaskModal,
                    modalTitle: 'Create a new SubTask',
                    okText: 'Create',
                    EditInfo,
                    modalVisible: true,
                    taskId
                }
            }
        })

    }
}


/**
 * ----------------------------------------------------------------------------------------------------
 * Sub Task Create
 * ----------------------------------------------------------------------------------------------------
 */
export const saveNewSubTask = (values) => {

    return (dispatch, getState) => {

        const { taskList, subTaskModal } = getState().upcomingTaskReducer
        const { taskId } = subTaskModal


        post('/upcoming-task/subtask/create/' + taskId, values)
            .then(data => {

                // const findTask = taskList.find(item => item._id == taskId)

                // const newTaskList = taskList.map(item => {

                //     if (item._id == taskId) {
                //         return {
                //             ...item,
                //             subTasks: [
                //                 ...findTask.subTasks,
                //                 data.result
                //             ]
                //         }
                //     } else {
                //         return item
                //     }

                // })

                // dispatch({
                //     type: TASK_SAVE_NEW_SUB_TASK,
                //     payload: {
                //         taskList: newTaskList
                //     }
                // })

                // dispatch(calEstHour())

                dispatch(toggleSubtaskModalVisible())

                dispatch(loadUpcomingTask())

            })
            .catch(err => console.log(err))
    }
}




/**
 * ----------------------------------------------------------------------------------------------------
 * Sub Task Delete
 * ----------------------------------------------------------------------------------------------------
 */
export const deleteSubTask = (taskId, subTaskId) => {

    return (dispatch, getState) => {

        const { taskList } = getState().upcomingTaskReducer


        deleteMethod(`/upcoming-task/subtask/delete/${subTaskId}`, { id: taskId })
            .then(data => {

                // const findTask = taskList.find(item => item._id == taskId)
                // const { subTasks } = findTask
                // const newSubTasks = subTasks.filter(item => item._id != subTaskId)

                // const filteredTaskList = taskList.filter(item => item._id != taskId)

                // const updatedSingleTask = {
                //     ...findTask,
                //     subTasks: [...newSubTasks]
                // }


                // const newTaskList = [
                //     ...filteredTaskList,
                //     updatedSingleTask
                // ]

                // dispatch({
                //     type: TASK_DELETE_SUB_TASK,
                //     payload: {
                //         taskList: newTaskList
                //     }
                // })

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
                    modalTitle: 'Edit Sub Task',
                    okText: 'Update',
                    EditInfo: findSubTask,
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


export const updateSubTask = (values) => {

    return (dispatch, getState) => {

        const { taskList, subTaskModal } = getState().upcomingTaskReducer


        const subTaskId = values._id

        put(`/upcoming-task/subtask/update/${subTaskId}`, values)
            .then(data => {

                // const taskId = data.result._id
                // const filteredTaskList = taskList.filter(item => item._id != taskId)

                // const newTaskList = [
                //     ...filteredTaskList,
                //     data.result
                // ]

                // dispatch({
                //     type: TASK_UPDATE_SUB_TASK,
                //     payload: {
                //         taskList: newTaskList,
                //         subTaskModal: {
                //             ...subTaskModal,
                //             modalVisible: false
                //         }
                //     }
                // })

                dispatch(toggleSubtaskModalVisible())

                dispatch(loadUpcomingTask())

            })
            .catch(err => console.log(err))
    }
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