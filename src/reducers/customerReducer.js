import { ADD_NEW_CUSTOMER } from '../actions/customerActions'

const initialState = {
    list: ['Saidul', 'Mithun', 'Sadik']
}

const customerReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_NEW_CUSTOMER:
            return Object.assign({}, state, {
                list: action.payload.list
            })
        
    }

    return state
}

export default customerReducer;