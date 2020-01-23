import { combineReducers } from 'redux'

import todoReducer from './todoReducer'
import userReducer from './userReducer'
import userRoleReducer from './userRoleReducer'
import homeLayoutReducer from './homeLayoutReducer'
import customerReducer from './customerReducer'
import upcomingTaskReducer from './upcomingTaskReducer'
import releaseReducer from './releaseReducer'
import sprintReducer from './sprintReducer'
import adminDashboardReducer from './adminDashboardReducer'
import adminPanelReducer from './adminPanelReducer'
import reportsReducer from './reportsReducer'
import projectReducer from './projectReducer'
import publicHolidayReducer from './publicHolidayReducer'
import taskTypeReducer from './taskTypeReducer'
import reportPersonalReducer from './reportPersonalReducer'
import evaluationReducer from './evaluationReducer'

const rootReducer = combineReducers({
    todoReducer,
    userReducer,
    userRoleReducer,
    homeLayoutReducer,
    customerReducer,
    upcomingTaskReducer,
    releaseReducer,
    sprintReducer,
    adminDashboardReducer,
    adminPanelReducer,
    reportsReducer,
    projectReducer,
    publicHolidayReducer,
    taskTypeReducer,
    reportPersonalReducer,
    evaluationReducer
})

export default rootReducer