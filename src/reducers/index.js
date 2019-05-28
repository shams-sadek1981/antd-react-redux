import { combineReducers } from 'redux'

import todoReducer from './todoReducer'
import userReducer from './userReducer'
import homeLayoutReducer from './homeLayoutReducer'
import customerReducer from './customerReducer'
import upcomingTaskReducer from './upcomingTaskReducer'
import releaseReducer from './releaseReducer'
import adminDashboardReducer from './adminDashboardReducer'
import adminPanelReducer from './adminPanelReducer'

const rootReducer = combineReducers({
    todoReducer,
    userReducer,
    homeLayoutReducer,
    customerReducer,
    upcomingTaskReducer,
    releaseReducer,
    adminDashboardReducer,
    adminPanelReducer
})

export default rootReducer