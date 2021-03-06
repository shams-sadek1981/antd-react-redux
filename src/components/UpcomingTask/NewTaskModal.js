import React, { Component, Fragment } from 'react'
import moment from 'moment'
import {
    Button, Modal, Form, Input, Radio, Icon, Select, DatePicker, Switch, Row, Col
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

            const { dispatch, upcomingTask, users, project, taskType, release } = this.props

            // check hasMultiTask
            let editMode = false
            if (upcomingTask.modal.okText == 'Update') {
                editMode = true
            }

            let hasMultiTask = false
            if (upcomingTask.modal.EditInfo.description) {
                const descriptionToTasks = upcomingTask.modal.EditInfo.description.split(/\r\n|\n|\r/);
                if (editMode && descriptionToTasks.length > 1) {
                    hasMultiTask = true
                }
            }

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
                                <Input autoComplete="off" autoFocus />
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


                        {hasMultiTask &&
                            <Form.Item label="Convert Into Multitask from description">
                                {getFieldDecorator('bulkInsert', {
                                    // initialValue: upcomingTask.modal.EditInfo.description,
                                })(
                                    <Switch size="small" />
                                )}
                            </Form.Item>
                        }

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
                                        initialValue: upcomingTask.modal.EditInfo.projectName,
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
                                        initialValue: upcomingTask.modal.EditInfo.assignedBy,
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

                        {editMode &&
                            <Form.Item label="Select Sprint">
                                {getFieldDecorator('sprint', {
                                    initialValue: upcomingTask.modal.EditInfo.sprint,
                                    // rules: [{ required: true, message: 'Please select release' }],
                                })(
                                    <Select
                                        showSearch
                                        // style={{ width: 200 }}
                                        placeholder="Select a Sprint"
                                    >
                                        <Option value={null}>Select Sprint</Option>
                                        {
                                            upcomingTask.sprintList.map((item, index) =>
                                                <Option value={item.name} key={index}>
                                                    <span style={{ color: 'blue' }}>{item.name}</span>
                                                    <span style={{ paddingLeft: '5px' }}>{item.endDate}</span>
                                                </Option>
                                            )
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        }

                        <Row gutter={24}>
                            <Col span={10}>
                                {editMode &&
                                    <Form.Item label="Closing Date">
                                        {getFieldDecorator('completedAt', {
                                            ...completedAt
                                            // initialValue: startDate,
                                        })(
                                            <DatePicker format={dateFormat} />
                                        )}
                                    </Form.Item>
                                }
                            </Col>

                            <Col span={14}>
                                {editMode &&
                                    <Form.Item label="Select Version">
                                        {getFieldDecorator('release', {
                                            initialValue: upcomingTask.modal.EditInfo.release,
                                            // rules: [{ required: true, message: 'Please select release' }],
                                        })(
                                            <Select
                                                showSearch
                                                // style={{ width: 200 }}
                                                placeholder="Select a release"
                                            >
                                                <Option value={null}>Select Version</Option>
                                                {
                                                    upcomingTask.releaseList.map((item, index) =>
                                                        <Option value={item.version} key={index}>
                                                            <span style={{ color: 'blue' }}>{item.version}</span>
                                                            <span style={{ paddingLeft: '5px' }}>{item.releaseDate}</span>
                                                        </Option>
                                                    )
                                                }
                                            </Select>
                                        )}
                                    </Form.Item>
                                }
                            </Col>
                        </Row>

                    </Form>
                </Modal>
            );
        }
    }
);