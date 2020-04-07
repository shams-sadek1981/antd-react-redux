import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

import { searchByTaskTypeSummary, changeSearchField } from '../../../actions/reportsActions';
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

    const { dispatch, users, reports, form, handleSubmit, projects } = props
    const { getFieldDecorator } = form;

    // const startOfMonth = moment().startOf('month')
    // const endOfMonth   = moment().endOf('month')

    return (
        <Fragment>
            <Form layout="inline">
                <Form.Item label="Select Project">
                    <Select
                        mode="multiple"
                        defaultValue={ reports.searchBy.project }
                        style={{ width: 250 }}
                        showSearch
                        onChange={val => dispatch(changeSearchField(val, 'project'))}
                    >
                        {
                            projects.list.map((item, index) =>
                                <Option value={item.name} key={index}>{item.name}</Option>
                            )
                        }
                    </Select>
                </Form.Item>

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