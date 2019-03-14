import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd';

import { navMenuClick } from '../../actions/homeLayoutActions'

export const _NavMenus = (props) => {

    const { dispatch, homeLayout } = props

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={ homeLayout.selectedKeys }
            style={{ lineHeight: '64px' }}
        >
            {
                homeLayout.menus.map(item => {
                    return <Menu.Item key={item.keyNo}>
                        <NavLink to={item.to} onClick={() => dispatch(navMenuClick(item.keyNo))}>
                            {item.label}
                        </NavLink>
                    </Menu.Item>
                })
            }
        </Menu>
    )
}