import React, { Component, Fragment } from 'react'
import moment from 'moment'
import {
    Button, Modal, Form, Input, Radio, Icon, Select, DatePicker
} from 'antd';


import { toggleModalVisible } from '../../actions/upcomingTaskActions'

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MMM-DD';

export const NewTaskModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, upcomingTask, users } = this.props

            //-- Set Completed At
            let completedAt = { initialValue: moment(upcomingTask.modal.EditInfo.completedAt) }
            if (upcomingTask.modal.EditInfo.completedAt == undefined) {
                completedAt = {}
            }

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
                                // rules: [{ required: true, message: 'Please input the description!' }],
                            })(
                                <TextArea rows={4} />
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

                        <Form.Item label="Assigned By">
                            {getFieldDecorator('assignedBy', {
                                initialValue: upcomingTask.modal.EditInfo.assignedBy,
                                // rules: [{ required: true, message: 'Please select user' }],
                            })(
                                <Select
                                    showSearch
                                    // style={{ width: 200 }}
                                    placeholder="Select a user"
                                >
                                    {
                                        users.userList.map((item, index) => (
                                            <Option value={item.name} key={index}>{item.name}</Option>
                                        ))
                                    }

                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="Completed At">
                            {getFieldDecorator('completedAt', {
                                ...completedAt
                                // initialValue: startDate,
                            })(
                                <DatePicker format={dateFormat} />
                            )}
                        </Form.Item>
                        
                    </Form>
                </Modal>
            );
        }
    }
);