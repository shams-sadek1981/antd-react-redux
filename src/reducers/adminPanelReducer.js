import {
    CHANGE_ADMIN_PANEL_SELECTED_KEYS
} from '../actions/adminPanelActions'

//-- Initialize State
const initialState = {
    selectedKeys: ['1'],
    menus: [
        {
            keyNo:1,
            label: 'Dasboard',
            to: '/admin-panel',
            breadcrumb: ['Dashboard'],
            iconType: 'bar-chart',
            exact: true
        },
        {
            keyNo:2,
            label: 'User',
            to: '/admin-panel/users',
            breadcrumb: ['Admin Panel','Users'],
            iconType: 'user'
        },
        {
            keyNo:8,
            label: 'User Role',
            to: '/admin-panel/users-role',
            breadcrumb: ['Admin Panel','User Role'],
            iconType: 'control'
        },
        {
            keyNo:9,
            label: 'Project',
            to: '/admin-panel/project',
            breadcrumb: ['Admin Panel','Project'],
            iconType: 'project'
        },
        {
            keyNo:10,
            label: 'Public Holiday',
            to: '/admin-panel/public-holiday',
            breadcrumb: ['Admin Panel','Public Holiday'],
            iconType: 'snippets'
        },
        {
            keyNo:3,
            label: 'Upcoming Task',
            to: '/admin-panel/upcoming-task',
            breadcrumb: ['Admin Panel','Upcoming Task'],
            iconType: 'unordered-list'
        },
        {
            keyNo:4,
            label: 'Release',
            to: '/admin-panel/release',
            breadcrumb: ['Admin Panel','Release'],
            iconType: 'highlight'
        },
        {
            keyNo:5,
            label: 'Reports',
            to: '/admin-panel/reports',
            breadcrumb: ['Admin Panel','Report'],
            iconType: 'bar-chart'
        },
        {
            keyNo:7,
            label: 'Upload',
            to: '/admin-panel/upload',
            breadcrumb: ['Admin Panel','Upload'],
            iconType: 'upload'
        }
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