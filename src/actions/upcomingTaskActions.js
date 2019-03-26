import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

import { loadUser } from './userActions'

//-- Define action names
export const UPCOMING_TASK_SPINNING = "UPCOMING_TASK_SPINNING"
export const UPCOMING_TASK_LOAD = "UPCOMING_TASK_LOAD"
export const UPCOMING_TASK_TOGGLE_MODAL_VISIBLE = "UPCOMING_TASK_TOGGLE_MODAL_VISIBLE"
export const UPCOMING_TASK_ADD_NEW_TASK = "UPCOMING_TASK_ADD_NEW_TASK"
export const UPCOMING_TASK_SAVE_NEW_TASK = "UPCOMING_TASK_SAVE_NEW_TASK"

export const UPCOMING_TASK_EDIT_TASK = "UPCOMING_TASK_EDIT_TASK"
export const UPCOMING_TASK_UPDATE_TASK = "UPCOMING_TASK_UPDATE_TASK"

export const UPCOMING_TASK_REMOVE_TASK = "UPCOMING_TASK_REMOVE_TASK"
export const UPCOMING_TASK_UPDATE_CHECKLIST = "UPCOMING_TASK_UPDATE_CHECKLIST"

export const UPCOMING_TASK_SEARCH_BY_USER = "UPCOMING_TASK_SEARCH_BY_USER"

export const UPCOMING_TASK_CAL_EST_HOUR = "UPCOMING_TASK_CAL_EST_HOUR"

export const UPCOMING_TASK_SEARCH_BY = "UPCOMING_TASK_SEARCH_BY"



const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};


//-- Toggle Spinning
export const toggleSpinning = (booleanValue) => {
    return (dispatch, getState) => {

        const { spinning } = getState().upcomingTaskReducer

        dispatch({
            type: UPCOMING_TASK_SPINNING,
            payload: {
                spinning: booleanValue
            }
        })
    }
}

export const searchBy = (fieldName, value) => {
    return async (dispatch, getState) => {

        dispatch(toggleSpinning(true))

        let { searchBy } = getState().upcomingTaskReducer

        //-- set Search by
        searchBy = {
            ...searchBy,
            [fieldName]: value
        }

        dispatch({
            type: UPCOMING_TASK_SEARCH_BY,
            payload: {
                searchBy
            }
        })


        //-- build query with url
        let buildUrlQuery = '/upcoming-task/search?'
        Object.keys(searchBy).forEach( key => {
            buildUrlQuery += key + '=' + searchBy[key] + '&'
        })

        const searchUrl = buildUrlQuery.slice(0,-1)


        await get(searchUrl)
            .then(data => {

                dispatch({
                    type: UPCOMING_TASK_SEARCH_BY_USER,
                    payload: {
                        taskList: data.result,
                        totalTask: data.count,
                        totalEstHour: data.totalEstHour
                    }
                })
            })
            .catch(err => {

                dispatch({
                    type: UPCOMING_TASK_SEARCH_BY_USER,
                    payload: {
                        taskList: [],
                        totalTask: 0,
                        totalEstHour: 0
                    }
                })

            })

    
        dispatch(toggleSpinning(false))

    }
}


/**
 * -------------------
 * Update Check List
 * -------------------
 */
export const updateCheckList = (_id, fieldName, value) => {

    return (dispatch, getState) => {

        const values = {
            [fieldName]: value
        }

        const { taskList } = getState().upcomingTaskReducer

        const findIndex = taskList.findIndex(item => item._id == _id)


        put('/upcoming-task/update/' + _id, values)
            .then(result => {

                let newTaskList = [
                    ...taskList.slice(0, findIndex),
                    result,
                    ...taskList.slice(findIndex + 1)
                ]

                //-- Step-1
                dispatch({
                    type: UPCOMING_TASK_UPDATE_CHECKLIST,
                    payload: {
                        taskList: newTaskList,
                    }
                })

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Already exists the task'))


    }
}

//-- Handle Submit
export const handleSubmit = (values) => {
    return (dispatch, getState) => {

        const { modal } = getState().upcomingTaskReducer
        const { okText } = modal

        if (okText == "Create") {
            //-- Create New Task
            dispatch(saveNewTask(values))
        } else {
            //-- Update Task
            dispatch(updateTask(values))
        }
    }
}



/**
 * ------------------------------------------------------------------------------------------------------
 * New Task
 * ------------------------------------------------------------------------------------------------------
 */
export const addNewTask = () => {
    return (dispatch, getState) => {

        const { modal } = getState().upcomingTaskReducer

        const EditInfo = {
            taskName: '',
            projectName: '',
            taskType: '',
            description: '',
            assignedUser: '',
        }

        dispatch({
            type: UPCOMING_TASK_ADD_NEW_TASK,
            payload: {
                modal: {
                    ...modal,
                    modalTitle: 'Create a new Task',
                    okText: 'Create',
                    EditInfo,
                    modalVisible: true
                }
            }
        })

    }
}


//-- Save New Task
export const saveNewTask = (values) => {

    return (dispatch, getState) => {

        let { taskList } = getState().upcomingTaskReducer

        post('/upcoming-task/create', values)
            .then(data => {

                taskList.push(data.result)

                dispatch({
                    type: UPCOMING_TASK_SAVE_NEW_TASK,
                    payload: {
                        taskList
                    }
                })

                dispatch(calEstHour())
                
                dispatch(toggleModalVisible())

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Already exists the task'))
    }
}


/**
 * ----------------------------------------------------------------------------------------------------
 * Modal form toggle (visible or no)
 * ----------------------------------------------------------------------------------------------------
 */
export const toggleModalVisible = () => {
    return (dispatch, getState) => {

        const { modal } = getState().upcomingTaskReducer

        dispatch({
            type: UPCOMING_TASK_TOGGLE_MODAL_VISIBLE,
            payload: {
                modal: {
                    ...modal,
                    modalVisible: !modal.modalVisible
                }
            }
        })
    }
}



// export const toggleModal = () => {
//     return (dispatch, getState) => {

//         const { modal } = getState().upcomingTaskReducer

//         dispatch({
//             type: UPCOMING_TASK_TOGGLE_MODAL_VISIBLE,
//             payload: {
//                 modal: {
//                     ...modal,
//                     modalVisible: !modal.modalVisible
//                 }
//             }
//         })
//     }
// }


/**
 * ----------------------------------------------------------------------------------------------------
 * Load Upcoming Task...
 * ----------------------------------------------------------------------------------------------------
 */
export const loadUpcomingTask = () => {
    return (dispatch, getState) => {

        dispatch(loadUser())

        const upcomingTask = getState().upcomingTaskReducer

        if (upcomingTask.taskList.length > 0) return;

        const list = get('/upcoming-task/list')

        list.then(data => {
            if (data.result) {
                dispatch({
                    type: UPCOMING_TASK_LOAD,
                    payload: {
                        taskList: data.result,
                        totalTask: data.count,
                        totalEstHour: data.totalEstHour
                    }
                })
            }
        })

    }
}


/**
 * ------------------------------------------------------------------------------------------------------
 * Edit User
 * ------------------------------------------------------------------------------------------------------
 */
export const editTask = (id) => {
    return (dispatch, getState) => {

        const { taskList, modal } = getState().upcomingTaskReducer

        const findTask = taskList.find(item => item._id == id)

        dispatch({
            type: UPCOMING_TASK_EDIT_TASK,
            payload: {
                modal: {
                    ...modal,
                    modalTitle: 'Edit Task',
                    okText: 'Update',
                    EditInfo: findTask,
                    modalVisible: true
                }
            }
        })
    }
}


const calEstHour = () => {
    return (dispatch, getState) => {

        const { taskList } = getState().upcomingTaskReducer

        const totalEstHour = taskList.reduce( (accumulator, currentValue) => {

            return accumulator + currentValue.estHour
        }, 0)

        dispatch({
            type: UPCOMING_TASK_CAL_EST_HOUR,
            payload: {
                totalEstHour
            }
        })
    }
}
/**
 * -------------------------------------------------------------------------------------------------
 * Update Task
 * -------------------------------------------------------------------------------------------------
 */
export const updateTask = (values) => {
    return (dispatch, getState) => {

        const { modal, taskList } = getState().upcomingTaskReducer

        const { _id } = modal.EditInfo

        put('/upcoming-task/update/' + _id, values)
            .then(data => {

                const findIndex = taskList.findIndex(item => item._id == _id)

                let newTaskList = [
                    ...taskList.slice(0, findIndex),
                    data,
                    ...taskList.slice(findIndex + 1)
                ]

                //-- Step-1
                dispatch({
                    type: UPCOMING_TASK_UPDATE_TASK,
                    payload: {
                        taskList: newTaskList,
                    }
                })

                //-- Step-2
                dispatch(calEstHour())

                //-- Step-3
                dispatch(toggleModalVisible())
            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Already exists the task'))
    }
}


//-- Remove user
export const removeTask = (id) => {

    return (dispatch, getState) => {

        let { taskList } = getState().upcomingTaskReducer

        deleteMethod('/upcoming-task/delete/' + id)
            .then(data => {

                const newTaskList = taskList.filter(item => item._id != id)

                dispatch({
                    type: UPCOMING_TASK_REMOVE_TASK,
                    payload: {
                        taskList: newTaskList
                    }
                })

                dispatch(calEstHour())
            })
    }
}