import { combineReducers } from 'redux'

import todoReducer from './todoReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    todoReducer,
    userReducer
})

export default rootReducer