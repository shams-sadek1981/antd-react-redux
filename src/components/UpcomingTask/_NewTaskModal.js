import React, { Component, Fragment } from 'react'

import {
    Button, Modal, Form, Input, Radio, Icon, Select
} from 'antd';


import { toggleModalVisible } from '../../actions/upcomingTaskActions'

const { Option } = Select;

export const _NewTaskModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, upcomingTask, users } = this.props
            return (
                <Modal
                    visible={upcomingTask.modal.modalVisible}
                    title={upcomingTask.modal.modalTitle}
                    okText={upcomingTask.modal.okText}
                    onCancel={() => dispatch(toggleModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item label="Task Name">
                            {getFieldDecorator('taskName', {
                                initialValue: upcomingTask.modal.EditInfo.taskName,
                                rules: [{ required: true, message: 'Please input the task name!' }],
                            })(
                                <Input autoComplete="off"/>
                            )}
                        </Form.Item>

                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                initialValue: upcomingTask.modal.EditInfo.description,
                                rules: [{ required: true, message: 'Please input the description!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="Select Task Type">
                            {getFieldDecorator('taskType', {
                                initialValue: upcomingTask.modal.EditInfo.taskType,
                                rules: [{ required: true, message: 'Please select task type' }],
                            })(
                                <Select
                                    showSearch
                                    // style={{ width: 200 }}
                                    placeholder="Select a task type"
                                >
                                    {
                                        upcomingTask.taskTypes.map( (item, index) => 
                                            <Option value={item} key={index}>{item}</Option>
                                        )
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="Select Project">
                            {getFieldDecorator('projectName', {
                                initialValue: upcomingTask.modal.EditInfo.projectName,
                                rules: [{ required: true, message: 'Please select project' }],
                            })(
                                <Select
                                    showSearch
                                    // style={{ width: 200 }}
                                    placeholder="Select a project"
                                >
                                    {
                                        upcomingTask.projects.map( (item, index) => 
                                            <Option value={item} key={index}>{item}</Option>
                                        )
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="Select User">
                            {getFieldDecorator('assignedUser', {
                                initialValue: upcomingTask.modal.EditInfo.assignedUser,
                                rules: [{ required: true, message: 'Please select user' }],
                            })(
                                <Select
                                    showSearch
                                    // style={{ width: 200 }}
                                    placeholder="Select a user"
                                >
                                    {
                                        users.userList.map( (item, index) => (
                                            <Option value={item.name} key={index}>{item.name}</Option>
                                        ))
                                    }
                                    
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="Est Hour">
                            {getFieldDecorator('estHour', {
                                initialValue: upcomingTask.modal.EditInfo.estHour,
                                rules: [{ required: true, message: 'Please input the Est. Hour!' }],
                            })(
                                <Input autoComplete="off"/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);