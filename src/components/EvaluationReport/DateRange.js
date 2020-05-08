import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Input } from 'antd';
import { start } from 'pretty-error';

import { changeSearchField, searchResult, downloadPdfFile, downloadZipFile } from '../../actions/evaluationActions';

const { Option } = Select;
const dateFormat = 'YYYY-MMM-DD';


export const DateRange = (props) => {

    const { dispatch, reportPersonal, form } = props
    const { getFieldDecorator } = form;

    // const { startDate, endDate } = reportPersonal.searchBy

    const startDate = moment().startOf('month')
    const endDate = moment().endOf('month')


    return (
        <Fragment>
            <Form layout="inline">
                {/* <Form.Item label="Start Date">
                    {getFieldDecorator('startDate', {
                        initialValue: moment(startDate, dateFormat),
                        // rules: [{ required: true, message: 'Please select start date' }],
                    })(
                        <DatePicker format={dateFormat} onChange={val => dispatch(changeSearchField(val, 'startDate'))} />
                    )}
                </Form.Item>

                <Form.Item label="End Date">
                    {getFieldDecorator('endDate', {
                        initialValue: moment(endDate, dateFormat),
                        // rules: [{ required: true, message: 'Please select start date' }],
                    })(
                        <DatePicker format={dateFormat} onChange={val => dispatch(changeSearchField(val, 'endDate'))} />
                    )}
                </Form.Item> */}

                <Form.Item label="Evaluation Name">
                    {getFieldDecorator('evaluationName', {
                        initialValue: '2020-Q1',
                        // rules: [{ required: true, message: 'Please select start date' }],
                    })(
                        <Input onChange={e => dispatch(changeSearchField(e.target.value, 'evaluationName'))} autoComplete="off" />
                    )}
                </Form.Item>


                <Button onClick={() => dispatch(searchResult())}>Submit</Button>

                <Button onClick={() => dispatch(downloadPdfFile())}>Download .pdf</Button>
                
                <Button onClick={() => dispatch(downloadZipFile())}>Download .zip</Button>


            </Form>

        </Fragment>
    )
}