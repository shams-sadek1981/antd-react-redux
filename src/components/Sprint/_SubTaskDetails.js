import React, { Fragment } from 'react'
import { Tag, Badge, Icon, Tooltip, Table, Popconfirm } from 'antd';
import moment from 'moment'

import { editSubTask, deleteSubTask, addNewSubTask } from '../../actions/sprintActions'
import { handlePermission } from '../../functions'

export const _SubTaskDetails = (props) => {

    const { subTasks, dispatch, taskId, sprintName, taskName } = props

    const columns = [
        {
            title: <div style={{ display: 'flex'}}>
                <div>User</div>
                <Icon
                    className="add-subtask"
                    onClick={() => dispatch(addNewSubTask(taskId, taskName))}
                    type="plus-circle"
                    style={{ cursor: 'pointer', marginLeft: '10px', color: 'green' }}
                />
            </div>,
            dataIndex: 'user',
            key: 'user',
            width: 150,
            render: (text, record) => <div>
                {record.completedAt &&
                    <span
                        onClick={() => dispatch(editSubTask(sprintName, taskId, record._id))}
                        style={{ color: 'green', cursor: 'pointer' }}
                    >
                        {record.assignedUser}
                    </span>
                }

                {!record.completedAt &&
                    <span
                        onClick={() => dispatch(editSubTask(sprintName, taskId, record._id))}
                        style={{ color: 'red', cursor: 'pointer' }}
                    >
                        {record.assignedUser}
                    </span>
                }
            </div>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 200,
            render: (text, record) => <div>
                {record.description}
                {record.refLink &&
                    <a href={record.refLink} target="_blank" style={{ marginLeft: '2px', marginRight: '2px' }}>
                        <Icon type="link" style={{ fontSize: '17px', color: '#08c' }} />
                    </a>
                }
            </div>
        },
        {
            title: 'Subtask',
            dataIndex: 'subtask',
            key: 'subtask',
            width: 150,
            render: (text, record) => <div>
                {record.name}
            </div>
        },
        {
            title: 'Est. Hour',
            dataIndex: 'estHour',
            key: 'estHour',
            width: 80,
            align: 'center',
            render: (text, record) => record.estHour
        },
        {
            title: 'Completed At',
            dataIndex: 'completedAt',
            key: 'completedAt',
            width: 150,
            render: (text, record) => <div>
                {record.completedAt &&
                    moment(record.completedAt).format("DD-MMM-YYYY")
                }
            </div>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 50,
            align: 'right',
            render: (text, record) => <div>
                {
                    (handlePermission(props, 'upcoming_task_subtask_update')) &&
                    <Icon
                        onClick={() => dispatch(editSubTask(sprintName, taskId, record._id))}
                        type="edit"
                        style={{ cursor: 'pointer', marginRight: '10px' }}
                    />
                }

                {
                    (handlePermission(props, 'upcoming_task_subtask_delete')) &&
                    <Popconfirm title="Are you sure to delete subtask?"
                        onConfirm={(e) => dispatch(deleteSubTask(taskId, record._id))}
                        okText="Yes" cancelText="No">
                        <Icon type="delete" style={{ cursor: 'pointer' }} />
                    </Popconfirm>
                }
            </div>
        },
    ]
    return (
        <Table
            className="table-subtask-details"
            style={{ marginLeft: '-45px', marginBottom: '3px' }}
            rowKey={record => record._id}
            columns={columns}
            dataSource={subTasks} size="small"
        />
    )
}