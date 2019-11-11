import React, { Component, Fragment } from 'react'
import moment from 'moment'
import {
    Modal, Form, Input, Select, AutoComplete, DatePicker, Row, Col, Icon, Divider, InputNumber
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
                    title={ upcomingTask.subTaskModal.modalTitle }
                    okText={upcomingTask.subTaskModal.okText}
                    onCancel={() => dispatch(toggleSubtaskModalVisible())}
                    onOk={onCreate}
                >
                    <div style={{ paddingBottom: '5px', fontSize: '11pt' }}>
                        <Icon type="bulb" theme="twoTone" style={{ paddingRight: '5px'}}/>
                        {upcomingTask.subTaskModal.EditInfo.taskName}
                    </div>

                    <Form layout="vertical">

                        {/* <Form.Item label="" type="hidden"> */}
                        {getFieldDecorator('_id', {
                            initialValue: upcomingTask.subTaskModal.EditInfo._id,
                            // rules: [{ required: true, message: 'Please input the subtask!' }],
                        })(
                            <Input type="hidden" />
                        )}
                        {/* </Form.Item> */}

                        <Form.Item label="Select User">
                            {getFieldDecorator('assignedUser', {
                                initialValue: upcomingTask.subTaskModal.EditInfo.assignedUser,
                                rules: [{ required: true, message: 'Please select user' }],
                            })(
                                <Select
                                    showSearch
                                    autoFocus
                                    // style={{ width: 200 }}
                                    placeholder="Select a user"
                                >
                                    {
                                        users.allUser.map((item, index) => (
                                            <Option value={item.name} key={index}>{item.name}</Option>
                                        ))
                                    }

                                </Select>
                            )}
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={18}>
                                <Form.Item label="Select Subtask">
                                    {getFieldDecorator('name', {
                                        initialValue: upcomingTask.subTaskModal.EditInfo.name,
                                        rules: [{ required: true, message: 'Please select subtask' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="Select a Subtask"
                                        >
                                            {
                                                upcomingTask.subTaskList.map((item, index) => (
                                                    <Option value={item} key={index}>{item}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={6} align="right">
                                <Form.Item label="Est Hour">
                                    {getFieldDecorator('estHour', {
                                        initialValue: upcomingTask.subTaskModal.EditInfo.estHour,
                                        rules: [{ required: true, message: 'Please input the Est. Hour!' }],
                                    })(
                                        <InputNumber min={0} max={24} autoComplete="off" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item label="Description">
                                    {getFieldDecorator('description', {
                                        initialValue: upcomingTask.subTaskModal.EditInfo.description
                                    })(
                                        <Input autoComplete="off" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* { upcomingTask.subTaskModal.EditInfo.startDate } */}

                        <Row gutter={24}>
                            <Col span={8}>
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

                            <Col span={8}>
                                <Form.Item label="Due Date">
                                    {getFieldDecorator('dueDate', {
                                        ...dueDate
                                        // initialValue: startDate,
                                        // rules: [{ required: true, message: 'Please input the Est. Hour!' }],
                                    })(
                                        <DatePicker format={dateFormat} />
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={8} align="right">
                                <Form.Item label="Completed At">
                                    {getFieldDecorator('completedAt', {
                                        ...completedAt
                                        // initialValue: startDate,
                                        // rules: [{ required: true, message: 'Please input the Est. Hour!' }],
                                    })(
                                        <DatePicker format={dateFormat} />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>



                        <Form.Item label="Ref. Link">
                            {getFieldDecorator('refLink', {
                                initialValue: upcomingTask.subTaskModal.EditInfo.refLink,
                                // rules: [{ required: true, message: 'Please input the Ref. Link' }],
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