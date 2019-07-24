import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

import { searchByTaskTypeSummary } from '../../../actions/reportsActions';
import { DateRange } from '../DateRange'

const { Option } = Select;
const dateFormat = 'YYYY-MMM-DD';

function handleBlur() {
    // console.log('blur');
}

function handleFocus() {
    // console.log('focus');
}

export const SearchByForm = (props) => {

    const { dispatch, users, reports, form, handleSubmit } = props
    const { getFieldDecorator } = form;

    // const startOfMonth = moment().startOf('month')
    // const endOfMonth   = moment().endOf('month')

    return (
        <Fragment>
            <Form layout="inline">
                <DateRange {...props}/>

                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={ () => dispatch(searchByTaskTypeSummary())}>
                        Search
                    </Button>
                </Form.Item>

            </Form>
        </Fragment>
    )
}