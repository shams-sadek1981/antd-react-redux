//-- Define action names
export const CHANGE_SELECTED_KEYS = "CHANGE_SELECTED_KEYS"

export const changeLoggedIn = (selectedKeys) => {
    return (dispatch, getState) => {

        dispatch({
            type: CHANGE_SELECTED_KEYS,
            payload: {
                selectedKeys
            }
        })
    }
}

export const navMenuClick = (selectedKeys) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_SELECTED_KEYS,
            payload: {
                selectedKeys: [selectedKeys.toString()]
            }
        })
    }
}
export const changeSelectedKeysByPath = (pathName) => {
    return (dispatch, getState) => {
        const homeLayout = getState().homeLayoutReducer
        
        const findPath = homeLayout.menus.find( item => item.to == pathName)

        dispatch({
            type: CHANGE_SELECTED_KEYS,
            payload: {
                selectedKeys: [findPath.keyNo.toString()]
            }
        })
    }
}