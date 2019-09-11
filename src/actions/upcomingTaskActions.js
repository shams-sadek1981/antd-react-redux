import moment from 'moment'
import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

import { loadUser } from './userActions'
import { getAllProject } from './projectActions'
import { getAllTaskType } from './taskTypeActions'
import { array } from 'prop-types';

//-- Define action names
export const UPCOMING_TASK_CHANGE_TABKEY = "UPCOMING_TASK_CHANGE_TABKEY"

export const UPCOMING_TASK_SPINNING = "UPCOMING_TASK_SPINNING"

export const UPCOMING_TASK_TOGGLE_MODAL_VISIBLE = "UPCOMING_TASK_TOGGLE_MODAL_VISIBLE"

export const UPCOMING_TASK_ADD_NEW_TASK = "UPCOMING_TASK_ADD_NEW_TASK"
export const UPCOMING_TASK_SAVE_NEW_TASK = "UPCOMING_TASK_SAVE_NEW_TASK"

export const UPCOMING_TASK_EDIT_TASK = "UPCOMING_TASK_EDIT_TASK"

export const UPCOMING_TASK_REMOVE_TASK = "UPCOMING_TASK_REMOVE_TASK"

export const UPCOMING_TASK_CAL_EST_HOUR = "UPCOMING_TASK_CAL_EST_HOUR"

export const UPCOMING_TASK_SEARCH_BY = "UPCOMING_TASK_SEARCH_BY"
export const UPCOMING_TASK_SEARCH_BY_RESULT = "UPCOMING_TASK_SEARCH_BY_RESULT"

export const UPCOMING_TASK_CHANGE_PAGINATION = "UPCOMING_TASK_CHANGE_PAGINATION"

export const UPCOMING_TASK_LOAD_RELEASE = "UPCOMING_LOAD_RELEASE"


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};


//-- Change Pagination (Table Pagination)
export const changePagination = (pagination) => {
    return (dispatch, getState) => {

        dispatch(toggleSpinning(true))

        dispatch({
            type: UPCOMING_TASK_CHANGE_PAGINATION,
            payload: {
                pagination
            }
        })

        //-- Load Result
        dispatch(upcomingTaskSearchByResult())

        dispatch(toggleSpinning(false))
    }
}



/**
 * ----------------------------------------------------------------------------------------------------
 * Change Tabkey
 * ----------------------------------------------------------------------------------------------------
 * @param {*} value 
 * Step-1 => pagination: { current: 1 }
 * Step-2 => searchBy: { status: true/false } true=completed task, false=incomplete task
 * Step-3 =>fetch data from API
 */
export const changeTabKey = (value) => {
    return (dispatch, getState) => {

        const { searchBy, pagination } = getState().upcomingTaskReducer
        const { pageSize } = pagination
        // console.log(value, pageSize)

        let searchByCompletedAt = false
        let running = false
        switch (value) {
            case "1":
                searchByCompletedAt = null
                running = false
                break;

            case "2":
                searchByCompletedAt = true
                break;

            case "3":
                searchByCompletedAt = null
                running = true
                break;
        }

        const newSearchBy = {
            ...searchBy,
            completedAt: searchByCompletedAt,
            running
        }


        //-- step-3 fetch data from API
        const current = 1
        const completedAt = searchByCompletedAt
        const { name, project, text } = searchBy


        getTaskResult(current, pageSize, name, project, completedAt, text, running)
            .then(data => {
                dispatch({
                    type: UPCOMING_TASK_CHANGE_TABKEY,
                    payload: {
                        tabKey: value,
                        searchBy: newSearchBy,
                        pagination: {
                            ...data.pagination,
                            current: 1 //-- set current while changing tabkey
                        },
                        taskList: data.result,
                        "totalEstHour": data.totalEstHour,
                        "totalSubTask": data.totalSubTask,
                        "userName": data.userName,
                        "userEstHour": data.userEstHour,
                        "userTotalSubTask": data.userTotalSubTask,
                    }
                })
            })
    }
}//-- end




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
    return (dispatch, getState) => {

        dispatch(toggleSpinning(true))

        let { searchBy, pagination, tabKey } = getState().upcomingTaskReducer
        const { current } = pagination
        const { name, project, text, status } = searchBy

        //-- set Search by
        searchBy = {
            ...searchBy,
            [fieldName]: value
        }

        pagination = {
            ...pagination,
            current: 1
        }

        dispatch({
            type: UPCOMING_TASK_SEARCH_BY,
            payload: {
                searchBy,
                pagination
            }
        })


        //-- Load Result
        dispatch(upcomingTaskSearchByResult({ status, tabKey }))


        dispatch(toggleSpinning(false))

    }
}//-- end




//-- Helper Function for search result
const setObjForSearchResult = (obj) => {

    //-- Set initial Obj
    let setObj = {
        status: false,
        tabKey: "1",
        changeTab: false
    }

    // //-- set status
    if (Object.entries(obj).length > 0) {
        // console.log("obj", obj)
        setObj = {
            ...setObj,
            ...obj
        }
    }

    return {
        tabKey: setObj.tabKey,
        status: setObj.status,
        changeTab: setObj.changeTab
    }

}//-- end 


/**
 * ----------------------------------------------------------------------------------------------------
 * get Result Helper function
 * ----------------------------------------------------------------------------------------------------
 * @param {*} current 
 * @param {*} name 
 * @param {*} project 
 * @param {*} status 
 * @param {*} text 
 */

const getTaskResult = (current, pageSize, name, project, completedAt, text, running) => {

    let newProjectParams = ''

    if (Array.isArray(project)) {
        project.forEach(item => {
            newProjectParams += "project=" + item + "&"
        })
    } else {
        newProjectParams = "project=" + project
    }

    // console.log('Project Params:', newProjectParams)

    // const searchUrl = `/upcoming-task/search-running?page=${current}&pageSize=${pageSize}&name=${name}&project=${project}&completedAt=${completedAt}&text=${text}&running=${running}`
    const searchUrl = `/upcoming-task/search-running?page=${current}&pageSize=${pageSize}&name=${name}&${newProjectParams}&completedAt=${completedAt}&text=${text}&running=${running}`

    return get(searchUrl)
        .then(data => data)
        .catch(err => console.log(err))
}


function getProjectByPermission(userInfo, project) {

    let newProjectList = ['all']
    if (userInfo.projects.length > 0) {
        if (project[0] == 'all') {
            userInfo.projects.forEach(item => newProjectList.push(item.projectName))
            project = newProjectList
        }
    }

    return project

}
/**
 * ------------------------------------------------------------------------------------------
 * Task Result
 * ------------------------------------------------------------------------------------------
 */
export const upcomingTaskSearchByResult = () => (dispatch, getState) => {

    let { searchBy, pagination } = getState().upcomingTaskReducer
    const { userInfo } = getState().userReducer

    let { current, pageSize } = pagination
    let { name, project, text, completedAt, running } = searchBy

    //-- set permission by project
    let newProjectList = []
    if (userInfo.projects.length > 0) {
        // console.log('Get Project', project)
        if (project[0] == 'all') {
            userInfo.projects.forEach( item => newProjectList.push(item.projectName))
            project = newProjectList
        }
    }
    // console.log('HHHHHHHHHHH:', project)
    
    // project = getProjectByPermission(userInfo, project)

    getTaskResult(current, pageSize, name, project, completedAt, text, running)
        .then(data => {
            // console.log(data)

            dispatch({
                type: UPCOMING_TASK_SEARCH_BY_RESULT,
                payload: {
                    taskList: data.result,
                    pagination: data.pagination,
                    "totalEstHour": data.totalEstHour,
                    "totalSubTask": data.totalSubTask,
                    "userName": data.userName,
                    "userEstHour": data.userEstHour,
                    "userTotalSubTask": data.userTotalSubTask,
                }
            })

            //-- filter by project
            dispatch(filterProjectByUser())

        }).catch(err => console.log(err))
}//-- end function


//-- Filter by Project
export const filterProjectByUser = () => (dispatch, getState) => {

    const user = getState().userReducer

    let newList = []
    if (user.userInfo.projects.length > 0) {

        newList = user.userInfo.projects.map(item => ({
            _id: item._id,
            name: item.projectName
        }))

        dispatch({
            type: "PROJECT_LOAD",
            payload: {
                list: newList
            }
        })
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
 * Add New Task
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

                dispatch(toggleModalVisible())

                dispatch(loadUpcomingTask())


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



/**
 * ----------------------------------------------------------------------------------------------------
 * Load Upcoming Task...
 * ----------------------------------------------------------------------------------------------------
 */
export const loadUpcomingTask = () => (dispatch, getState) => {

    const upcomingTask = getState().upcomingTaskReducer
    const { tabKey, pagination } = upcomingTask
    const { current } = pagination

    // let status = false
    // if (tabKey == 2) {
    //     status = true
    // }

    //-- load project
    dispatch(getAllProject())

    //-- load user
    dispatch(loadUser())


    //-- load task-type
    dispatch(getAllTaskType())


    //-- Load Result
    dispatch(upcomingTaskSearchByResult())

}




/**
 * ------------------------------------------------------------------------------------------------------
 * Edit Task
 * ------------------------------------------------------------------------------------------------------
 */
export const editTask = (id) => {
    return (dispatch, getState) => {

        const { taskList, modal } = getState().upcomingTaskReducer

        const findTask = taskList.find(item => item._id == id)

        //-- load project releated release
        dispatch(loadRelease(findTask.projectName))

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


/**
 * ----------------------------------------------------------------------------------------
 * load release data for task editing period
 * ----------------------------------------------------------------------------------------
 * 
 */
export const loadRelease = projectName => (dispatch, getState) => {

    const current = 1
    const pageSize = 10
    const status = false

    const searchUrl = `/release?page=${current}&pageSize=${pageSize}&project=${projectName}&status=${status}&text=`

    return get(searchUrl)
        .then(data => {

            const releaseList = data.result.map(item => {
                return {
                    version: item.version,
                    releaseDate: moment(item.releaseDate).format("DD-MMM-YYYY"),
                }
            })

            dispatch({
                type: UPCOMING_TASK_LOAD_RELEASE,
                payload: {
                    releaseList
                }
            })
        })
        .catch(err => console.log(err))
}

/**
 * -------------------------------------------------------------------------------------------------
 * Update Task
 * -------------------------------------------------------------------------------------------------
 */
export const updateTask = (values) => {

    return (dispatch, getState) => {

        let newValues = values

        if (values.completedAt != null) {
            newValues = {
                ...values,
                completedAt: moment(values.completedAt).format('YYYY-MM-DD')
            }
        }


        const { modal } = getState().upcomingTaskReducer

        const { _id } = modal.EditInfo

        put('/upcoming-task/update/' + _id, newValues)
            .then(data => {

                dispatch(toggleModalVisible())

                dispatch(loadUpcomingTask())

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Already exists the task'))
    }
}

/**
 * -------------------------------------------------------------------------------------------------
 * Update Running Task
 * -------------------------------------------------------------------------------------------------
 */
export const updateRunningTask = (obj) => {

    return (dispatch, getState) => {

        const { _id, running } = obj

        put('/upcoming-task/update/' + _id, { running })
            .then(data => {
                dispatch(upcomingTaskSearchByResult())

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Already exists the task'))
    }
}

/**
 * -------------------------------------------------------------------------------------------------
 * Update Task Rate
 * -------------------------------------------------------------------------------------------------
 */
export const updateTaskRate = (obj) => {

    return (dispatch, getState) => {

        const { _id, rate } = obj

        put('/upcoming-task/update/' + _id, { rate })
            .then(data => {
                dispatch(upcomingTaskSearchByResult())

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Task Rate Problem, Please the updateTaskRate'))
    }
}


//-- Update Task Status (true/false)
// export const updateTaskStatus = (values) => {

//     return (dispatch, getState) => {

//         const { _id, status } = values

//         const data = { status }

//         put('/upcoming-task/update/' + _id, data)
//             .then(data => {

//                 dispatch(loadUpcomingTask())

//             })
//             .catch(err => openNotificationWithIcon('error', err.message, 'Task status updating problem'))
//     }
// }


//-- Remove user
export const removeTask = (id) => {

    return (dispatch, getState) => {

        let { taskList } = getState().upcomingTaskReducer

        deleteMethod('/upcoming-task/delete/' + id)
            .then(data => {
                dispatch(loadUpcomingTask())
            })
    }
}