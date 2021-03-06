import React, { Fragment } from 'react'
import moment from 'moment'
import { Table, Divider, Tag, Icon, Checkbox, Spin, Popconfirm, Progress } from 'antd';

// import {
//     updateTask, changePagination, loadTaskByRelease
// } from '../../actions/releaseActions';

import {
    editItem, removeItem, updateStatus, loadTaskBySprint, changePagination, sprintStatusUpdate
} from '../../actions/sprintActions';


import { _ChangeLog } from './_ChangeLog'
import { TaskList } from './TaskList'

import { handlePermission } from '../../functions'

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

export const List = (props) => {

    const { dispatch, release, sprint } = props

    const handleTableChange = (pagination, filters, sorter) => {
        dispatch(changePagination(pagination))
    }

    const confirm = (id) => {
        dispatch(removeItem(id))
    }

    // Set Action Column on sprint item list
    const actionColumn = {
        title: 'Action',
        key: 'action',
        width: 150,
        render: (text, record) => (
            <div className="sprint-action">
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

                {
                    (handlePermission(props, 'sprint_delete')) &&
                    <span>
                        <Divider type="vertical" />
                        <Popconfirm title="Are you sure to update status in this Sprint?"
                            onConfirm={(e) => dispatch(sprintStatusUpdate(record.name))}
                            okText="Yes" cancelText="No">

                            <a href="javascript:;">
                                <Icon type="thunderbolt" theme="twoTone" />
                            </a>
                        </Popconfirm>
                    </span>
                }
            </div>
        ),
    }

    let columns = [
        {
            title: 'Sprint',
            dataIndex: 'name',
            key: 'name',
            width: 250,
            render: (text, record) => {
                const findItem = weekDays.find(item => item.name == moment(record.endDate).format('ddd'))
                const color = findItem.color
                return <div style={{ cursor: 'pointer' }}>
                    <Tag
                        color={color}
                        onClick={() => dispatch(loadTaskBySprint(record.name))}
                        style={{ cursor: 'pointer' }}
                    >
                        {record.name}
                    </Tag>
                    <span style={{ fontStyle: 'italic', color: '#0000ff9e' }}>
                        {record.restOfDays > 1 && record.restOfDays + ' Days'}
                        {record.restOfDays == 1 && ' Last Day'}
                    </span>

                    <div style={{ fontStyle: 'italic', paddingTop: '5px' }}>
                        Est:<span style={{ color: 'blue', paddingRight: '5px' }}>{record.est}</span>
                        Due:<span style={{ color: 'red', paddingRight: '5px' }}>{record.due}</span>
                        Complete:<span style={{ color: 'green', paddingLeft: '5px' }}>{record.complete}</span>
                    </div>
                </div>
            }
        },
        {
            title: 'Progress',
            dataIndex: 'percent',
            key: 'percent',
            width: 150,
            render: (text, record) => <Progress type="circle" percent={record.percent} width={50} />
        },
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
                    {
                        record.projects.map((item, index) => {

                            // Remove last comma
                            if ( record.projects.length > ++index) return item + ', '
                            
                            return item
                        })
                    }
                </div>
        }
    ];

    // Add action column by permission
    if (handlePermission(props, 'sprint_delete') || handlePermission(props, 'sprint_edit') || handlePermission(props, 'sprint_complete')) {
        columns.push(actionColumn)
    }

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
            percent: item.percent,
            est: item.est,
            complete: item.complete,
            due: item.due,
            userDetails: item.userDetails,
            restOfDays: item.restOfDays,
        }
    })

    return (
        <Table
            loading={sprint.spinning}
            onChange={handleTableChange}
            columns={columns}
            dataSource={data} size="small"
            onExpand={(expended, record) => dispatch(loadTaskBySprint(record.name))}
            pagination={{ ...sprint.pagination, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '40', '50'] }}
            expandedRowRender={record =>
                <div style={{ margin: 0, marginLeft: '-70px' }}>
                    <_ChangeLog {...props} description={record.description} />

                    <TaskList {...props} sprintName={record.name} userDetails={record.userDetails} />
                </div>
            }
        />
    )
}