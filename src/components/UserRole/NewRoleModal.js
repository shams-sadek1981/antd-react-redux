import React, { Component, Fragment } from 'react'

import {
    Button, Modal, Form, Input, Radio, Icon, Select
} from 'antd';


import { toggleModalVisible } from '../../actions/userRoleActions'

const { Option } = Select;

export const NewRoleModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, userRole } = this.props

            return (
                <Modal
                    visible={userRole.modal.modalVisible}
                    title={userRole.modal.modalTitle}
                    okText={userRole.modal.okText}
                    onCancel={() => dispatch(toggleModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item label="User Role">
                            {getFieldDecorator('name', {
                                initialValue: userRole.modal.editInfo.name,
                                rules: [{ required: true, message: 'Please input the user name!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                initialValue: userRole.modal.editInfo.description,
                                // rules: [{ required: true, message: 'Please input the description!' }],
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