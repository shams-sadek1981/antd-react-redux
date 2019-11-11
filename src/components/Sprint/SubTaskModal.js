import React, { Component, Fragment } from 'react'
import moment from 'moment'
import {
    Modal, Form, Input, Select, AutoComplete, DatePicker, Row, Col, Icon, Divider, InputNumber, Button
} from 'antd';


import { toggleSubtaskModalVisible, deleteSubTask } from '../../actions/sprintActions'

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MMM-DD';

export const SubTaskModal = Form.create({ name: 'single_task_modal' })(
    // eslint-disable-next-line
    class extends React.Component {

        render() {
            const {
                visible, onCancel, onCreate, form,
                dispatch, sprint, users
            } = this.props;

            const { getFieldDecorator } = form;


            //-- Set Start Date
            let startDate = { initialValue: moment(sprint.subTaskModal.EditInfo.startDate) }
            if (sprint.subTaskModal.EditInfo.startDate == undefined) {
                startDate = {}
            }

            //-- Set Due Date
            let dueDate = { initialValue: moment(sprint.subTaskModal.EditInfo.dueDate) }
            if (sprint.subTaskModal.EditInfo.dueDate == undefined) {
                dueDate = {}
            }

            //-- Set Completed At
            let completedAt = { initialValue: moment(sprint.subTaskModal.EditInfo.completedAt) }
            if (sprint.subTaskModal.EditInfo.completedAt == undefined) {
                completedAt = {}
            }

            return (
                <Modal
                    visible={sprint.subTaskModal.modalVisible}
                    title={sprint.subTaskModal.modalTitle}
                    onCancel={() => dispatch(toggleSubtaskModalVisible())}
                    
                    footer={[
                        sprint.subTaskModal.okText != "Create" &&
                        <Button type="danger" key="back" onClick={ () => dispatch(deleteSubTask(sprint.subTaskModal.taskId, sprint.subTaskModal.EditInfo._id))}>
                            Delete
                        </Button>,
                        <Button key="submit" type="primary" onClick={ onCreate }>
                            { sprint.subTaskModal.okText }
                        </Button>,
                    ]}
                >
                    <div style={{ paddingBottom: '5px', fontSize: '11pt' }}><Icon type="bulb" theme="twoTone" />{sprint.subTaskModal.EditInfo.taskName}</div>
                    <Form layout="vertical">

                        {/* <Form.Item label="" type="hidden"> */}
                        {getFieldDecorator('_id', {
                            initialValue: sprint.subTaskModal.EditInfo._id,
                            // rules: [{ required: true, message: 'Please input the subtask!' }],
                        })(
                            <Input type="hidden" />
                        )}
                        {/* </Form.Item> */}

                        <Form.Item label="Select User">
                            {getFieldDecorator('assignedUser', {
                                initialValue: sprint.subTaskModal.EditInfo.assignedUser,
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
                                        initialValue: sprint.subTaskModal.EditInfo.name,
                                        rules: [{ required: true, message: 'Please select subtask' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="Select a Subtask"
                                        >
                                            {
                                                sprint.subTaskList.map((item, index) => (
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
                                        initialValue: sprint.subTaskModal.EditInfo.estHour,
                                        rules: [{ required: true, message: 'Please input the Est. Hour!' }],
                                    })(
                                        <InputNumber min={0} max={24} autoComplete="off" />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>



                        {/* { sprint.subTaskModal.EditInfo.startDate } */}

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
                                initialValue: sprint.subTaskModal.EditInfo.refLink,
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