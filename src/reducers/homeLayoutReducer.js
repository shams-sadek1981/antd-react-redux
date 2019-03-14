import {
    CHANGE_SELECTED_KEYS,
} from '../actions/homeLayoutActions'


const initialState = {
    selectedKeys: ['1'],
    menus: [
        {
            keyNo:1,
            label: 'Home',
            to: '/',
        },
        {
            keyNo:2,
            label: 'About Us',
            to: '/about-us',
        },
        {
            keyNo:3,
            label: 'Contact Us',
            to: '/contact-us',
        },
        {
            keyNo:4,
            label: 'Login',
            to: '/login',
        },
    ]
}

const homeLayoutReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_SELECTED_KEYS:
            return Object.assign({}, state, {
                selectedKeys: action.payload.selectedKeys
            })
    }

    return state
}

export default homeLayoutReducer;