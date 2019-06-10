import {
    CHANGE_ADMIN_PANEL_SELECTED_KEYS
} from '../actions/adminPanelActions'

//-- Initialize State
const initialState = {
    selectedKeys: ['1'],
    menus: [
        {
            keyNo:1,
            label: 'Admin Panel',
            to: '/admin-panel',
            breadcrumb: ['Admin Panel']
        },
        {
            keyNo:2,
            label: 'Users',
            to: '/admin-panel/users',
            breadcrumb: ['Admin Panel','Users']
        },
        {
            keyNo:3,
            label: 'Upcoming Task',
            to: '/admin-panel/upcoming-task',
            breadcrumb: ['Admin Panel','Upcoming Task']
        },
        {
            keyNo:4,
            label: 'Release',
            to: '/admin-panel/release',
            breadcrumb: ['Admin Panel','Release']
        },
        {
            keyNo:5,
            label: 'Reports',
            to: '/admin-panel/reports',
            breadcrumb: ['Admin Panel','Report']
        },
    ]
}

const adminDashboardReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHANGE_ADMIN_PANEL_SELECTED_KEYS:
            return Object.assign({}, state, {
                selectedKeys: action.payload.selectedKeys
            })

    }

    return state;
}

export default adminDashboardReducer;