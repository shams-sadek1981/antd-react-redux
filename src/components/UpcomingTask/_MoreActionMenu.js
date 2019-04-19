import React, { Fragment } from 'react'

import { Table, Divider, Tag, Icon, Checkbox, Switch, Popconfirm, Button, Dropdown, Menu, Col, Row } from 'antd';

import {
    editTask, removeTask, updateTask, updateTaskStatus, changePagination, updateRunningTask, updateTaskRate
} from '../../actions/upcomingTaskActions';

export const _MoreActionMenu = (props) => {

    const { record, dispatch } = props

    const confirm = (id) => {
        dispatch(removeTask(id))
    }

    const onRunningChange = (_id, checked) => {
        console.log(`switch to ${checked}`);
        dispatch(updateRunningTask({
            _id,
            running: checked
        }))
    }

    const menu = (
        <Menu>
            <Menu.Item style={{ width: "130px"}}>
                <Row>
                    <Col span={10}>
                        <Switch
                            size="small"
                            checked={record.running}
                            onChange={(value) => onRunningChange(record._id, value)}
                        />
                    </Col>

                    <Col span={12}>
                        Running
                    </Col>
                </Row>
            </Menu.Item>

            <Menu.Item>
                <Row>
                    <Col span={10}>
                        <Checkbox checked={record.status}
                            onChange={(e) => dispatch(
                                updateTaskStatus({
                                    _id: record._id,
                                    status: !record.status
                                })
                            )}
                        />
                    </Col>
                    <Col span={14}>
                        Complete
                </Col>
                </Row>
            </Menu.Item>

            <Menu.Item>
                <Row>
                    <Col span={10}>
                        <a onClick={() => dispatch(editTask(record._id))} href="javascript:;">
                            <Icon type="edit" theme="twoTone" />
                        </a>
                    </Col>

                    <Col span={12}>
                        Edit
                </Col>
                </Row>
            </Menu.Item>

            <Menu.Item>
                <Row>
                    <Col span={10}>
                        <Popconfirm title="Are you sure to delete this task?"
                            onConfirm={(e) => confirm(record._id)}
                            okText="Yes" cancelText="No">

                            <a href="javascript:;">
                                <Icon type="delete" theme="twoTone" />
                            </a>
                        </Popconfirm>
                    </Col>

                    <Col span={14}>
                        Delete
                </Col>
                </Row>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" href="#">
                <Icon type="more" />
            </a>
        </Dropdown>
    )

}