import React, { Component, Fragment } from 'react'
import moment from 'moment'

import {
    Button, Modal, Form, Input, Radio, Icon, Select, DatePicker
} from 'antd';


import { toggleModalVisible } from '../../actions/releaseActions'

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

            const { dispatch, release, users, project } = this.props
            return (
                <Modal
                    visible={release.modal.modalVisible}
                    title={release.modal.modalTitle}
                    okText={release.modal.okText}
                    onCancel={() => dispatch(toggleModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item label="Release Date">
                            {getFieldDecorator('releaseDate', {
                                initialValue: release.modal.EditInfo.releaseDate,
                                rules: [{ required: true, message: 'Please select release date' }],
                            })(
                                <DatePicker format={dateFormat} />
                            )}
                        </Form.Item>
                        
                        <Form.Item label="Select Project">
                            {getFieldDecorator('projectName', {
                                initialValue: release.modal.EditInfo.projectName,
                                rules: [{ required: true, message: 'Please select project' }],
                            })(
                                <Select
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

                        <Form.Item label="Version">
                            {getFieldDecorator('version', {
                                initialValue: release.modal.EditInfo.version,
                                rules: [{ required: true, message: 'Please input the version!' }],
                            })(
                                <Input autoComplete="off" />
                            )}
                        </Form.Item>

                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                initialValue: release.modal.EditInfo.description,
                                // rules: [{ required: true, message: 'Please input the description!' }],
                            })(
                                <TextArea rows={4} />
                            )}
                        </Form.Item>

                    </Form>
                </Modal>
            );
        }
    }
);