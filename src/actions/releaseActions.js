import moment from 'moment'

import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

//-- Define action names
export const RELEASE_SEARCH_BY_RESULT = "RELEASE_SEARCH_BY_RESULT"
export const RELEASE_CHANGE_TABKEY = "RELEASE_CHANGE_TABKEY"

export const RELEASE_ADD_NEW = "RELEASE_ADD_NEW"
export const RELEASE_SAVE_NEW_ITEM = "RELEASE_SAVE_NEW_ITEM"
export const RELEASE_EDIT_ITEM = "RELEASE_EDIT_ITEM"
export const RELEASE_UPDATE_ITEM = "RELEASE_UPDATE_ITEM"

export const RELEASE_SPINNING = "RELEASE_SPINNING"

export const RELEASE_TOGGLE_MODAL_VISIBLE = "RELEASE_TOGGLE_MODAL_VISIBLE"

export const RELEASE_REMOVE_TASK = "RELEASE_REMOVE_TASK"

export const RELEASE_CAL_EST_HOUR = "RELEASE_CAL_EST_HOUR"

export const RELEASE_SEARCH_BY = "RELEASE_SEARCH_BY"

export const RELEASE_CHANGE_PAGINATION = "RELEASE_CHANGE_PAGINATION"

export const RELEASE_BY_UPCOMING_TASK = "RELEASE_BY_UPCOMING_TASK"


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
        dispatch(releaseSearchByResult())

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

        const { searchBy, pagination } = getState().releaseReducer
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


        getResult(current, pageSize, project, status, text)
            .then(data => {
                dispatch({
                    type: RELEASE_CHANGE_TABKEY,
                    payload: {
                        status,
                        tabKey: value,
                        searchBy: newSearchBy,
                        pagination: {
                            ...data.pagination,
                            current: 1 //-- set current while changing tabkey
                        },
                        list: data.result
                    }
                })
            })
    }
}//-- end




//-- Toggle Spinning
export const toggleSpinning = (booleanValue) => {
    return (dispatch, getState) => {

        const { spinning } = getState().releaseReducer

        dispatch({
            type: RELEASE_SPINNING,
            payload: {
                spinning: booleanValue
            }
        })
    }
}

export const searchBy = (fieldName, value) => {
    return (dispatch, getState) => {

        dispatch(toggleSpinning(true))

        let { searchBy, pagination, tabKey } = getState().releaseReducer
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
            type: RELEASE_SEARCH_BY,
            payload: {
                searchBy,
                pagination
            }
        })


        //-- Load Result
        dispatch(releaseSearchByResult({ status, tabKey }))


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

    const searchUrl = `/release?page=${current}&pageSize=${pageSize}&project=${project}&status=${status}&text=${text}`

    return get(searchUrl)
        .then(data => data)
        .catch(err => console.log(err))
}


/**
 * ----------------------------------------------------------------------------------------------------
 * get upcoming task by release
 * ----------------------------------------------------------------------------------------------------
 */
export const loadTaskByRelease = version => (dispatch, getState) => {

    // const { taskList: oldTaskList } = getState().releaseReducer

    version = encodeURIComponent(version)

    const searchUrl = `/release/upcoming-task?version=${version}`

    return get(searchUrl)
        .then(data => {

            const newTaskList = data.result

            const { totalEst, completedEst, dueEst, percent} = data

            // const otherTaskList = oldTaskList.filter(item => item.release != version)

            dispatch({
                type: RELEASE_BY_UPCOMING_TASK,
                payload: {
                    taskList: [
                        // ...otherTaskList,
                        ...newTaskList
                    ],
                    sprint: {
                        totalEst,
                        completedEst,
                        dueEst,
                        percent
                    }
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
export const deleteTaskFromRelease = item => (dispatch, getState) => {

    const { _id, release } = item

    const newValues = { release: null }

    put('/upcoming-task/update/' + _id, newValues)
        .then(data => {

            dispatch(loadTaskByRelease(release))


        })
        .catch(err => console.log(err))
}


/**
 * ------------------------------------------------------------------------------------------
 * Task Result
 * ------------------------------------------------------------------------------------------
 */
export const releaseSearchByResult = () => {
    return (dispatch, getState) => {

        let { searchBy, pagination } = getState().releaseReducer
        let { current, pageSize } = pagination
        const { project, text, status } = searchBy

        getResult(current, pageSize, project, status, text)
            .then(data => {
                dispatch({
                    type: RELEASE_SEARCH_BY_RESULT,
                    payload: {
                        list: data.result,
                        // pagination: data.pagination,
                    }
                })
            })
    }
}//-- end function



//-- Handle Submit
export const handleSubmit = (values) => {
    return (dispatch, getState) => {

        const { modal } = getState().releaseReducer
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
export const addNew = () => {
    return (dispatch, getState) => {

        const { modal } = getState().releaseReducer

        const EditInfo = {
            releaseDate: moment(new Date()),
            projectName: '',
            version: '',
            description: '',
        }

        dispatch({
            type: RELEASE_ADD_NEW,
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
}



//-- Save New Task
export const saveNewItem = (values) => {

    return (dispatch, getState) => {

        const newValues = {
            ...values,
            releaseDate: moment(values.releaseDate).format('YYYY-MM-DD')
        }

        post('/release', newValues)
            .then(data => {

                dispatch(toggleModalVisible())

                dispatch(releaseSearchByResult())

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

        const { modal } = getState().releaseReducer

        dispatch({
            type: RELEASE_TOGGLE_MODAL_VISIBLE,
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
 * ------------------------------------------------------------------------------------------------------
 * Edit Item
 * ------------------------------------------------------------------------------------------------------
 */
export const editItem = (id) => {
    return (dispatch, getState) => {

        const { list, modal } = getState().releaseReducer

        const findItem = list.find(item => item._id == id)

        console.log(findItem)

        const EditInfo = {
            _id: findItem._id,
            releaseDate: moment(findItem.releaseDate, "YYYY-MM-DD"),
            projectName: findItem.projectName,
            version: findItem.version,
            description: findItem.description,
        }


        dispatch({
            type: RELEASE_EDIT_ITEM,
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
}


/**
 * -------------------------------------------------------------------------------------------------
 * Update Task
 * -------------------------------------------------------------------------------------------------
 */
export const updateItem = (values) => {

    return (dispatch, getState) => {

        const { modal } = getState().releaseReducer

        const { _id } = modal.EditInfo

        const newValues = {
            ...values,
            releaseDate: moment(values.releaseDate).format('YYYY-MM-DD')
        }


        put('/release/' + _id, newValues)
            .then(data => {

                dispatch(toggleModalVisible())

                dispatch(releaseSearchByResult())

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Already exists this item'))
    }
}

//-- Update Task Status (true/false)
export const updateStatus = (values) => {

    return (dispatch, getState) => {

        const { _id, status } = values

        const data = { status }

        put('/release/' + _id, data)
            .then(data => {

                dispatch(releaseSearchByResult())

            })
            .catch(err => openNotificationWithIcon('error', err.message, 'Task status updating problem'))
    }
}


//-- Remove user
export const removeItem = (id) => {

    return (dispatch, getState) => {

        // let { taskList } = getState().releaseReducer

        deleteMethod('/release/' + id)
            .then(data => {
                dispatch(releaseSearchByResult())
            })
    }
}