import React, { Component, Fragment } from 'react'

import {
    Button, Modal, Form, Input, Radio, Icon, Select
} from 'antd';


import { toggleSubtaskModalVisible } from '../../actions/task/subTaskActions'

const { Option } = Select;
const { TextArea } = Input;

export const SubTaskModal = Form.create({ name: 'single_task_modal' })(
    // eslint-disable-next-line
    class extends React.Component {

        render() {
            const {
                visible, onCancel, onCreate, form
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, upcomingTask, users } = this.props
            return (
                <Modal
                    visible={upcomingTask.subTaskModal.modalVisible}
                    title={upcomingTask.subTaskModal.modalTitle}
                    okText={upcomingTask.subTaskModal.okText}
                    onCancel={() => dispatch(toggleSubtaskModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        {/* <Form.Item label="" type="hidden"> */}
                            {getFieldDecorator('_id', {
                                initialValue: upcomingTask.subTaskModal.EditInfo._id,
                                // rules: [{ required: true, message: 'Please input the subtask!' }],
                            })(
                                <Input />
                            )}
                        {/* </Form.Item> */}

                        <Form.Item label="SubTask">
                            {getFieldDecorator('name', {
                                initialValue: upcomingTask.subTaskModal.EditInfo.name,
                                rules: [{ required: true, message: 'Please input the subtask!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>

                        <Form.Item label="Select User">
                            {getFieldDecorator('assignedUser', {
                                initialValue: upcomingTask.subTaskModal.EditInfo.assignedUser,
                                rules: [{ required: true, message: 'Please select user' }],
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
                        

                        <Form.Item label="Est Hour">
                            {getFieldDecorator('estHour', {
                                initialValue: upcomingTask.subTaskModal.EditInfo.estHour,
                                rules: [{ required: true, message: 'Please input the Est. Hour!' }],
                            })(
                                <Input autoComplete="off" />
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);