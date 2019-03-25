import { combineReducers } from 'redux'

import todoReducer from './todoReducer'
import userReducer from './userReducer'
import homeLayoutReducer from './homeLayoutReducer'
import customerReducer from './customerReducer'
import upcomingTaskReducer from './upcomingTaskReducer'

const rootReducer = combineReducers({
    todoReducer,
    userReducer,
    homeLayoutReducer,
    customerReducer,
    upcomingTaskReducer
})

export default rootReducer