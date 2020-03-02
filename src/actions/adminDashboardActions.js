import { get, post, put, deleteMethod } from '../functions'


//-- Define action names
export const USER_SUMMARY_LOADING = "USER_SUMMARY_LOADING"
export const PROJECT_SUMMARY_LOADING = "PROJECT_SUMMARY_LOADING"


/**
 * 
 * Load user summary
 */
export const userSummaryLoading = () => (dispatch, getState) => {
    get('/upcoming-task/summary-user')
        .then(data => {

            dispatch({
                type: USER_SUMMARY_LOADING,
                payload: {
                    userSummaryList: data.result
                }
            })

        })
        .catch(err => console.log(err))
}



export const projectSummaryLoading = () => (dispatch, getState) => {
    get('/upcoming-task/summary-project')
        .then(data => {

            dispatch({
                type: PROJECT_SUMMARY_LOADING,
                payload: {
                    projectSummaryList: data.result
                }
            })

        })
        .catch(err => console.log(err))
}