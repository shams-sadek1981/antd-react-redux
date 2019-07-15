import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

import { searchBy } from '../../../actions/reportsActions';
import { DateRange } from '../DateRange'

export const SearchByForm = (props) => {

    const { handleSubmit } = props

    return (
        <Fragment>
            <Form layout="inline" onSubmit={ e => handleSubmit(e, "3") }>
                <DateRange {...props}/>
            </Form>
        </Fragment>
    )
}