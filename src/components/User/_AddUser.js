import React from 'react'
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

import { saveUser } from '../../actions/userActions';

const { Option } = Select;

export const _AddUser = (props) => {

    const { getFieldDecorator } = props.form;

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };

    //-- Handle Submit
    const handleSubmit = (evt) => {
        evt.preventDefault()
        props.dispatch(saveUser(props.form.getFieldsValue()))
    }

    return (
        <Form {...formItemLayout}
            onSubmit={ handleSubmit }
        >
            <Form.Item
                label="E-mail"
            >
                {getFieldDecorator('email', {
                    initialValue: 'sadik@gmail.com',
                    rules: [{
                        type: 'email', message: 'The input is not valid E-mail!',
                    }, {
                        required: true, message: 'Please input your E-mail!',
                    }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="Password"
            >
                {getFieldDecorator('password', {
                    initialValue: '123456',
                    rules: [{
                        required: true, message: 'Please input your password!',
                    }]
                })(
                    <Input type="password" />
                )}
            </Form.Item>
            <Form.Item
                label={(
                    <span>
                        Name&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" />
                        </Tooltip>
                    </span>
                )}
            >
                {getFieldDecorator('name', {
                    initialValue: 'Sabbir',
                    rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                })(
                    <Input />
                )}
            </Form.Item>
            <Form.Item
                label="Mobile Number"
            >
                {getFieldDecorator('mobile', {
                    initialValue: '01761586077',
                    rules: [{ required: true, message: 'Please input your mobile number!' }],
                })(
                    <Input style={{ width: '100%' }} />
                )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    )
}