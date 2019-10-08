import React, { Fragment } from 'react'
import moment from 'moment'
import { Table, Divider, Tag, Icon, Checkbox, Spin, Popconfirm, Button } from 'antd';

import {
    editItem, removeItem, updateTask, updateStatus, changePagination, loadTaskByRelease
} from '../../actions/releaseActions';
import { _ChangeLog } from './_ChangeLog'
import { TaskList } from './TaskList'

import { handlePermission } from '../../functions'

export const List = (props) => {

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
    
    const { dispatch, release } = props

    const handleTableChange = (pagination, filters, sorter) => {
        dispatch(changePagination(pagination))
    }

    const confirm = (id) => {
        dispatch(removeItem(id))
    }

    const columns = [
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
            width: 150,
            render: (text, record) =>
                <div>
                    {moment(record.releaseDate).format("ddd, DD-MMM-YYYY")}
                </div>
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            width: 150,
        },
        {
            title: 'Version',
            dataIndex: 'version',
            key: 'version',
            width: 150,
            render: (text, record) => {

                const findItem = weekDays.find(item => item.name == moment(record.releaseDate).format('ddd'))
                const color = findItem.color
                return <Tag color={color}>{record.version}</Tag>
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <span>
                    {
                        (handlePermission(props, 'release_complete')) &&
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
                        (handlePermission(props, 'release_edit')) &&
                        <span>
                            <Divider type="vertical" />
                            <a onClick={() => dispatch(editItem(record._id))} href="javascript:;">
                                <Icon type="edit" theme="twoTone" />
                            </a>
                        </span>
                    }

                    {
                        (handlePermission(props, 'release_delete')) &&
                        <span>
                            <Divider type="vertical" />
                            <Popconfirm title="Are you sure to delete this task?"
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
    const data = release.list.map((item, index) => {

        return {
            _id: item._id,
            status: item.status,
            key: index,
            releaseDate: item.releaseDate,
            projectName: item.projectName,
            version: item.version,
            description: item.description,
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
                onExpand={(expended, record) => dispatch(loadTaskByRelease(record.version))}
                expandedRowRender={record =>
                    <div style={{ margin: 0 }}>
                        <_ChangeLog {...props} description={record.description} />

                        <TaskList {...props} version={record.version} />
                    </div>
                }
            />
        </Fragment>
    )
}