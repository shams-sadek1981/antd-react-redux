import { combineReducers } from 'redux'

import todoReducer from './todoReducer'
import userReducer from './userReducer'
import userRoleReducer from './userRoleReducer'
import homeLayoutReducer from './homeLayoutReducer'
import customerReducer from './customerReducer'
import upcomingTaskReducer from './upcomingTaskReducer'
import releaseReducer from './releaseReducer'
import adminDashboardReducer from './adminDashboardReducer'
import adminPanelReducer from './adminPanelReducer'
import reportsReducer from './reportsReducer'
import projectReducer from './projectReducer'
import taskTypeReducer from './taskTypeReducer'

const rootReducer = combineReducers({
    todoReducer,
    userReducer,
    userRoleReducer,
    homeLayoutReducer,
    customerReducer,
    upcomingTaskReducer,
    releaseReducer,
    adminDashboardReducer,
    adminPanelReducer,
    reportsReducer,
    projectReducer,
    taskTypeReducer
})

export default rootReducer