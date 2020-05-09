//-- Define action names
export const CHANGE_SELECTED_KEYS = "CHANGE_SELECTED_KEYS"
export const CHANGE_BREADCRUMB = "CHANGE_BREADCRUMB"

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

export const changeBreadcrumb = () => {
    return (dispatch, getState) => {

        const homeLayout = getState().homeLayoutReducer

        const selectedKey = homeLayout.selectedKeys[0]

        const findMenu = homeLayout.menus.find( item => item.keyNo == selectedKey)

        const breadcrumb = findMenu.breadcrumb

        dispatch({
            type: CHANGE_BREADCRUMB,
            payload: {
                selectedBreadcrumb: breadcrumb 
            }
        })
    }
}

/**
 * Menu Click
 * 
 * @param {*} selectedKeys 
 */
export const navMenuClick = (selectedKeys) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_SELECTED_KEYS,
            payload: {
                selectedKeys: [selectedKeys.toString()]
            }
        })

        dispatch( changeBreadcrumb() )
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

        //-- chenage breadcrumb
        dispatch( changeBreadcrumb() )

    }
}