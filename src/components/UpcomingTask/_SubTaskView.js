import React from 'react'
import moment from 'moment'
import { List, Typography, Button, Divider, Popconfirm, Icon, Skeleton, Table, Tag } from 'antd';

import {
    addNewSubTask,
    deleteSubTask,
    editSubTask,
    updateSubTask,
    updateSubTaskStatus,
} from '../../actions/task/subTaskActions';

import './style.less'

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];


export const _SubTaskView = (props) => {

    const { dispatch, taskId, subTasks, des } = props
    const { createdAt } = props.record

    const confirm = (subTaskId) => {
        dispatch(deleteSubTask(taskId, subTaskId))
    }


    const columns = [
        {
            title: 'SL',
            dataIndex: 'sl',
            key: 'sl',
        },
        {
            title: 'Sub Task',
            dataIndex: 'subtask',
            key: 'subtask',
            render: (text, record) => (
                <a href="javascript:;" onClick={() => dispatch(editSubTask(taskId, record._id))}>
                    {record.subtask}
                </a>
            )
        },
        {
            title: 'Assigned User',
            dataIndex: 'assignedUser',
            key: 'assignedUser',
            render: (text, record) => (
                record.completedAt
                    ? <Tag color={`geekblue`}>{record.assignedUser}</Tag>
                    : <Tag color={`magenta`}>{record.assignedUser}</Tag>
            )
        },
        {
            title: 'Ref. Link',
            dataIndex: 'refLink',
            key: 'refLink',
            render: (text, record) => (
                record.refLink &&
                    <a href={record.refLink} target="_blank">
                        <Icon type="link" style={{ fontSize: '17px', color: '#08c' }} />
                    </a>
            )
        },
        {
            title: 'Est. Hour',
            dataIndex: 'estHour',
            key: 'estHour',
            align: "center",
            render: (text, record) => (
                record.completedAt
                    ? <span style={{ color: 'geekblue' }}>{record.estHour}</span>
                    : <Tag color={`purple`}>{record.estHour}</Tag>
            )

        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'startDate',
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
        },
        {
            title: 'Completed At',
            dataIndex: 'completedAt',
            key: 'completedAt',
            render: (text, record) => (
                record.completedAt && <Tag color={`geekblue`}>{record.completedAt}</Tag>
            )
        },
        {
            title: 'Action',
            key: 'action',
            align: "right",
            render: (text, record) => (
                <div>
                    <Icon type="edit" theme="twoTone"
                        onClick={() => dispatch(editSubTask(taskId, record._id))}
                    />
                    &nbsp;
                    <Popconfirm title="Are you sure delete this subTask?"
                        onConfirm={(e) => confirm(record._id)}
                        okText="Yes" cancelText="No">

                        <a href="javascript:;">
                            <Icon type="delete" theme="twoTone" />
                        </a>
                    </Popconfirm>
                </div>
            ),
        }
    ];

    const dataSource = subTasks.map((item, index) => {
        return {
            sl: ++index,
            key: index,
            _id: item._id,
            subtask: item.name,
            assignedUser: item.assignedUser,
            estHour: item.estHour,
            startDate: item.startDate && moment(item.startDate).format("DD-MMM-YYYY"),
            dueDate: item.dueDate && moment(item.dueDate).format("DD-MMM-YYYY"),
            completedAt: item.completedAt && moment(item.completedAt).format("DD-MMM-YYYY"),
            refLink: item.refLink
        }
    })

    return (
        <div id="sub-task-list">
            <a href="javascript:;" style={{ fontSize: '13px', cursor: 'pointer' }}
                onClick={() => dispatch(addNewSubTask(taskId))}>
                <Icon type="plus-circle" /> Sub Task
            </a>
            &nbsp;
            <span style={{ marginLeft: "10px" }}>{des}</span>
            <Table dataSource={dataSource} columns={columns} size="small" />
            <span style={{ color: "#C6C0C0"}}>Task ID: { taskId} </span>,
            <span style={{ color: "#C6C0C0", paddingLeft: '5px'}}>CreatedAt: { createdAt} </span>
        </div>
    )
}