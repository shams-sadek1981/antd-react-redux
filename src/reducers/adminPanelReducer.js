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
            exact: true,
            permission: 'menu_dashboard'
        },
        {
            keyNo:2,
            label: 'User',
            to: '/admin-panel/users',
            breadcrumb: ['Admin Panel','Users'],
            iconType: 'user',
            permission: 'menu_user'
        },
        {
            keyNo:8,
            label: 'User Role',
            to: '/admin-panel/users-role',
            breadcrumb: ['Admin Panel','User Role'],
            iconType: 'control',
            permission: 'menu_user_role'
        },
        {
            keyNo:9,
            label: 'Project',
            to: '/admin-panel/project',
            breadcrumb: ['Admin Panel','Project'],
            iconType: 'project',
            permission: 'menu_project'
        },
        {
            keyNo:10,
            label: 'Public Holiday',
            to: '/admin-panel/public-holiday',
            breadcrumb: ['Admin Panel','Public Holiday'],
            iconType: 'snippets',
            permission: 'menu_public_holiday'
        },
        {
            keyNo:3,
            label: 'Upcoming Task',
            to: '/admin-panel/upcoming-task',
            breadcrumb: ['Admin Panel','Upcoming Task'],
            iconType: 'unordered-list',
            permission: 'menu_upcoming_task'
        },
        {
            keyNo:4,
            label: 'Release',
            to: '/admin-panel/release',
            breadcrumb: ['Admin Panel','Release'],
            iconType: 'highlight',
            permission: 'menu_release'
        },
        {
            keyNo:5,
            label: 'Reports',
            to: '/admin-panel/reports',
            breadcrumb: ['Admin Panel','Report'],
            iconType: 'bar-chart',
            permission: 'menu_reports'
        },
        {
            keyNo:7,
            label: 'Upload',
            to: '/admin-panel/upload',
            breadcrumb: ['Admin Panel','Upload'],
            iconType: 'upload',
            permission: 'menu_upload'
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