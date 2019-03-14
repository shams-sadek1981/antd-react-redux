import { combineReducers } from 'redux'

import todoReducer from './todoReducer'
import userReducer from './userReducer'
import homeLayoutReducer from './homeLayoutReducer'

const rootReducer = combineReducers({
    todoReducer,
    userReducer,
    homeLayoutReducer
})

export default rootReducer