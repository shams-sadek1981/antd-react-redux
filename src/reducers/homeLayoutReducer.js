import {
    CHANGE_SELECTED_KEYS,
    CHANGE_BREADCRUMB
} from '../actions/homeLayoutActions'


const initialState = {
    selectedKeys: ['1'],
    selectedBreadcrumb: ['Home'],
    menus: [
        {
            keyNo:1,
            label: 'Home',
            to: '/',
            breadcrumb: ['Home']
        },
        {
            keyNo:2,
            label: 'About Us',
            to: '/about-us',
            breadcrumb: ['Home', 'About Us']
        },
        {
            keyNo:3,
            label: 'Contact Us',
            to: '/contact-us',
            breadcrumb: ['Home', 'Contact Us']
        },
        {
            keyNo:4,
            label: 'Login',
            to: '/login',
            breadcrumb: ['Home', 'Login']
        },
    ]
}

const homeLayoutReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_SELECTED_KEYS:
            return Object.assign({}, state, {
                selectedKeys: action.payload.selectedKeys
            })
        
        case CHANGE_BREADCRUMB:
            return Object.assign({}, state, {
                selectedBreadcrumb: action.payload.selectedBreadcrumb
            })
    }

    return state
}

export default homeLayoutReducer;