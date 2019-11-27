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
export const SPRINT_LOADING = "SPRINT_LOADING"

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
export const SPRINT_SET_SPRINT_AND_USER = "SPRINT_SET_SPRINT_AND_USER"
export const SPRINT_ADD_NEW_SUBTASK = "SPRINT_ADD_NEW_SUBTASK"
export const SPRINT_ADD_NEW_TASK = "SPRINT_ADD_NEW_TASK"


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

    // start spinning
    dispatch(toggleSpinning(true))

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
    let { project, text } = searchBy


    //-- set Project (array) Search By for user permission
    const { userInfo } = getState().userReducer
    project = getProjectSearchBy(userInfo, project)

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

            // start spinning
            dispatch(toggleSpinning(false))

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

//-- Toggle Loading
export const toggleLoading = (booleanValue) => (dispatch, getState) => {
    dispatch({
        type: SPRINT_LOADING,
        payload: {
            loading: booleanValue
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
export const loadTaskBySprint = (sprint, assignedUser = null) => (dispatch, getState) => {

    const { searchBy } = getState().sprintReducer

    dispatch({
        type: SPRINT_SET_SPRINT_AND_USER,
        payload: {
            searchBy: {
                ...searchBy,
                sprintName: sprint,
                sprintByUser: assignedUser
            }
        }
    })

    // load task
    dispatch(loadTaskBySearchItems())
}

// Load Task by Sprint & Assigned User
export const loadTaskBySearchItems = () => (dispatch, getState) => {

    // spinning start
    dispatch(toggleLoading(true))

    const { searchBy, taskList: oldTaskList, list: oldList } = getState().sprintReducer

    const { sprintName, sprintByUser } = searchBy

    let searchUrl = `/sprint/upcoming-task?sprintName=${sprintName}`

    if (sprintByUser) {
        searchUrl += `&assignedUser=${sprintByUser}`
    }

    get(searchUrl)
        .then(data => {

            const otherTaskList = oldTaskList.filter(item => item.sprintName != sprintName)

            // sprint list processing
            const currentSprintDetails = oldList.find(item => item.name == sprintName)

            const currentDetails = {
                ...currentSprintDetails,
                percent: data.percent,
                est: data.est,
                complete: data.complete,
                due: data.due,
                userDetails: data.userDetails
            }

            const findIndex = oldList.findIndex(item => item.name == sprintName)


            const newSprintList = [
                ...oldList.slice(0, findIndex),
                currentDetails,
                ...oldList.slice(findIndex + 1)
            ]

            dispatch({
                type: SPRINT_BY_UPCOMING_TASK,
                payload: {
                    // task list by sprint name
                    taskList: [
                        ...otherTaskList,
                        data
                    ],
                    // Sprint List
                    list: newSprintList
                }
            })

            dispatch(toggleLoading(false))
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

            dispatch(loadTaskBySearchItems())

        })
        .catch(err => console.log(err))
}


/**
 * ------------------------------------------------------------------------------------------
 * Task Result
 * ------------------------------------------------------------------------------------------
 */
export const sprintSearchByResult = () => async (dispatch, getState) => {

    // start spinning
    dispatch(toggleSpinning(true))

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

            // stop spinning
            dispatch(toggleSpinning(false))
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
 * Add New Task
 * ------------------------------------------------------------------------------------------------------
 */
export const addNewTask = (sprintName) => (dispatch, getState) => {

    const { upcomingTaskModal, list } = getState().sprintReducer

    const findSprintInfo = list.find(item => item.name == sprintName)

    const EditInfo = {
        taskName: '',
        projectName: '',
        taskType: '',
        description: '',
        assignedUser: '',
        sprint: sprintName
    }

    dispatch({
        type: SPRINT_ADD_NEW_TASK,
        payload: {
            upcomingTaskModal: {
                ...upcomingTaskModal,
                modalTitle: 'Create a new task',
                okText: 'Create',
                EditInfo,
                modalVisible: true,
                sprintProjects: findSprintInfo.projects
            }
        }
    })
}


//-- Save New Task
export const saveNewTask = (values) => (dispatch, getState) => {

    const { upcomingTaskModal } = getState().sprintReducer
    const { sprint } = upcomingTaskModal.EditInfo

    //-- get User Name from userInfo
    const { userInfo } = getState().userReducer

    let newValues = { ...values, updatedBy: userInfo.name, sprint }

    if (values.completedAt != null) {
        newValues = {
            ...values,
            completedAt: moment(values.completedAt).format('YYYY-MM-DD'),
        }
    }

    post('/upcoming-task/create', newValues)
        .then(data => {

            dispatch(toggleTaskModalVisible())

            // load task by search items
            dispatch(loadTaskBySearchItems())

        })
        .catch(err => openNotificationWithIcon('error', err.message, 'Already exists the task'))
}

/**
 * ------------------------------------------------------------------------------------------------------
 * Edit Task
 * ------------------------------------------------------------------------------------------------------
 */
export const editTask = (sprintName, id) => (dispatch, getState) => {

    const { taskList, upcomingTaskModal, list } = getState().sprintReducer

    const findSprint = taskList.find(item => item.sprintName == sprintName)
    const findTask = findSprint.result.find(item => item._id == id)

    const findSprintInfo = list.find(item => item.name == sprintName)

    dispatch({
        type: SPRINT_EDIT_TASK,
        payload: {
            upcomingTaskModal: {
                ...upcomingTaskModal,
                modalTitle: 'Edit Task',
                okText: 'Update',
                EditInfo: findTask,
                modalVisible: true,
                sprintProjects: findSprintInfo.projects
            }
        }
    })

    dispatch(loadSprintByProject(findTask.projectName))
    dispatch(loadReleaseByProject(findTask.projectName))
}


//-- Handle Submit Task
export const handleTaskSubmit = (values) => (dispatch, getState) => {

    const { upcomingTaskModal } = getState().sprintReducer
    const { okText } = upcomingTaskModal

    if (okText == "Create") {
        //-- Create New Task
        dispatch(saveNewTask(values))

    } else {
        //-- Update Task
        dispatch(updateTask(values))
    }
}

//-- Handle Submit
export const updateTask = (values) => (dispatch, getState) => {

    const { upcomingTaskModal } = getState().sprintReducer

    //-- get User Name from userInfo
    const { userInfo } = getState().userReducer

    let newValues = { ...values, updatedBy: userInfo.name }

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

            // load task by search items
            dispatch(loadTaskBySearchItems())


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
 * Add New Sub Task
 * ------------------------------------------------------------------------------------------------------
 */
export const addNewSubTask = (taskId, taskName) => (dispatch, getState) => {

    const { subTaskModal, taskList } = getState().sprintReducer

    const EditInfo = {
        taskName: taskName,
        name: '',
        assignedUser: '',
        estHour: '',
    }

    dispatch({
        type: SPRINT_ADD_NEW_SUBTASK,
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
                modalTitle: 'Edit Subtask',
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

    const { okText } = subTaskModal

    if (okText == "Create") {
        //-- Create New Task
        dispatch(saveNewSubTask(values))
    } else {
        //-- Update Task
        put(`/upcoming-task/subtask/update/${subTaskId}`, newValues)
            .then(data => {

                dispatch(toggleSubtaskModalVisible())

                // load task by search items
                dispatch(loadTaskBySearchItems())

            })
            .catch(err => console.log(err))
    }

}


/**
 * ----------------------------------------------------------------------------------------------------
 * Sub Task Delete
 * ----------------------------------------------------------------------------------------------------
 */
export const deleteSubTask = (taskId, subTaskId) => (dispatch, getState) => {

    deleteMethod(`/upcoming-task/subtask/delete/${subTaskId}`, { id: taskId })
        .then(data => {

            // dispatch(toggleSubtaskModalVisible())

            // load task by search items
            dispatch(loadTaskBySearchItems())

        })
        .catch(err => console.log(err))
}

/**
 * ----------------------------------------------------------------------------------------------------
 * Task Delete
 * ----------------------------------------------------------------------------------------------------
 */
export const deleteTask = (taskId) => (dispatch, getState) => {

    deleteMethod('/upcoming-task/delete/' + taskId)
        .then(data => {
            dispatch(toggleTaskModalVisible())

            // load task by search items
            dispatch(loadTaskBySearchItems())

        }).catch(err => console.log(err))
}


/**
 * ----------------------------------------------------------------------------------------------------
 * Sub Task Create
 * ----------------------------------------------------------------------------------------------------
 */
export const saveNewSubTask = (values) => (dispatch, getState) => {

    const { subTaskModal } = getState().sprintReducer
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

            // load task by search items
            dispatch(loadTaskBySearchItems())

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


/**
 * -------------------------------------------------------------------------------------------------
 * Update Running Task
 * -------------------------------------------------------------------------------------------------
 */
export const updateRunningTask = obj => (dispatch, getState) => {

    const { _id } = obj

    console.log(obj)

    put('/upcoming-task/update/' + _id, obj)
        .then(data => {

            // load task by search items
            dispatch(loadTaskBySearchItems())

            openNotificationWithIcon('success', 'Update Status', 'Updated successfully')
        })
        .catch(err => openNotificationWithIcon('error', 'Error', 'Something is wrong'))
}