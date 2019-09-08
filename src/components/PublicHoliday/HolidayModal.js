import React, { Component, Fragment } from 'react'

import {
    Button, Modal, Form, Input, Radio, Icon, Select, DatePicker
} from 'antd';

import moment from 'moment'

import { toggleModalVisible } from '../../actions/publicHolidayActions'

const { Option } = Select;
const dateFormat = 'YYYY-MMM-DD';

export const HolidayModal = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const {
                visible, onCancel, onCreate, form,
            } = this.props;

            const { getFieldDecorator } = form;

            const { dispatch, publicHoliday } = this.props


            function handleChange(value) {
                console.log(`selected ${value}`);
            }


            return (
                <Modal
                    visible={publicHoliday.modal.modalVisible}
                    title={publicHoliday.modal.modalTitle}
                    okText={publicHoliday.modal.okText}
                    onCancel={() => dispatch(toggleModalVisible())}
                    onOk={onCreate}
                >
                    <Form layout="vertical">

                        <Form.Item label="Select Date">
                            {getFieldDecorator('holiday', {
                                initialValue: moment(),
                                rules: [{ required: true, message: 'Please input the Holiday!' }],
                            })(
                                <DatePicker format={dateFormat} />
                            )}
                        </Form.Item>

                        <Form.Item label="Description">
                            {getFieldDecorator('description', {
                                initialValue: publicHoliday.modal.editInfo.name,
                                rules: [{ required: true, message: 'Please input the holiday name!' }],
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