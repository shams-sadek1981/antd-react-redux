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


class AdminPanel extends Component {

    state = {
        collapsed: false,
    };

    componentDidMount = async () => {
        await this.props.dispatch(getPermissions())

        const runningPath = await this.props.location.pathname
        this.props.dispatch(changeSelectedKeysByPath(runningPath))

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    logout = () => {
        // console.log('hi')
        localStorage.removeItem('token')
        this.props.history.push('/login')
    }

    render() {
        const { adminPanel, dispatch, users } = this.props
        const { path, url } = this.props.match

        return (
            <div id="admin-panel">
                <Layout>
                    <Sider
                        className="no-print"
                        trigger={null}
                        collapsible
                        collapsed={this.props.collapsed}
                    >
                        <div className="logo">{users.userInfo.name}</div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={adminPanel.selectedKeys}
                        >

                            {
                                adminPanel.menus.map((item, index) => (
                                    <Menu.Item key={item.keyNo} onClick={() => dispatch(changeSelectedKeys(item.keyNo))}>
                                        <NavLink to={item.to} exact={item.exact}>
                                            <Icon type={item.iconType} />
                                            <span>{item.label}</span>
                                        </NavLink>
                                    </Menu.Item>
                                ))
                            }

                            <Menu.Item onClick={() => this.logout() }>
                                <NavLink to="/login">
                                    <Icon type='logout'/>
                                    <span>Logout</span>
                                </NavLink>
                            </Menu.Item>

                        </Menu>
                    </Sider>

                    <Layout>
                        <Header
                            className="no-print"
                            style={{ background: '#fff', padding: 0 }}
                        >
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Header>


                        <Content style={{
                            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                        }}
                        >
                            <AdminRoutes {...this.props} />
                        </Content>

                    </Layout>
                </Layout>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    adminPanel: state.adminPanelReducer,
    users: state.userReducer,
})

export default withRouter(connect(mapStateToProps)(AdminPanel))
