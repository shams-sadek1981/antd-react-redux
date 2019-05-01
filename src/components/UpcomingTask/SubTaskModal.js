import React, { Component, Fragment } from 'react'
import moment from 'moment'
import {
    Modal, Form, Input, Select, AutoComplete, DatePicker, Row, Col
} from 'antd';


import { toggleSubtaskModalVisible } from '../../actions/task/subTaskActions'

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MMM-DD';

export const SubTaskModal = Form.create({ name: 'single_task_modal' })(
    // eslint-disable-next-line
    class extends React.Component {

        render() {
            const {
                visible, onCancel, onCreate, form
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, upcomingTask, users } = this.props

            //-- Set Start Date
            let startDate = { initialValue: moment(upcomingTask.subTaskModal.EditInfo.startDate) }
            if (upcomingTask.subTaskModal.EditInfo.startDate == undefined) {
                startDate = {}
            }

            //-- Set Due Date
            let dueDate = { initialValue: moment(upcomingTask.subTaskModal.EditInfo.dueDate) }
            if (upcomingTask.subTaskModal.EditInfo.dueDate == undefined) {
                dueDate = {}
            }
            
            //-- Set Completed At
            let completedAt = { initialValue: moment(upcomingTask.subTaskModal.EditInfo.completedAt) }
            if (upcomingTask.subTaskModal.EditInfo.completedAt == undefined) {
                completedAt = {}
            }

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
                            <Input type="hidden" />
                        )}
                        {/* </Form.Item> */}

                        <Form.Item label="SubTask">
                            {getFieldDecorator('name', {
                                initialValue: upcomingTask.subTaskModal.EditInfo.name,
                                rules: [{ required: true, message: 'Please input the subtask!' }],
                            })(
                                <AutoComplete
                                    dataSource={upcomingTask.subTaskList}
                                    placeholder="input here"
                                />
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

                        {/* { upcomingTask.subTaskModal.EditInfo.startDate } */}

                        <Row>
                            <Col span={12}>
                                <Form.Item label="Start Date">
                                    {getFieldDecorator('startDate', {
                                        ...startDate
                                        // initialValue: startDate,
                                        // rules: [{ required: true, message: 'Please input the Est. Hour!' }],
                                    })(
                                        <DatePicker format={dateFormat} />
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={12} align="right">
                                <Form.Item label="Due Date" style={{ marginLeft: "54px"}}>
                                    {getFieldDecorator('dueDate', {
                                        ...dueDate
                                        // initialValue: startDate,
                                        // rules: [{ required: true, message: 'Please input the Est. Hour!' }],
                                    })(
                                        <DatePicker format={dateFormat} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Completed At">
                            {getFieldDecorator('completedAt', {
                                ...completedAt
                                // initialValue: startDate,
                                // rules: [{ required: true, message: 'Please input the Est. Hour!' }],
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