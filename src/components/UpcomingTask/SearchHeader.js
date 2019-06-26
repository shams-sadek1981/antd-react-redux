import React, { Fragment } from 'react'

import { Select, Button, Icon, Row, Col, Input } from 'antd';

import {
    addNewTask,
    searchBy,
} from '../../actions/upcomingTaskActions'

import { _SearchByUser } from './_SearchByUser'
import { _SearchByProject } from './_SearchByProject'

const { Option } = Select;
const Search = Input.Search;

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export const SearchHeader = (props) => {

    const { dispatch, upcomingTask, searchInput } = props

    return (
        <Fragment>
            <Row>
                <Col span={3}>
                    <Button
                        type="primary"
                        onClick={() => dispatch(addNewTask())}
                    >
                        <Icon type="plus-circle" />New Task
                    </Button>
                </Col>

                <Col span={3}>
                    <div> <i>Total Est. <b>{upcomingTask.totalEstHour} </b></i></div>
                    <div> <i>Total Task: <b>{upcomingTask.pagination.total} </b></i></div>
                </Col>

                <Col span={3}>
                    <div> <i>User: <b>{upcomingTask.userName} </b></i></div>
                    <div> <i>Total Subtask: <b>{upcomingTask.totalSubTask} </b></i></div>
                </Col>

                <Col span={5}>
                    <_SearchByUser {...props} />
                </Col>

                <Col span={5}>
                    <_SearchByProject {...props} />
                </Col>

                <Col span={5}>
                    <Search
                        placeholder="input search text"
                        defaultValue={ upcomingTask.searchBy.text }
                        onSearch={value => dispatch(searchBy('text', value))}
                        style={{ width: 200 }}
                        autoFocus
                    />
                </Col>
            </Row>
        </Fragment>
    )
}