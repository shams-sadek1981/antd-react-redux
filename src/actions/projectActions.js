export const ADD_PROJECT = "ADD_PROJECT"

export const addProject = (projectInfo) => {
    return (dispatch, getState) => {

        dispatch({
            type: ADD_PROJECT
        })
    }
}