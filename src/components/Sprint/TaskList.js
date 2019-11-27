import React, { Fragment } from 'react'
import { Rate, Button, Progress, Timeline, Icon, Popconfirm, Tag, Row, Col, Switch, Spin, Table } from 'antd';

import { deleteTaskFromSprint, editTask, filterByUserName, loadTaskBySprint, updateRunningTask, addNewSubTask, addNewTask } from '../../actions/sprintActions'
import { _SubTask } from './_SubTask'
import { _SubTaskDetails } from './_SubTaskDetails'
import { UserSummary } from './UserSummary'
import { _TaskType } from './_TaskType'
import { handlePermission } from '../../functions'

import styles from './styles.module.less'
import { link } from 'fs';

export const TaskList = (props) => {

    const { dispatch, sprint, sprintName, userDetails } = props

    const sprintTaskList = sprint.taskList.find(item => item.sprintName == sprintName)

    //-- Delete Task From Sprint
    const confirm = item => dispatch(deleteTaskFromSprint(item))

    const columns = [
        {
            title: <div style={{ display: 'flex'}}>
                <div>Task Name</div>
                {
                    (handlePermission(props, 'upcoming_task_create')) &&
                    <span className="add-task">
                        <a onClick={() => dispatch(addNewTask(sprintName))} href="javascript:;">
                            <Icon type="plus-circle" theme="twoTone" />
                        </a>
                    </span>
                }
            </div>,
            dataIndex: 'taskName',
            key: 'taskName',
            // width: 300,
            render: (text, record) => <div>
                <a style={{ color: 'black' }} href="javascript:;" onClick={() => {
                    dispatch(editTask(sprintName, record._id))
                }}>
                    {record.taskName}
                </a>

                {/* --- Est Hour --- */}
                <span style={{ color: 'black', marginLeft: '5px', marginRight: '5px' }}>
                    {record.estHour > 0 &&
                        <span>
                            - <b>{record.estHour}</b>h
                        </span>
                    }
                </span>


                {/* --- Task Rate --- */}
                <Rate
                    onChange={(value) => dispatch(updateRunningTask({
                        _id: record._id,
                        rate: value
                    }))}
                    allowHalf value={record.rate} style={{ fontSize: '13px', marginLeft: '10px' }}
                />


                {/* ----- Sub Task ----- */}
                <_SubTask
                    {...props}
                    subTasks={record.subTasks}
                    taskId={record._id}
                    sprintName={sprintName}
                />
            </div>
        },
        {
            title: 'Task Type',
            dataIndex: 'taskType',
            key: 'taskType',
            width: 70,
            render: (text, record) => <_TaskType
                taskType={record.taskType}
                projectName={record.projectName}
            />
        },
        {
            title: 'Release',
            dataIndex: 'release',
            key: 'release',
            width: 70,
            render: (text, record) => <div>
                {
                    record.release &&
                    // <Tooltip title={record.description}>
                    <Tag color="blue" style={{ marginBottom: '10px' }}>{record.release}</Tag>
                    // </Tooltip>
                }

                {/* ---- Task status for KanbanBoard ---- */}
                {!record.completedAt &&
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatch(updateRunningTask({
                            _id: record._id,
                            running: !record.running
                        }))}
                    >
                        {record.running && <span style={{ color: 'green' }}>Progress</span>}
                        {!record.running && <span style={{ color: 'silver' }}>Todo</span>}
                    </div>
                }
            </div>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 50,
            render: (text, record) => <div style={{ display: 'flex' }}>
                {/* ---- Task Percent ---- */}
                <Progress type="circle" percent={record.percent} width={50} style={{ padding: '5px', }} />

                {
                    (handlePermission(props, 'sprint_task_delete')) &&
                    <Popconfirm
                        className="remove-task-from-sprint"
                        title="Are you sure to remove from sprint?"
                        onConfirm={(e) => confirm(record)}
                        okText="Yes" cancelText="No">

                        <a href="javascript:;">
                            <Icon type="close-circle" theme="twoTone" />
                        </a>
                    </Popconfirm>
                }
            </div>
        },
    ]

    return (
        <Spin spinning={sprint.loading}>

            <UserSummary {...props} />

            <div style={{ marginBottom: '15px', clear: 'both' }} />

            {sprintTaskList &&
                <Table
                    className="sprint-task"
                    rowKey={record => record._id}
                    columns={columns}
                    dataSource={sprintTaskList.result} size="small"
                    pagination={{ defaultPageSize: 40, showSizeChanger: true, pageSizeOptions: ['10', '20', '30', '40'] }}
                    expandedRowRender={record => <_SubTaskDetails {...props} subTasks={record.subTasks} taskId={record._id} taskName={record.taskName} />}
                />
            }
        </Spin>
    )
}