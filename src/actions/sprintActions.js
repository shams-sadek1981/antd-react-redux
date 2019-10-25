import moment from 'moment'

import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

//-- Define action names
export const SPRINT_SEARCH_BY_RESULT = "SPRINT_SEARCH_BY_RESULT"
export const SPRINT_CHANGE_TABKEY = "SPRINT_CHANGE_TABKEY"

export const SPRINT_ADD_NEW = "SPRINT_ADD_NEW"
export const RELEASE_SAVE_NEW_ITEM = "RELEASE_SAVE_NEW_ITEM"
export const SPRINT_EDIT_ITEM = "SPRINT_EDIT_ITEM"
export const RELEASE_UPDATE_ITEM = "RELEASE_UPDATE_ITEM"

export const SPRINT_SPINNING = "SPRINT_SPINNING"

export const SPRINT_TOGGLE_MODAL_VISIBLE = "SPRINT_TOGGLE_MODAL_VISIBLE"

export const RELEASE_REMOVE_TASK = "RELEASE_REMOVE_TASK"

export const RELEASE_CAL_EST_HOUR = "RELEASE_CAL_EST_HOUR"

export const SPRINT_SEARCH_BY = "SPRINT_SEARCH_BY"

export const RELEASE_CHANGE_PAGINATION = "RELEASE_CHANGE_PAGINATION"

export const SPRINT_BY_UPCOMING_TASK = "SPRINT_BY_UPCOMING_TASK"
export const SPRINT_EDIT_TASK = "SPRINT_EDIT_TASK"
export const SPRINT_TASK_TOGGLE_MODAL_VISIBLE = "SPRINT_TASK_TOGGLE_MODAL_VISIBLE"
export const SPRINT_LOAD_BY_PROJECT = "SPRINT_LOAD_BY_PROJECT"
export const SPRINT_LOAD_RELEASE_BY_PROJECT = "SPRINT_LOAD_RELEASE_BY_PROJECT"
export const SPRINT_EDIT_SUBTASK = "SPRINT_EDIT_SUBTASK"
export const SPRINT_SUBTASK_MODAL_TOGGLE_VISIBLE = "SPRINT_SUBTASK_MODAL_TOGGLE_VISIBLE"
export const SPRINT_FILTER_BY_USER_NAME = "SPRINT_FILTER_BY_USER_NAME"


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
            type: RELEASE_CHANGE_PAGINATION,
            payload: {
                pagination
            }
        })

        //-- Load Result
        dispatch(sprintSearchByResult())

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
export const changeTabKey = (value) => (dispatch, getState) => {

    const { searchBy, pagination } = getState().sprintReducer
    const { pageSize } = pagination

    //-- Step-2 task status
    let newStatus = false
    if (value == "2") { //-- completed task
        newStatus = true
    }

    const newSearchBy = {
        ...searchBy,
        status: newStatus
    }


    //-- step-3 fetch data from API
    const current = 1
    const status = newStatus
    const { project, text } = searchBy


    // console.log(pageSize)

    getResult(current, pageSize, project, status, text)
        .then(data => {

            dispatch({
                type: SPRINT_CHANGE_TABKEY,
                payload: {
                    status,
                    tabKey: value,
                    searchBy: newSearchBy,
                    pagination: {
                        ...data.pagination,
                        current: 1, //-- set current while changing tabkey
                        pageSize
                    },
                    list: data
                }
            })
        }).catch(err => console.log(err))

}//-- end




//-- Toggle Spinning
export const toggleSpinning = (booleanValue) => (dispatch, getState) => {

    // const { spinning } = getState().sprintReducer

    dispatch({
        type: SPRINT_SPINNING,
        payload: {
            spinning: booleanValue
        }
    })
}

export const searchBy = (fieldName, value) => async (dispatch, getState) => {

    dispatch(toggleSpinning(true))

    let { searchBy, pagination, tabKey } = getState().sprintReducer
    const { current } = pagination
    let { name, project, text, status } = searchBy

    // set projects of user for permission
    const { userInfo } = getState().userReducer
    project = await getProjectSearchBy(userInfo, project)

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
        type: SPRINT_SEARCH_BY,
        payload: {
            searchBy,
            pagination
        }
    })


    //-- Load Result
    dispatch(sprintSearchByResult({ status, tabKey }))


    dispatch(toggleSpinning(false))

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
        console.log("obj", obj)
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
 * @param {*} project
 * @param {*} status
 * @param {*} text
 */

const getResult = (current, pageSize, project, status, text) => {

    let newProjectParams = ''
    if (Array.isArray(project)) {
        project.forEach(item => {
            newProjectParams += "project=" + item + "&"
        })
    } else {
        newProjectParams = "project=" + project
    }

    const searchUrl = `/sprint?page=${current}&limit=${pageSize}&${newProjectParams}&status=${status}&text=${text}`

    return get(searchUrl)
        .then(data => data)
        .catch(err => console.log(err))
}


/**
 * ----------------------------------------------------------------------------------------------------
 * get upcoming task by sprint
 * ----------------------------------------------------------------------------------------------------
 */
export const loadTaskBySprint = sprint => (dispatch, getState) => {

    const { taskList: oldTaskList } = getState().sprintReducer

    const encodedSprintName = encodeURIComponent(sprint)

    const searchUrl = `/sprint/upcoming-task?sprintName=${encodedSprintName}`

    get(searchUrl)
        .then(data => {

            const otherTaskList = oldTaskList.filter(item => item.sprintName != sprint)

            dispatch({
                type: SPRINT_BY_UPCOMING_TASK,
                payload: {
                    taskList: [
                        ...otherTaskList,
                        data
                    ]
                }
            })
        })
        .catch(err => console.log(err))
}

/**
 * -------------------------------------------------------------------------------------------------
 * Delete Task from release/version
 * -------------------------------------------------------------------------------------------------
 */
export const deleteTaskFromSprint = item => (dispatch, getState) => {

    const { _id, sprint } = item

    const newValues = { sprint: null }

    put('/upcoming-task/update/' + _id, newValues)
        .then(data => {

            dispatch(loadTaskBySprint(sprint))

            //-- reload for refresh
            dispatch(sprintSearchByResult())

        })
        .catch(err => console.log(err))
}


/**
 * ------------------------------------------------------------------------------------------
 * Task Result
 * ------------------------------------------------------------------------------------------
 */
export const sprintSearchByResult = () => async (dispatch, getState) => {

    let { searchBy, pagination } = getState().sprintReducer
    let { current, pageSize } = pagination
    let { project, text, status } = searchBy

    const { userInfo } = getState().userReducer

    project = await getProjectSearchBy(userInfo, project)

    await getResult(current, pageSize, project, status, text)
        .then(data => {
            dispatch({
                type: SPRINT_SEARCH_BY_RESULT,
                payload: {
                    list: data,
                    // pagination: data.pagination,
                }
            })
        })
}//-- end function


//-- Set Project Search By
function getProjectSearchBy(userInfo, project) {

    let newProjectList = ['all']
    if (userInfo.projects.length > 0) {
        if (project[0] == 'all') {
            userInfo.projects.forEach(item => newProjectList.push(item.projectName))
            project = newProjectList
        }
    }

    return project
}


//-- Handle Submit
export const handleSubmit = (values) => {
    return (dispatch, getState) => {

        const { modal } = getState().sprintReducer
        const { okText } = modal

        if (okText == "Create") {
            //-- Create New Task
            dispatch(saveNewItem(values))
        } else {
            //-- Update Task
            dispatch(updateItem(values))
        }
    }
}





/**
 * ------------------------------------------------------------------------------------------------------
 * Add New
 * ------------------------------------------------------------------------------------------------------
 */
export const addNew = () => (dispatch, getState) => {

    const { modal } = getState().sprintReducer

    const EditInfo = {
        name: '',
        description: '',
        projects: [],
        startDate: moment(new Date()),
        endDate: moment(new Date()),
    }

    dispatch({
        type: SPRINT_ADD_NEW,
        payload: {
            modal: {
                ...modal,
                modalTitle: 'Create a new',
                okText: 'Create',
                EditInfo,
                modalVisible: true
            }
        }
    })
}



//-- Save New Task
export const saveNewItem = (values) => (dispatch, getState) => {

    const newValues = {
        ...values,
        name: values.name,
        description: values.description,
        projects: values.projects,
        startDate: moment(values.startDate).format('YYYY-MM-DD'),
        endDate: moment(values.endDate).format('YYYY-MM-DD'),
    }

    post('/sprint', newValues)
        .then(data => {

            dispatch(toggleModalVisible())

            dispatch(sprintSearchByResult())

        })
        .catch(err => openNotificationWithIcon('error', err.message, 'Already exists this Sprint'))
}




/**
 * ----------------------------------------------------------------------------------------------------
 * Modal form toggle (visible or no)
 * ----------------------------------------------------------------------------------------------------
 */
export const toggleModalVisible = () => (dispatch, getState) => {

    const { modal } = getState().sprintReducer

    dispatch({
        type: SPRINT_TOGGLE_MODAL_VISIBLE,
        payload: {
            modal: {
                ...modal,
                modalVisible: !modal.modalVisible
            }
        }
    })
}


/**
 * ------------------------------------------------------------------------------------------------------
 * Edit Item
 * ------------------------------------------------------------------------------------------------------
 */
export const editItem = (id) => (dispatch, getState) => {

    const { list, modal } = getState().sprintReducer

    const findItem = list.find(item => item._id == id)

    const EditInfo = {
        _id: findItem._id,
        name: findItem.name,
        description: findItem.description,
        startDate: moment(findItem.startDate, "YYYY-MM-DD"),
        endDate: moment(findItem.endDate, "YYYY-MM-DD"),
        projects: findItem.projects,
    }


    dispatch({
        type: SPRINT_EDIT_ITEM,
        payload: {
            modal: {
                ...modal,
                modalTitle: 'Edit Item',
                okText: 'Update',
                EditInfo,
                modalVisible: true
            }
        }
    })

}


/**
 * -------------------------------------------------------------------------------------------------
 * Update Task
 * -------------------------------------------------------------------------------------------------
 */
export const updateItem = (values) => (dispatch, getState) => {

    const { modal } = getState().sprintReducer

    const { _id } = modal.EditInfo

    const newValues = {
        ...values,
        name: values.name,
        description: values.description,
        projects: values.projects,
        startDate: moment(values.startDate).format('YYYY-MM-DD'),
        endDate: moment(values.endDate).format('YYYY-MM-DD'),
    }


    put('/sprint/' + _id, newValues)
        .then(data => {

            dispatch(toggleModalVisible())

            dispatch(sprintSearchByResult())

        })
        .catch(err => openNotificationWithIcon('error', err.message, 'Already exists this item'))
}

//-- Update Task Status (true/false)
export const updateStatus = (values) => (dispatch, getState) => {

    const { _id, status } = values

    const data = { status }

    put('/sprint/status/' + _id, data)
        .then(data => {

            dispatch(sprintSearchByResult())

        })
        .catch(err => openNotificationWithIcon('error', err.message, 'Task status updating problem'))
}


//-- Remove user
export const removeItem = (id) => (dispatch, getState) => {

    // let { taskList } = getState().releaseReducer

    deleteMethod('/sprint/' + id)
        .then(data => {
            dispatch(sprintSearchByResult())
        })
}

/**
 * ------------------------------------------------------------------------------------------------------
 * Edit Task
 * ------------------------------------------------------------------------------------------------------
 */
export const editTask = (sprintName, id) => (dispatch, getState) => {

    const { taskList, upcomingTaskModal } = getState().sprintReducer

    const findSprint = taskList.find(item => item.sprintName == sprintName)
    const findTask = findSprint.result.find(item => item._id == id)

    // dispatch({
    //     type: 'BBB',
    //     payload: {
    //         findSprint,
    //         findTask
    //     }
    // })

    //-- load project releated release
    // dispatch(loadRelease(findTask.projectName))
    // dispatch(loadSprint(findTask.projectName))

    dispatch({
        type: SPRINT_EDIT_TASK,
        payload: {
            upcomingTaskModal: {
                ...upcomingTaskModal,
                modalTitle: 'Edit Task',
                okText: 'Update',
                EditInfo: findTask,
                modalVisible: true
            }
        }
    })

    dispatch(loadSprintByProject(findTask.projectName))
    dispatch(loadReleaseByProject(findTask.projectName))
}

//-- Handle Submit
export const handleUpdateFromUpcomingTask = (values) => (dispatch, getState) => {

    const { upcomingTaskModal } = getState().sprintReducer

    //-- Update Task
    // dispatch(updateTask(values))
    //-- get User Name from userInfo
    const { userInfo } = getState().userReducer

    let newValues = { ...values, updatedBy: userInfo.name }

    dispatch({
        type: 'KKK',
        oldSprint: upcomingTaskModal.EditInfo.sprint,
        newSprint: newValues.sprint
    })

    if (values.completedAt != null) {
        newValues = {
            ...values,
            completedAt: moment(values.completedAt).format('YYYY-MM-DD'),
        }
    }

    const { _id } = upcomingTaskModal.EditInfo

    put('/upcoming-task/update/' + _id, newValues)
        .then(data => {

            dispatch(toggleTaskModalVisible())

            // dispatch(loadTaskBySprint(newValues.sprint))
            dispatch(loadTaskBySprint(upcomingTaskModal.EditInfo.sprint))
            dispatch(sprintSearchByResult())



        })
        .catch(err => openNotificationWithIcon('error', err.message, 'Already exists the task'))
}


/**
 * ----------------------------------------------------------------------------------------------------
 * Task Modal form toggle (visible or no)
 * ----------------------------------------------------------------------------------------------------
 */
export const toggleTaskModalVisible = () => (dispatch, getState) => {

    const { upcomingTaskModal } = getState().sprintReducer

    dispatch({
        type: SPRINT_TASK_TOGGLE_MODAL_VISIBLE,
        payload: {
            upcomingTaskModal: {
                ...upcomingTaskModal,
                modalVisible: !upcomingTaskModal.modalVisible
            }
        }
    })
}


/**
 * ----------------------------------------------------------------------------------------
 * load Sprint data for task editing period
 * ----------------------------------------------------------------------------------------
 * 
 */
export const loadSprintByProject = projectName => (dispatch, getState) => {

    const current = 1
    const pageSize = 10
    const status = false

    const searchUrl = `/sprint?page=${current}&limit=${pageSize}&project=${projectName}&status=${status}&text=`


    return get(searchUrl)
        .then(data => {

            const sprintList = data.map(item => {
                return {
                    name: item.name,
                    endDate: moment(item.endDate).format("DD-MMM-YYYY"),
                }
            })

            dispatch({
                type: SPRINT_LOAD_BY_PROJECT,
                payload: {
                    sprintList
                }
            })
        })
        .catch(err => console.log(err))
}

/**
 * ----------------------------------------------------------------------------------------
 * load Release data for task editing period
 * ----------------------------------------------------------------------------------------
 * 
 */
export const loadReleaseByProject = projectName => (dispatch, getState) => {

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
                type: SPRINT_LOAD_RELEASE_BY_PROJECT,
                payload: {
                    releaseList
                }
            })
        })
        .catch(err => console.log(err))
}

/**
 * ------------------------------------------------------------------------------------------------------
 * Edit Sub Task
 * ------------------------------------------------------------------------------------------------------
 */
export const editSubTask = (sprintName, taskId, subTaskId) => (dispatch, getState) => {

    const { taskList, subTaskModal } = getState().sprintReducer

    const findSprint = taskList.find(item => item.sprintName == sprintName)
    const findTask = findSprint.result.find(item => item._id == taskId)
    const findSubTask = findTask.subTasks.find(item => item._id == subTaskId)

    dispatch({
        type: SPRINT_EDIT_SUBTASK,
        payload: {
            subTaskModal: {
                // ...subTaskModal,
                modalTitle: 'Edit Sub Task',
                okText: 'Update',
                EditInfo: { ...findSubTask, taskName: findTask.taskName },
                modalVisible: true,
                taskId,
                sprintName
            }
        }
    })
}

/**
 * Handle SubTask Edit
 * @param {*} values 
 */
export const updateSubTask = (values) => (dispatch, getState) => {

    const { userInfo } = getState().userReducer
    const { subTaskModal } = getState().sprintReducer
    const newValues = { ...values, updatedBy: userInfo.name }

    const subTaskId = values._id
    const sprintName = subTaskModal.sprintName

    // dispatch({
    //     type: 'ABC',
    //     payload: {
    //         newValues,
    //         subTaskId,
    //         sprintName
    //     }
    // })

    put(`/upcoming-task/subtask/update/${subTaskId}`, newValues)
        .then(data => {

            dispatch(toggleSubtaskModalVisible())

            //-- Main Line item only Sprint Info
            dispatch(sprintSearchByResult())

            //-- subTask list by sprint name
            dispatch(loadTaskBySprint(sprintName))

        })
        .catch(err => console.log(err))
}

/**
 * ----------------------------------------------------------------------------------------------------
 * Subtask Modal form toggle (visible or no)
 * ----------------------------------------------------------------------------------------------------
 */
export const toggleSubtaskModalVisible = () => (dispatch, getState) => {

    const { subTaskModal } = getState().sprintReducer

    dispatch({
        type: SPRINT_SUBTASK_MODAL_TOGGLE_VISIBLE,
        payload: {
            subTaskModal: {
                ...subTaskModal,
                modalVisible: !subTaskModal.modalVisible,
            }
        }
    })
}


//-- filter by user name in sptint
export const filterByUserName = (sprintName, userName) => (dispatch, getState) => {
    
    const { taskList } = getState().sprintReducer
    
    let sprintList = taskList.find(item => item.sprintName == sprintName)
    const sprintIndex = taskList.findIndex(item => item.sprintName == sprintName)
    
    const newResult = sprintList.result.filter( task => {

        const findUser = task.subTasks.find( subTask => subTask.assignedUser == userName)

        if(findUser) {
            return task
        }
    })

    // set new sprint list
    sprintList = {
        ...sprintList,
        result: newResult
    }

    dispatch({
        type: SPRINT_FILTER_BY_USER_NAME,
        payload: {
            taskListByFilter: [sprintList]
        }
    })
}