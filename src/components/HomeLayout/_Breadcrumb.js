import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Breadcrumb } from 'antd';

import { navMenuClick } from '../../actions/homeLayoutActions'

export const _Breadcrumb = (props) => {

    const { dispatch, homeLayout } = props

    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            {
                homeLayout.selectedBreadcrumb.map( (item, index) => {
                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                })
            }
        </Breadcrumb>
    )
}