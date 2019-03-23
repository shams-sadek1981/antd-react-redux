import React, { Component, Fragment } from 'react'

import {
    Button, Modal, Form, Input, Radio, Icon
} from 'antd';


import { toggleModalVisible } from '../../actions/userActions'

export const NewUserModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, users } = this.props
            return (
                <Modal
                    visible={users.modal.modalVisible}
                    title={users.modal.modalTitle}
                    okText={users.modal.okText}
                    onCancel={() => dispatch(toggleModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item label="User Name">
                            {getFieldDecorator('name', {
                                initialValue: users.modal.userEditInfo.name,
                                rules: [{ required: true, message: 'Please input the user name!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                initialValue: users.modal.userEditInfo.email,
                                rules: [{ required: true, message: 'Please input the user email!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="Password">
                            {getFieldDecorator('password', {
                                initialValue: '123456',
                                rules: [{ required: true, message: 'Please input the user password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>

                        <Form.Item label="Mobile">
                            {getFieldDecorator('mobile', {
                                initialValue: users.modal.userEditInfo.mobile,
                                rules: [{ required: true, message: 'Please input the mobile no!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);