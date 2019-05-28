import {
    USER_SUMMARY_LOADING,
    PROJECT_SUMMARY_LOADING,
} from '../actions/adminDashboardActions'

//-- Initialize State
const initialState = {
    userSummaryList: [
        // { assignedUser: 'Ashraf', estHour: 275 },
        // { assignedUser: 'Mishu', estHour: 115 },
        // { assignedUser: 'Rockybul', estHour: 120 },
        // { assignedUser: 'Sabbir', estHour: 350 },
        // { assignedUser: 'Edi Amin', estHour: 150 }
    ],
    projectSummaryList: []
}

const adminDashboardReducer = (state = initialState, action) => {

    switch (action.type) {

        case USER_SUMMARY_LOADING:
            return Object.assign({}, state, {
                userSummaryList: action.payload.userSummaryList
            })

        case PROJECT_SUMMARY_LOADING:
            return Object.assign({}, state, {
                projectSummaryList: action.payload.projectSummaryList
            })


    }

    return state;
}

export default adminDashboardReducer;