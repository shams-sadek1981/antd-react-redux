import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import './adminPanel.less'
import { changeSelectedKeysByPath, changeSelectedKeys } from '../../actions/adminPanelActions'
import { AdminRoutes } from './AdminRoutes'

const {
    Header, Footer, Sider, Content,
} = Layout;


class AdminPanel extends Component {

    state = {
        collapsed: false,
    };

    componentDidMount() {
        const runningPath = this.props.location.pathname
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
        const { adminPanel, dispatch } = this.props
        const { path, url } = this.props.match

        return (
            <div id="admin-panel">
                <Layout>
                    <Sider
                        className="no-print"
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={adminPanel.selectedKeys}
                        >

                            <Menu.Item key="1" onClick={() => dispatch(changeSelectedKeys(1))}>
                                <NavLink to={`${url}`} exact>
                                    <Icon type="bar-chart" />
                                    <span>Dashboard</span>
                                </NavLink>
                            </Menu.Item>

                            <Menu.Item key="2" onClick={() => dispatch(changeSelectedKeys(2))}>
                                <NavLink to={`${url}/users`}>
                                    <Icon type="user" />
                                    <span>Users</span>
                                </NavLink>
                            </Menu.Item>

                            <Menu.Item key="3" onClick={() => dispatch(changeSelectedKeys(3))}>
                                <NavLink to={`${url}/upcoming-task`}>
                                    <Icon type="unordered-list" />
                                    <span>Upcoming Task</span>
                                </NavLink>
                            </Menu.Item>

                            <Menu.Item key="4" onClick={() => dispatch(changeSelectedKeys(4))}>
                                <NavLink to={`${url}/release`}>
                                    <Icon type="issues-close" />
                                    <span>Release</span>
                                </NavLink>
                            </Menu.Item>

                            <Menu.Item key="5" onClick={() => dispatch(changeSelectedKeys(5))}>
                                <NavLink to={`${url}/reports`}>
                                    <Icon type="snippets" />
                                    <span>Report</span>
                                </NavLink>
                            </Menu.Item>

                            <Menu.Item key="6">
                                <Icon type="logout" />
                                <span onClick={() => this.logout()}>Logout</span>
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
    adminPanel: state.adminPanelReducer
})

export default withRouter(connect(mapStateToProps)(AdminPanel))
