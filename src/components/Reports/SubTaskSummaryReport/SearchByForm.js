import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

import { searchBySubTaskSummary } from '../../../actions/reportsActions';
import { DateRange } from '../DateRange'

export const SearchByForm = (props) => {

    const { dispatch } = props
    
    return (
        <Fragment>
            <Form layout="inline">
                <DateRange {...props}/>

                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={ () => dispatch(searchBySubTaskSummary())}>
                        Search
                    </Button>
                </Form.Item>
            </Form>
        </Fragment>
    )
}