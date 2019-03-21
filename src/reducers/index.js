import { combineReducers } from 'redux'

import todoReducer from './todoReducer'
import userReducer from './userReducer'
import homeLayoutReducer from './homeLayoutReducer'
import customerReducer from './customerReducer'

const rootReducer = combineReducers({
    todoReducer,
    userReducer,
    homeLayoutReducer,
    customerReducer
})

export default rootReducer