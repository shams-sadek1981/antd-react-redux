import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';
import { start } from 'pretty-error';

import { changeSearchField } from '../../actions/reportsActions';

const { Option } = Select;
const dateFormat = 'YYYY-MMM-DD';


export const DateRange = (props) => {

    const { dispatch, reports, form } = props
    const { getFieldDecorator } = form;

    const { startDate, endDate } = reports.searchBy

    // const startOfMonth = moment(startDate).startOf('month')
    // const endOfMonth   = moment(endDate).endOf('month')


    return (
        <Fragment>
            <Form.Item label="Start Date">
                {getFieldDecorator('startDate', {
                    initialValue: moment(startDate, dateFormat),
                    rules: [{ required: true, message: 'Please select start date' }],
                })(
                    <DatePicker format={dateFormat} onChange={ val => dispatch(changeSearchField(val, 'startDate'))}/>
                )}
            </Form.Item>

            <Form.Item label="End Date">
                {getFieldDecorator('endDate', {
                    initialValue: moment(endDate, dateFormat),
                    rules: [{ required: true, message: 'Please select start date' }],
                })(
                    <DatePicker format={dateFormat} onChange={ val => dispatch(changeSearchField(val, 'endDate'))}/>
                )}
            </Form.Item>

        </Fragment>
    )
}