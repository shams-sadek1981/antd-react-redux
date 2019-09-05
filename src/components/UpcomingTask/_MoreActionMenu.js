import React, { Fragment } from 'react'

import { Table, Divider, Tag, Icon, Checkbox, Switch, Popconfirm, Button, Dropdown, Menu, Col, Row } from 'antd';

import {
    editTask, removeTask, updateTask, changePagination, updateRunningTask, updateTaskRate
} from '../../actions/upcomingTaskActions';

import { handlePermission } from '../../functions'

export const _MoreActionMenu = (props) => {

    const { record, dispatch, users } = props

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
            <Menu.Item style={{ width: "130px" }}>
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


            {
                ( handlePermission(props, 'update_upcoming_task') ) &&
            <Menu.Item>
                <a onClick={() => dispatch(editTask(record._id))} href="javascript:;">
                    <Row>
                        <Col span={10}>
                            <Icon type="edit" theme="twoTone" />
                        </Col>
                        <Col span={12}>
                            Edit
                        </Col>
                    </Row>
                </a>
            </Menu.Item>
            }


            {
                ( handlePermission(props, 'delete_upcoming_task') ) &&
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
            }

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