import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, BrowserRouter, withRouter } from 'react-router-dom'
import {
    Form, Icon, Input, Button, Checkbox, Row, Col, notification
} from 'antd';

import { get, post, postWithoutToken } from '../../functions'
import Cookies from 'universal-cookie';

import { userLogin } from '../../actions/userActions'




const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};


class LoginForm extends React.Component {
    
    componentDidMount(){

        /**
         * Redirect admin panel if already has token
         * 
         */
        if (localStorage.getItem('token')) {
            this.props.history.push('/admin-panel')
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { email, password, remember } = values
                
                const userInfo = {
                    email,
                    password
                }


                //-- check user info
                this.props.dispatch( userLogin (this.props.history, userInfo, values))
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        //-- initialize cookies
        const cookies = new Cookies();

        return (
            <Row>
                <Col offset={9} span={6}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                                // initialValue: ''
                                initialValue: cookies.get('email')
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                                // initialValue: ''
                                initialValue: cookies.get('password')
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: JSON.parse(cookies.get('remember') || false),
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                        </Button>
                            {/* Or <NavLink to="/signup">register now!</NavLink> */}
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}


const mapStateToProps = state => ({
    users: state.userReducer
})


const loginForm = Form.create()(LoginForm)
export default withRouter(connect(mapStateToProps)(loginForm))
