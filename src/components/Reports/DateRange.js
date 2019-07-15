import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

// import { searchBy } from '../../../actions/reportsActions';

const { Option } = Select;
const dateFormat = 'YYYY-MMM-DD';


export const DateRange = (props) => {

    const { dispatch, users, reports, form } = props
    const { getFieldDecorator } = form;

    const { startDate, endDate } = reports.searchBy

    // const startOfMonth = moment(startDate).startOf('month')
    // const endOfMonth   = moment(endDate).endOf('month')

    return (
        <Fragment>
            <Form.Item label="Start Date">
                {getFieldDecorator('startDate', {
                    initialValue: moment(startDate),
                    rules: [{ required: true, message: 'Please select start date' }],
                })(
                    <DatePicker format={dateFormat} />
                )}
            </Form.Item>

            <Form.Item label="End Date">
                {getFieldDecorator('endDate', {
                    initialValue: moment(endDate),
                    rules: [{ required: true, message: 'Please select start date' }],
                })(
                    <DatePicker format={dateFormat} />
                )}
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Search
                        </Button>
            </Form.Item>

        </Fragment>
    )
}