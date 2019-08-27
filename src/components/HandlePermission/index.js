import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import './adminPanel.less'
import { changeSelectedKeysByPath, changeSelectedKeys } from '../../actions/adminPanelActions'
import { getPermissions } from '../../actions/userActions'
import { AdminRoutes } from './AdminRoutes'

const {
    Header, Footer, Sider, Content,
} = Layout;


export const HandlePermission = (props) => {


    const { adminPanel, dispatch } = this.props
    const { path, url } = this.props.match

    return (
        <div>
            
        </div>
    )
}