import React, { Component, Fragment } from 'react'
import moment from 'moment'

import {
    Col, Modal, Form, Input, Row, Icon, Select, DatePicker
} from 'antd';


// import { toggleModalVisible } from '../../actions/releaseActions'
import { toggleModalVisible } from '../../actions/sprintActions'

const { Option } = Select;
const { TextArea } = Input;

const dateFormat = 'YYYY-MMM-DD';

export const NewModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, release, sprint, users, project } = this.props
            
            return (
                <Modal
                    visible={sprint.modal.modalVisible}
                    title={sprint.modal.modalTitle}
                    okText={sprint.modal.okText}
                    onCancel={() => dispatch(toggleModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item label="Select Project">
                            {getFieldDecorator('projects', {
                                initialValue: sprint.modal.EditInfo.projects,
                                rules: [{ required: true, message: 'Please select project' }],
                            })(
                                <Select
                                    mode="multiple"
                                    showSearch
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

                        <Form.Item label="Sprint Name">
                            {getFieldDecorator('name', {
                                initialValue: sprint.modal.EditInfo.name,
                                rules: [{ required: true, message: 'Please type Sprint name' }],
                            })(
                                <Input autoComplete="off" />
                            )}
                        </Form.Item>

                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                initialValue: sprint.modal.EditInfo.description,
                                // rules: [{ required: true, message: 'Please input the description!' }],
                            })(
                                <TextArea rows={4} />
                            )}
                        </Form.Item>

                        <Row gutter={24}>
                            <Col span={12}>
                                <Form.Item label="Start Date">
                                    {getFieldDecorator('startDate', {
                                        initialValue: sprint.modal.EditInfo.startDate,
                                        rules: [{ required: true, message: 'Please select start date' }],
                                    })(
                                        <DatePicker format={dateFormat} />
                                    )}
                                </Form.Item>
                            </Col>

                            <Col span={12} align="right">
                                <Form.Item label="End Date">
                                    {getFieldDecorator('endDate', {
                                        initialValue: sprint.modal.EditInfo.endDate,
                                        rules: [{ required: true, message: 'Please select end date' }],
                                    })(
                                        <DatePicker format={dateFormat} />
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