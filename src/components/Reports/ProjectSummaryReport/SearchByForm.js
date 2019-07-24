import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

import { searchByProjectSummary } from '../../../actions/reportsActions';
import { DateRange } from '../DateRange'

export const SearchByForm = (props) => {

    const { handleSubmit, dispatch } = props

    return (
        <Fragment>
            <Form layout="inline">
                <DateRange {...props}/>

                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={ () => dispatch(searchByProjectSummary())}>
                        Search
                    </Button>
                </Form.Item>
            </Form>
            
        </Fragment>
    )
}