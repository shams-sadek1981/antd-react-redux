import { get, post, put, deleteMethod } from '../functions'


//-- Define action names
export const CHANGE_ADMIN_PANEL_SELECTED_KEYS = "CHANGE_ADMIN_PANEL_SELECTED_KEYS"
export const CHANGE_ADMIN_PANEL_SELECTED_KEYS_BY_PATH = "CHANGE_ADMIN_PANEL_SELECTED_KEYS_BY_PATH"

export const changeSelectedKeys = (keyNo) => {
    return (dispatch, getState) => {
        
        const adminPanel = getState().adminPanelReducer
        
        const findPath = adminPanel.menus.find( item => item.keyNo == keyNo)

        dispatch({
            type: CHANGE_ADMIN_PANEL_SELECTED_KEYS,
            payload: {
                selectedKeys: [findPath.keyNo.toString()]
            }
        })
    }
}

export const changeSelectedKeysByPath = (pathName) => {
    return (dispatch, getState) => {
        
        const adminPanel = getState().adminPanelReducer
        
        const findPath = adminPanel.menus.find( item => item.to == pathName)

        dispatch({
            type: CHANGE_ADMIN_PANEL_SELECTED_KEYS_BY_PATH,
            payload: {
                selectedKeys: [findPath.keyNo.toString()]
            }
        })
    }
}