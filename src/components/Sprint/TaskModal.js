import React, { Component, Fragment } from 'react'
import moment from 'moment'
import {
    Button, Modal, Form, Input, Radio, Icon, Select, DatePicker, Switch, Row, Col
} from 'antd';


import { toggleTaskModalVisible } from '../../actions/sprintActions'

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'YYYY-MMM-DD';

export const TaskModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, upcomingTask, users, project, taskType, sprint } = this.props


            //-- Set Completed At
            let completedAt = { initialValue: moment(sprint.upcomingTaskModal.EditInfo.completedAt) }
            if (sprint.upcomingTaskModal.EditInfo.completedAt == undefined) {
                completedAt = {}
            }

            return (
                <Modal
                    visible={sprint.upcomingTaskModal.modalVisible}
                    title={sprint.upcomingTaskModal.modalTitle}
                    okText={sprint.upcomingTaskModal.okText}
                    onCancel={() => dispatch(toggleTaskModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item label="Task Name">
                            {getFieldDecorator('taskName', {
                                initialValue: sprint.upcomingTaskModal.EditInfo.taskName,
                                rules: [{ required: true, message: 'Please input the task name!' }],
                            })(
                                <Input autoComplete="off" autoFocus />
                            )}
                        </Form.Item>

                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                initialValue: sprint.upcomingTaskModal.EditInfo.description,
                                // rules: [{ required: true, message: 'Please input the description!' }],
                            })(
                                <TextArea rows={4} />
                            )}
                        </Form.Item>


                        <Form.Item label="Select Task Type">
                            {getFieldDecorator('taskType', {
                                initialValue: sprint.upcomingTaskModal.EditInfo.taskType,
                                rules: [{ required: true, message: 'Please select task type' }],
                            })(
                                <Select
                                    showSearch
                                    // style={{ width: 200 }}
                                    placeholder="Select a task type"
                                >
                                    {
                                        taskType.taskTypeList.map((item, index) =>
                                            <Option value={item.name} key={index}>{item.name}</Option>
                                        )
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Select Project">
                                    {getFieldDecorator('projectName', {
                                        initialValue: sprint.upcomingTaskModal.EditInfo.projectName,
                                        rules: [{ required: true, message: 'Please select project' }],
                                    })(
                                        <Select
                                            showSearch
                                            // style={{ width: 200 }}
                                            placeholder="Select a project"
                                        >
                                            {
                                                project.list.map((item, index) =>
                                                    <Option value={item.name} key={index}>{item.name}</Option>
                                                )
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item label="Assigned By">
                                    {getFieldDecorator('assignedBy', {
                                        initialValue: sprint.upcomingTaskModal.EditInfo.assignedBy,
                                        // rules: [{ required: true, message: 'Please select user' }],
                                    })(
                                        <Select
                                            showSearch
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
                            </Col>
                        </Row>


                        <Form.Item label="Select Sprint">
                            {getFieldDecorator('sprint', {
                                initialValue: sprint.upcomingTaskModal.EditInfo.sprint,
                                // rules: [{ required: true, message: 'Please select release' }],
                            })(
                                <Select
                                    showSearch
                                    // style={{ width: 200 }}
                                    placeholder="Select a Sprint"
                                >
                                    <Option value={null}>Select Sprint</Option>
                                    {
                                        sprint.sprintList.map((item, index) =>
                                            <Option value={item.name} key={index}>
                                                <span style={{ color: 'blue' }}>{item.name}</span>
                                                <span style={{ paddingLeft: '5px' }}>{item.endDate}</span>
                                            </Option>
                                        )
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={10}>
                                <Form.Item label="Closing Date">
                                    {getFieldDecorator('completedAt', {
                                        ...completedAt
                                        // initialValue: startDate,
                                    })(
                                        <DatePicker format={dateFormat} />
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={14}>
                                <Form.Item label="Select Version">
                                    {getFieldDecorator('release', {
                                        initialValue: sprint.upcomingTaskModal.EditInfo.release,
                                        // rules: [{ required: true, message: 'Please select release' }],
                                    })(
                                        <Select
                                            showSearch
                                            // style={{ width: 200 }}
                                            placeholder="Select a release"
                                        >
                                            <Option value={null}>Select Version</Option>
                                            {
                                                sprint.releaseList.map((item, index) =>
                                                    <Option value={item.version} key={index}>
                                                        <span style={{ color: 'blue' }}>{item.version}</span>
                                                        <span style={{ paddingLeft: '5px' }}>{item.releaseDate}</span>
                                                    </Option>
                                                )
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Modal>
            );
        }
    }
);