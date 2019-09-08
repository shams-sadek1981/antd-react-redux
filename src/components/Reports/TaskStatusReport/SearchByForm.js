import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

import { changeSearchField, reportTaskStatusByDate } from '../../../actions/reportsActions';

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

    const { dispatch, reports, form, handleSubmit, projects } = props
    const { getFieldDecorator } = form;

    // const handleChange = (userName) => {
    //     dispatch(searchBy('name', userName))
    // }

    // const startOfMonth = moment().startOf('month')
    // const endOfMonth   = moment().endOf('month')

    return (
        <Fragment>
            <Form layout="inline">
                <Form.Item label="Select Project">
                    <Select
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

                <DateRange {...props} />

                <Form.Item>
                    <Button type="primary" onClick={() => dispatch(reportTaskStatusByDate())}>
                        Search
                    </Button>
                </Form.Item>

            </Form>
        </Fragment>
    )
}

{/* <Select
                        showSearch
                        style={{ width: 250 }}
                        placeholder="Select a project"
                        optionFilterProp="children"
                        defaultValue={{ key: 'all' }}
                        onChange={val => dispatch(changeSearchField(val, 'project'))}
                        // onFocus={handleFocus}
                        // onBlur={handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="all" key={-1}>All Project</Option>
                        {
                            projects.projectList.map((item, index) =>
                                <Option value={item.name} key={index}>{item.name}</Option>
                            )
                        }
                    </Select> */}