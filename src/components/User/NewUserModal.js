import React, { Component, Fragment } from 'react'

import {
    Button, Modal, Form, Input, Radio, Icon, Select
} from 'antd';


import { toggleModalVisible } from '../../actions/userActions'

const { Option } = Select;

export const NewUserModal = Form.create({ name: 'form_in_modal' })(
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

            //-- get Selected Roles
            let selectedRoles = []
            users.modal.userEditInfo.roles.forEach(item => {
                selectedRoles.push(item.roleName)
            })

            //-- get Selected Projects
            let selectedProjects = []
            users.modal.userEditInfo.projects.forEach(item => {
                selectedProjects.push(item.projectName)
            })

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
                                <Input autoComplete="off" />
                            )}
                        </Form.Item>

                        <Form.Item label="Select Department">
                            {getFieldDecorator('department', {
                                initialValue: users.modal.userEditInfo.department,
                                rules: [{ required: true, message: 'Please select department' }],
                            })(
                                <Select
                                    showSearch
                                    // style={{ width: 200 }}
                                    placeholder="Select a department"
                                >
                                    {
                                        users.departmentList.map((item, index) =>
                                            <Option value={item.name} key={index}>{item.name}</Option>
                                        )
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="Email">
                            {getFieldDecorator('email', {
                                initialValue: users.modal.userEditInfo.email,
                                rules: [{ required: true, message: 'Please input the user email!' }],
                            })(
                                <Input autoComplete="off" />
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
                                <Input autoComplete="off" />
                            )}
                        </Form.Item>


                        {
                            (users.modal.okText == 'Update') &&
                            <Fragment>

                                <Form.Item label="Select Role">
                                    {getFieldDecorator('roles', {
                                        initialValue: selectedRoles,
                                        // rules: [{ required: true, message: 'Please select role' }],
                                    })(
                                        <Select
                                            mode="multiple"
                                            showSearch
                                            placeholder="Select a role"
                                            onChange={handleChange}
                                        >
                                            {
                                                userRole.roleList.map((item, index) =>
                                                    <Option value={item.name} key={index}>{item.name}</Option>
                                                )
                                            }
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item label="Select Project">
                                    {getFieldDecorator('projects', {
                                        initialValue: selectedProjects,
                                        // rules: [{ required: true, message: 'Please select role' }],
                                    })(
                                        <Select
                                            mode="multiple"
                                            showSearch
                                            placeholder="Select a project"
                                            onChange={handleChange}
                                        >
                                            {
                                                project.list.map((item, index) =>
                                                    <Option value={item.name} key={index}>{item.name}</Option>
                                                )
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Fragment>
                        }

                    </Form>
                </Modal>
            );
        }
    }
);