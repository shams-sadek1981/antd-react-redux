//-- define actions
export const CHANGE_NAME = 'CHANGE_NAME'



export let changeName = (name) => {
    return (dispatch, getState) => {
        
        dispatch({
            type: CHANGE_NAME,
            payload: {
                name: name
            }
        })

    }
}