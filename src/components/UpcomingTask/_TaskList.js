import React, { Fragment } from 'react'
import moment from 'moment'
import { Table, Divider, Tag, Icon, Checkbox, Spin, Popconfirm, Button, Switch, Rate, Progress, Menu } from 'antd';

import {
    editTask, removeTask, updateTask, updateTaskStatus, changePagination, updateRunningTask, updateTaskRate
} from '../../actions/upcomingTaskActions';

import { toggleSubtaskModalVisible } from '../../actions/task/subTaskActions';

import { _SubTaskView } from './_SubTaskView'
import { _MoreActionMenu } from './_MoreActionMenu'


export const _TaskList = (props) => {

    const { dispatch, upcomingTask } = props

    const handleTableChange = (pagination, filters, sorter) => {
        dispatch(changePagination(pagination))
    }

    const handleRateChange = (_id, value) => {
        console.log(value)
        dispatch(updateTaskRate({
            _id,
            rate: value
        }))
    }

    //-- Set Data for Table Data
    const data = upcomingTask.taskList.map((item, index) => {

        let userColor = 'blue'
        const findUserColor = upcomingTask.nameColors.find(colorItem => colorItem.name == item.assignedUser)
        if (findUserColor) {
            userColor = findUserColor.color
        }

        return {
            key: index,
            _id: item._id,
            status: item.status,
            rate: item.rate || 0,
            running: item.running,
            taskName: item.taskName,
            subTasks: item.subTasks,
            description: item.description,
            taskType: item.taskType,
            projectName: item.projectName,
            assignedBy: item.assignedBy,
            completedAt: item.completedAt,
            estHour: item.estHour,
            completedHour: item.completedHour,
            dueHour: item.dueHour,
            percent: item.percent,
            userColor
        }
    })

    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            key: 'taskName',
            render: (text, record) =>
                <div>
                    <a href="javascript:;" onClick={() => dispatch(toggleSubtaskModalVisible())}>
                        { 
                            (record.running == true)
                            ? <span>{text}</span>
                            : <span style={{ color: 'black' }}>{text}</span>
                        }
                    </a>
                    <div>
                        
                        <span style={{ fontStyle: 'italic' }}> Est: <b>{record.completedHour}/{record.estHour}</b> Due: {record.dueHour} </span>
                        <Divider type="vertical" />
                        <Rate allowHalf onChange={value => handleRateChange(record._id, value)} value={record.rate} />
                        <Divider type="vertical" />
                        { record.assignedBy && <span><Icon type="like" /> { record.assignedBy }</span> }
                    </div>
                </div>
        },
        {
            title: 'Completed',
            dataIndex: 'completed',
            key: 'completed',
            width: 250,
            render: (text, record) => (
                <div>
                    <Progress type="circle" percent={record.percent} width={50}/>
                    &nbsp;{ record.completedAt && moment(record.completedAt).format('DD-MMM-YYYY') }
                </div>
            )
        },
        {
            title: 'Task Type',
            dataIndex: 'taskType',
            key: 'taskType',
            width: 100,
            render: (text, record) => {

                const featureTypes = [
                    {
                        name: 'New Feature',
                        color: 'blue'
                    },
                    {
                        name: 'Enhancement',
                        color: 'magenta'
                    },
                    {
                        name: 'Plugin Issue',
                        color: 'orange'
                    },
                    {
                        name: 'R&D',
                        color: 'green'
                    }
                ]

                const findItem = featureTypes.find(item => item.name == record.taskType)

                const color = findItem.color
                return <Tag color={color}>{record.taskType}</Tag>
            }
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            width: 110,
            render: (text, record) =>
                <div>
                    {record.projectName}
                </div>
        },
        {
            title: '',
            key: 'action',
            align: "right",
            render: (text, record) => (
                <_MoreActionMenu {...props} record={record}/>
            ),
        }
    ];


    return (
        <Fragment>
            <Table
                loading={upcomingTask.spinning}
                pagination={upcomingTask.pagination}
                onChange={handleTableChange}
                columns={columns}
                dataSource={data}
                size="small"
                expandedRowRender={record =>
                    <div style={{ margin: 0 }}>
                        <_SubTaskView {...props} taskId={record._id} subTasks={record.subTasks} des={record.description}/>
                    </div>
                }
            />
        </Fragment>
    )
}