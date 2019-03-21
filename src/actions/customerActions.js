//-- Define action names
export const ADD_NEW_CUSTOMER = "ADD_NEW_CUSTOMER"

export const addNewCustomer = (newName) => {
    return (dispatch, getState) => {

        const customerList = getState().customerReducer
        let list = customerList.list

        list.push(newName)

        dispatch({
            type: ADD_NEW_CUSTOMER,
            payload: {
                list: list
            }
        })

    }
}

