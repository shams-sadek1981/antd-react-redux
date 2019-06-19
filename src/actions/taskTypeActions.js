import { get, post, put, deleteMethod } from '../functions'

// export const ADD_TASK_TYPE = "ADD_TASK_TYPE"
export const LOAD_TASK_TYPE = "LOAD_TASK_TYPE"


// export const addProject = (projectInfo) => {
//     return (dispatch, getState) => {

//         dispatch({
//             type: ADD_PROJECT
//         })
//     }
// }

/**
 * --------------------------------------------------------------------------------------------------
 * get all project
 * --------------------------------------------------------------------------------------------------
 */
export const getAllTaskType = () => {

    return (dispatch, getState) => {

        const searchUrl = `/task-type`

        return get(searchUrl)
            .then(data => {
                dispatch({
                    type: LOAD_TASK_TYPE,
                    payload: {
                        taskTypeList: data.result
                    }
                })
            })
            .catch(err => console.log(err))
    }
}