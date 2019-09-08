import React, { Component, Fragment } from 'react'

import {
    Button, Modal, Form, Input, Radio, Icon, Select
} from 'antd';


import { toggleModalVisible } from '../../actions/projectActions'

const { Option } = Select;

export const ProjectModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, project } = this.props


            function handleChange(value) {
                console.log(`selected ${value}`);
            }


            return (
                <Modal
                    visible={project.modal.modalVisible}
                    title={project.modal.modalTitle}
                    okText={project.modal.okText}
                    onCancel={() => dispatch(toggleModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item label="Project Name">
                            {getFieldDecorator('name', {
                                initialValue: project.modal.editInfo.name,
                                rules: [{ required: true, message: 'Please input the project name!' }],
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