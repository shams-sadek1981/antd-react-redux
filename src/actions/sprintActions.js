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

export const searchBy = (fieldName, value) => (dispatch, getState) => {

    dispatch(toggleSpinning(true))

    let { searchBy, pagination, tabKey } = getState().sprintReducer
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

    const searchUrl = `/sprint?page=${current}&limit=${pageSize}&project=${project}&status=${status}&text=${text}`

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

        })
        .catch(err => console.log(err))
}


/**
 * ------------------------------------------------------------------------------------------
 * Task Result
 * ------------------------------------------------------------------------------------------
 */
export const sprintSearchByResult = () => (dispatch, getState) => {

    let { searchBy, pagination } = getState().sprintReducer
    let { current, pageSize } = pagination
    const { project, text, status } = searchBy

    getResult(current, pageSize, project, status, text)
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

    console.log(findItem)

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