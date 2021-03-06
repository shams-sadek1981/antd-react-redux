import {
    CHANGE_ADMIN_PANEL_SELECTED_KEYS,
    CHANGE_ADMIN_PANEL_SELECTED_KEYS_BY_PATH
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
            keyNo:11,
            label: 'User Report',
            to: '/admin-panel/user-report',
            breadcrumb: ['Admin Panel','User Report'],
            iconType: 'bar-chart',
            permission: 'menu_user_report'
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
            keyNo:13,
            label: 'Sprint',
            to: '/admin-panel/sprint',
            breadcrumb: ['Admin Panel','Sprint'],
            iconType: 'area-chart',
            permission: 'menu_sprint'
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
            keyNo:14,
            label: 'Evaluation',
            to: '/admin-panel/evaluation',
            breadcrumb: ['Admin Panel','Evaluation'],
            iconType: 'bar-chart',
            permission: 'menu_evaluation'
        },
        {
            keyNo:7,
            label: 'Upload',
            to: '/admin-panel/upload',
            breadcrumb: ['Admin Panel','Upload'],
            iconType: 'upload',
            permission: 'menu_upload'
        },
        // {
        //     keyNo:12,
        //     label: 'Change Password',
        //     to: '/admin-panel/change-password',
        //     breadcrumb: ['Admin Panel','Change Password'],
        //     iconType: 'key',
        //     permission: 'menu_upcoming_task'
        // },
    ]
}

const adminDashboardReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHANGE_ADMIN_PANEL_SELECTED_KEYS_BY_PATH:
        case CHANGE_ADMIN_PANEL_SELECTED_KEYS:
            return Object.assign({}, state, {
                selectedKeys: action.payload.selectedKeys
            })

    }

    return state;
}

export default adminDashboardReducer;