import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button  } from 'antd';

import { searchBySprint, changeSearchField } from '../../../actions/reportsActions';

import { DateRange } from '../DateRange'

const { Option } = Select;

export const SearchByForm = (props) => {

    const { dispatch, reports, projects } = props
    
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
                    <Button type="primary" htmlType="submit" onClick={ () => dispatch(searchBySprint())}>
                        Search
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    )
}