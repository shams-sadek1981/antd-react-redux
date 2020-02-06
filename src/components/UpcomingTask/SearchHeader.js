import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import { Select, Button, Icon, Row, Col, Input, Switch } from 'antd';

import {
    addNewTask,
    searchBy,
    toggleNewlyAdded
} from '../../actions/upcomingTaskActions'

import { _SearchByUser } from './_SearchByUser'
import { _SearchByProject } from './_SearchByProject'

import { handlePermission } from '../../functions'

const { Option } = Select;
const Search = Input.Search;


export const SearchHeader = (props) => {

    const { dispatch, upcomingTask, searchInput, match } = props

    // function onChange(checked) {
    //     console.log(`switch to ${checked}`);
    // }

    let timer
    const searchByTextChange = e => {

        window.clearTimeout(timer);

        timer = window.setTimeout((value) => {
            dispatch(searchBy('text', value))
        }, 700, e.target.value);
    }

    return (
        <Fragment>
            <Row>
                <Col span={2}>
                    {
                        (handlePermission(props, 'upcoming_task_create')) &&
                        <Button
                            type="primary"
                            onClick={() => dispatch(addNewTask())}
                        >
                            <Icon type="plus-circle" />New
                        </Button>
                    }
                </Col>

                <Col span={2}>
                    <div>
                        <Switch
                            checkedChildren="Latest"
                            unCheckedChildren="Default"
                            checked={upcomingTask.searchBy.newlyAdded}
                            onChange={(checked) => dispatch(toggleNewlyAdded())} />
                    </div>
                </Col>

                <Col span={3}>
                    <div> <i>Total Est. <b>{upcomingTask.totalEstHour} </b></i></div>
                    <div> <i>Total Task: <b>{upcomingTask.pagination.total} </b></i></div>
                </Col>

                <Col span={3}>
                    <div> <i>User: <b>{upcomingTask.userName} </b></i></div>
                    <div> <i>Total Subtask: <b>{upcomingTask.totalSubTask} </b></i></div>
                </Col>

                <Col span={4}>
                    <_SearchByUser {...props} />
                </Col>

                <Col span={4}>
                    <_SearchByProject {...props} />
                </Col>

                <Col span={4}>
                    <Search
                        placeholder="input search text"
                        defaultValue={upcomingTask.searchBy.text}
                        onSearch={value => dispatch(searchBy('text', value))}
                        onChange={searchByTextChange}
                        style={{ width: 200 }}
                        autoFocus
                    />
                </Col>
                <Col span={2}>
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        value={upcomingTask.searchBy.releaseStatus}
                        placeholder="Select a release option"
                        optionFilterProp="children"
                        onChange={ value => dispatch(searchBy("releaseStatus", value))}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="all" key={-1}>ALL</Option>
                        <Option value="release" key={1}>Release</Option>
                        <Option value="not_release" key={2}>Not Release</Option>
                        
                    </Select>
                </Col>
            </Row>
        </Fragment>
    )
}