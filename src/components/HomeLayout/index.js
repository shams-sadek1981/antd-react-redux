import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, NavLink, Route, Switch } from 'react-router-dom'
import AboutUs from '../AboutUs/'
import './homeLayout.less'
import LoginForm from '../LoginForm/'
import RegistrationForm from '../RegistrationForm'

import { Layout, Menu, Breadcrumb, Button } from 'antd';

import { changeSelectedKeysByPath, navMenuClick } from '../../actions/homeLayoutActions'

import { addNewCustomer } from '../../actions/customerActions'

import { _NavMenus } from './_NavMenus'
import { _Breadcrumb } from './_Breadcrumb'

const {
    Header, Footer, Sider, Content,
} = Layout;


const breadcrumbNameMap = {
    '/apps': 'Application List',
    '/apps/1': 'Application1',
    '/apps/2': 'Application2',
    '/apps/1/detail': 'Detail',
    '/apps/2/detail': 'Detail',
};

class HomeLayout extends Component {

    componentDidMount = () => {
        const runningPath = this.props.location.pathname
        this.props.dispatch(changeSelectedKeysByPath(runningPath))
    }

    render() {

        const { dispatch } = this.props

        return (
            <div id="home-layout">
                <Layout>
                    <Header style={{ textAlign: 'right' }}>
                        <div className="logo" />
                        <_NavMenus {...this.props}/>
                    </Header>

                    <_Breadcrumb {...this.props} />
                    <Content style={{ padding: '0 50px' }}>

                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            <Switch>
                                <Route exact path="/" render={() => <h1>Home Page</h1>} />
                                <Route path="/about-us" render={() => <h1>About Us</h1>} />
                                <Route path="/contact-us" render={() => <h1>Contact Us</h1>} />
                                <Route path="/login" component={LoginForm} />
                                <Route path="/signup" component={RegistrationForm} />
                                <Route render={() => <h1>Not Found Home Page</h1>} />
                            </Switch>
                        </div>

                    </Content>


                    <Footer style={{ textAlign: 'center' }}>
                        wedevs Limited©2019 Created by Shams Sadek
                    </Footer>
                </Layout>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    homeLayout: state.homeLayoutReducer,
    customer: state.customerReducer
})

export default withRouter(connect(mapStateToProps)(HomeLayout))