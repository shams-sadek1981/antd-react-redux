import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm, Tag, Table } from 'antd';

import { deleteTaskFromRelease } from '../../actions/releaseActions'
import { _TaskStatus } from './_TaskStatus'
import { _TaskEstHour } from './_TaskEstHour'

import { handlePermission } from '../../functions'


export const TaskList = (props) => {

    const { dispatch, release, version } = props

    const taskListByRelease = release.taskList.filter(item => item.version == version)
    const releaseList = taskListByRelease[0]

    const confirm = item => dispatch(deleteTaskFromRelease(item))

    let subTasks = []
    if (releaseList) {
        subTasks = releaseList.result
    }

    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            key: 'taskName',
            // width: 150,
            render: (text, record) => 
                <div>
                    { record.taskName }
                    <_TaskStatus subTasks={record.subTasks} />
                </div>
        },
        {
            title: 'Task Type',
            dataIndex: 'taskType',
            key: 'taskType',
            width: 100,
            render: (text, record) => 
                <div>
                    <_TaskEstHour subTasks={record.subTasks} taskType={record.taskType} />
                </div>
        },
        {
            title: 'Progress',
            dataIndex: 'progress',
            key: 'progress',
            width: 100,
            render: (text, record) => 
                <div>
                    <Progress type="circle" percent={record.percent} width={50} style={{ padding: '5px 10px', }} />
                </div>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 50,
            render: (text, record) =>
                (handlePermission(props, 'release_task_delete')) &&
                <Popconfirm title="Are you sure to remove from release?"
                    onConfirm={(e) => confirm(record)}
                    okText="Yes" cancelText="No">

                    <a href="javascript:;">
                        <Icon type="close-circle" theme="twoTone" />
                    </a>
                </Popconfirm>
        },
    ]

    return (
            <Table
                rowKey={record => record._id}
                style={{ marginLeft: '-60px' }}
                // loading={release.spinning}
                // pagination={release.pagination}
                // onChange={handleTableChange}
                columns={columns}
                dataSource={ subTasks }
                size="small"
                pagination={{ defaultPageSize: 20, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
            />
    )
}