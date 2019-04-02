import React, { Fragment } from 'react'

import { Table, Divider, Tag, Icon, Checkbox, Spin, Popconfirm, Button } from 'antd';

import { editTask, removeTask
    } from '../../actions/upcomingTaskActions';

import { toggleSubtaskModalVisible } from '../../actions/task/subTaskActions';

import { _SubTaskView } from './_SubTaskView'

export const _TaskList = (props) => {

    const { dispatch, upcomingTask } = props

    const confirm = (id) => {
        dispatch(removeTask(id))
    }

    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            key: 'taskName',
            render: (text, record) =>
                <div>
                    <a href="javascript:;" onClick={() => dispatch(toggleSubtaskModalVisible())}>{text}</a>
                    <div>
                        {record.taskType}
                        <span style={{ fontStyle: 'italic' }}> Est: {record.estHour}</span>
                    </div>
                </div>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 250,
        },
        {
            title: 'Task Type',
            dataIndex: 'taskType',
            key: 'taskType',
            render: (text, record) =>
                <div>
                    {record.taskType}
                </div>
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record) =>
                <div>
                    {record.projectName}
                </div>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => dispatch(editTask(record._id))} href="javascript:;">
                        <Icon type="edit" theme="twoTone" />
                    </a>

                    <Divider type="vertical" />

                    <Popconfirm title="Are you sure delete this task?"
                        onConfirm={(e) => confirm(record._id)}
                        okText="Yes" cancelText="No">

                        <a href="javascript:;">
                            <Icon type="delete" theme="twoTone" />
                        </a>
                    </Popconfirm>
                </span>
            ),
        }
    ];


    //-- Set Data for Table Data
    const data = upcomingTask.taskList.map((item, index) => {

        let userColor = 'blue'
        const findUserColor = upcomingTask.nameColors.find(colorItem => colorItem.name == item.assignedUser)
        if (findUserColor) {
            userColor = findUserColor.color
        }

        return {
            _id: item._id,
            key: index,
            taskName: item.taskName,
            subTasks: item.subTasks,
            description: item.description,
            taskType: item.taskType,
            projectName: item.projectName,
            assignedUser: item.assignedUser,
            srs: item.srs,
            frontend: item.frontend,
            mockup: item.mockup,
            design: item.design,
            estHour: item.estHour,
            userColor
        }
    })

    return (
        <Fragment>
            <Spin tip="Loading..." spinning={upcomingTask.spinning}>
                <Table
                    columns={columns}
                    dataSource={data} size="small"
                    expandedRowRender={record =>
                        <div style={{ margin: 0 }}>
                            <_SubTaskView { ...props } taskId={record._id} subTasks={record.subTasks}/>
                        </div>
                    }
                />
            </Spin>

        </Fragment>
    )
}