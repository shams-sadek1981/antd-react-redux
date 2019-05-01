import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink, Route, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import AboutUs from '../AboutUs/'
import User from '../User'
import UpcomingTask from '../UpcomingTask'
import AdminDashboard from '../AdminDashboard'
import Release from '../Release'
import './adminPanel.less'

const {
    Header, Footer, Sider, Content,
} = Layout;


class AdminPanel extends Component {

    state = {
        collapsed: false,
    };

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
        const { path, url } = this.props.match

        return (
            <div id="admin-panel">
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']}>
                            
                            <Menu.Item key="1">
                                <Icon type="user" />
                                <span><NavLink to={`${url}`} exact>Dashboard</NavLink></span>
                            </Menu.Item>
                            
                            <Menu.Item key="2">
                                <Icon type="user" />
                                <span><NavLink to={`${url}/users`}>Users</NavLink></span>
                            </Menu.Item>

                            <Menu.Item key="3">
                                <Icon type="video-camera" />
                                <span><NavLink to="/admin-panel/customer">Customers</NavLink></span>
                            </Menu.Item>

                            <Menu.Item key="5">
                                <Icon type="user" />
                                <span><NavLink to={`${url}/upcoming-task`}>Upcoming Task</NavLink></span>
                            </Menu.Item>
                            
                            <Menu.Item key="6">
                                <Icon type="user" />
                                <span><NavLink to={`${url}/release`}>Release</NavLink></span>
                            </Menu.Item>

                            <Menu.Item key="4">
                                <Icon type="upload" />
                                <span onClick={() => this.logout()}>Logout</span>
                            </Menu.Item>

                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }}>
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
                            <Switch>
                                <Route exact path={`${path}`} component={AdminDashboard} />
                                <Route path={`${path}/users`} component={User} />
                                <Route path={`${path}/upcoming-task`} component={UpcomingTask} />
                                <Route path={`${path}/release`} component={Release} />
                                <Route path={`${path}/customer`} render={() => <h2>Customers</h2>} />
                                <Route render={() => <h2>Not Found Admin Panel child component</h2>} />
                            </Switch>

                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    // dashboard: state.dashboardReducer
})

export default withRouter(connect(mapStateToProps)(AdminPanel))
