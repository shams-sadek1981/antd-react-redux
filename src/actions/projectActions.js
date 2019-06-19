import { get, post, put, deleteMethod } from '../functions'

export const ADD_PROJECT = "ADD_PROJECT"
export const LOAD_PROJECT = "LOAD_PROJECT"


export const addProject = (projectInfo) => {
    return (dispatch, getState) => {

        dispatch({
            type: ADD_PROJECT
        })
    }
}

/**
 * --------------------------------------------------------------------------------------------------
 * get all project
 * --------------------------------------------------------------------------------------------------
 */
export const getAllProject = () => {

    return (dispatch, getState) => {

        const searchUrl = `/project`

        return get(searchUrl)
            .then(data => {
                dispatch({
                    type: LOAD_PROJECT,
                    payload: {
                        projectList: data.result
                    }
                })
            })
            .catch(err => console.log(err))
    }
}