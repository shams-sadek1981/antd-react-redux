import React, { Component, Fragment } from 'react'

import {
    Button, Modal, Form, Input, Radio, Icon, Select
} from 'antd';


import { togglePasswordModalVisible } from '../../actions/userActions'

const { Option } = Select;

export const PasswordModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, users, userRole, project } = this.props

            function handleChange(value) {
                console.log(`selected ${value}`);
            }


            return (
                <Modal
                    visible={users.modalPassword.modalVisible}
                    title={ <div> <Icon type="key" /> Change Password </div> }
                    okText='OK'
                    onCancel={() => dispatch(togglePasswordModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Password">
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [{ required: true, message: 'Please input the user password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);