import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
    Form, Icon, Input, Button, Checkbox, Row, Col, notification
} from 'antd';

import { get, post, postWithoutToken } from '../../functions'
import Cookies from 'universal-cookie';

//-- initialize cookies
const cookies = new Cookies();


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};


const manageCookie = (values) => {
    
    const { email, password, remember } = values

    if (remember) {
        cookies.set('password', password, { path: '/login' });
        cookies.set('email', email, { path: '/login' });
        cookies.set('remember', remember, { path: '/login' });
    }else{
        cookies.remove('email', { path: '/login' });
        cookies.remove('password', { path: '/login' });
        cookies.remove('remember', { path: '/login' });
    }
}

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                const { email, password, remember } = values
                
                const userInfo = {
                    email,
                    password
                }

                //-- check user info
                postWithoutToken('/users/login', userInfo)
                    .then( async data => {
                        //-- manage cookie
                        manageCookie(values)

                        //-- set token in local storage
                        await localStorage.setItem('token', data.token)

                        this.props.history.push('/admin-panel')
                    })
                    .catch(err => openNotificationWithIcon('error', err.message, 'Your password or email is mismatch'))

            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col offset={9} span={6}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                                initialValue: cookies.get('email')
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
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
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                        </Button>
                            Or <NavLink to="/signup">register now!</NavLink>
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
export default connect(mapStateToProps)(loginForm)
