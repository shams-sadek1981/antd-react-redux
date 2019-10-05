import React, { Fragment } from 'react'
import moment from 'moment'
import { Table, Divider, Tag, Icon, Checkbox, Spin, Popconfirm, Button } from 'antd';

import {
    updateTask, changePagination, loadTaskByRelease
} from '../../actions/releaseActions';

import {
    editItem, removeItem, updateStatus, loadTaskBySprint
} from '../../actions/sprintActions';


import { _ChangeLog } from './_ChangeLog'
import { TaskList } from './TaskList'

import { handlePermission } from '../../functions'

export const List = (props) => {

    const { dispatch, release, sprint } = props

    const handleTableChange = (pagination, filters, sorter) => {
        dispatch(changePagination(pagination))
    }

    const confirm = (id) => {
        dispatch(removeItem(id))
    }

    const columns = [
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 150,
            render: (text, record) =>
                <div>
                    {moment(record.startDate).format("ddd, DD-MMM-YYYY")}
                </div>
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'endDate',
            width: 150,
            render: (text, record) =>
                <div>
                    {moment(record.endDate).format("ddd, DD-MMM-YYYY")}
                </div>
        },
        {
            title: 'Project Name',
            dataIndex: 'projects',
            key: 'projects',
            width: 150,
            render: (text, record) =>
                <div>
                    { record.projects.map( item => (
                        item + ', '
                    ))}
                </div>
        },
        {
            title: 'Sprint',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            render: (text, record) => {

                const weekDays = [
                    {
                        name: 'Mon',
                        color: 'green'
                    },
                    {
                        name: 'Tue',
                        color: 'magenta'
                    },
                    {
                        name: 'Wed',
                        color: 'orange'
                    },
                    {
                        name: 'Thu',
                        color: 'blue'
                    },
                    {
                        name: 'Fri',
                        color: 'purple'
                    },
                    {
                        name: 'Sat',
                        color: 'red'
                    },
                    {
                        name: 'Sun',
                        color: 'red'
                    },
                ]

                const findItem = weekDays.find(item => item.name == moment(record.endDate).format('ddd'))
                const color = findItem.color
                return <Tag color={color}>{record.name}</Tag>
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <span>
                    {
                        (handlePermission(props, 'sprint_complete')) &&
                        <Popconfirm title="Are you sure to change the status?"
                            onConfirm={(e) => dispatch(
                                updateStatus({
                                    _id: record._id,
                                    status: !record.status
                                })
                            )}
                            okText="Yes" cancelText="No">

                            <Checkbox checked={record.status}
                            
                            />
                        </Popconfirm>
                    }


                    {
                        (handlePermission(props, 'sprint_edit')) &&
                        <span>
                            <Divider type="vertical" />
                            <a onClick={() => dispatch(editItem(record._id))} href="javascript:;">
                                <Icon type="edit" theme="twoTone" />
                            </a>
                        </span>
                    }

                    {
                        (handlePermission(props, 'sprint_delete')) &&
                        <span>
                            <Divider type="vertical" />
                            <Popconfirm title="Are you sure to delete this Sprint?"
                                onConfirm={(e) => confirm(record._id)}
                                okText="Yes" cancelText="No">

                                <a href="javascript:;">
                                    <Icon type="delete" theme="twoTone" />
                                </a>
                            </Popconfirm>
                        </span>
                    }
                </span>
            ),
        }
    ];


    //-- Set Data for Table Data
    const data = sprint.list.map((item, index) => {

        return {
            _id: item._id,
            status: item.status,
            key: index,
            name: item.name,
            description: item.description,
            startDate: item.startDate,
            endDate: item.endDate,
            projects: item.projects,
        }
    })

    return (
        <Fragment>
            <Table
                loading={release.spinning}
                pagination={release.pagination}
                onChange={handleTableChange}
                columns={columns}
                dataSource={data} size="small"
                onExpand={(expended, record) => dispatch(loadTaskBySprint(record.name))}
                expandedRowRender={record =>
                    <div style={{ margin: 0 }}>
                        <_ChangeLog {...props} description={record.description} />

                        <TaskList {...props} name={record.name} />
                    </div>
                }
            />
        </Fragment>
    )
}