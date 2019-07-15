import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

import { searchBy } from '../../../actions/reportsActions';

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

    const handleChange = (userName) => {
        dispatch(searchBy('name', userName))
    }

    const startOfMonth = moment().startOf('month')
    const endOfMonth   = moment().endOf('month')

    return (
        <Fragment>
            <Form layout="inline" onSubmit={ e => handleSubmit(e, "1") }>

                <Form.Item label="Select User">
                    {getFieldDecorator('userName', {
                        initialValue: reports.searchBy.name,
                        rules: [{ required: true, message: 'Please select user' }],
                    })(
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            // onChange={handleChange}
                            // onFocus={handleFocus}
                            // onBlur={handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="all" key={-1}>ALL User</Option>
                            {
                                users.allUser.map((item, index) =>
                                    <Option value={item.name} key={index}>{item.name}</Option>
                                )
                            }
                        </Select>
                    )}
                </Form.Item>

                <DateRange {...props}/>

            </Form>
        </Fragment>
    )
}