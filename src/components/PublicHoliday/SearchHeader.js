import React, { Fragment } from 'react'

import { Select, Button, Icon, Row, Col, Input, DatePicker } from 'antd';

import { addNewHoliday, searchBy } from '../../actions/publicHolidayActions'
import moment from 'moment'

const { Option } = Select;
const Search = Input.Search;
const dateFormat = 'YYYY-MMM-DD';

export const SearchHeader = (props) => {

    const { dispatch, upcomingTask, searchInput, publicHoliday } = props

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    return (
        <Fragment>
            <Row>

                <Col span={8}>
                    <Button
                        type="primary"
                        onClick={() => dispatch(addNewHoliday())}
                    >
                        <Icon type="plus-circle" />Add New Holiday
                    </Button>
                </Col>

                <Col span={4} align="left">
                    Start Date <br/>
                    <DatePicker
                        format={dateFormat}
                        defaultValue={ moment().startOf('year') }
                        onChange={ (value) => dispatch(searchBy(value))}
                    />
                </Col>

                <Col span={4} align="left">
                    End Date <br/>
                    <DatePicker
                        format={dateFormat}
                        defaultValue={ moment().endOf('year') }
                        onChange={ (value) => dispatch(searchBy(null,value))}
                    />
                </Col>
            </Row>
        </Fragment>
    )
}