import React, { Fragment } from 'react'

import { Table, Divider, Tag, Icon, Checkbox, Spin, Popconfirm } from 'antd';

import { editTask, removeTask, updateCheckList } from '../../actions/upcomingTaskActions';


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
                    <a href="javascript:;">{text}</a>
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
            width: 250
        },
        {
            title: 'Assigned User',
            dataIndex: 'assignedUser',
            key: 'assignedUser',
            render: (text, record) => <Tag color={record.userColor} key={text}>{text}</Tag>
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
            title: 'Check List',
            dataIndex: 'checkList',
            key: 'checkList',
            render: (text, record) =>
                <div>
                    <div>
                        <Checkbox defaultChecked={record.frontend} style={{ width: '100px' }}
                            onChange={(e) => dispatch(updateCheckList(record._id, 'frontend', e.target.checked))}
                        >Frontend</Checkbox>

                        <Checkbox
                            defaultChecked={record.srs}
                            onChange={(e) => dispatch(updateCheckList(record._id, 'srs', e.target.checked))}
                        > SRS
                        </Checkbox>

                    </div>
                    <div>
                        <Checkbox defaultChecked={record.mockup} style={{ width: '100px' }}
                            onChange={(e) => dispatch(updateCheckList(record._id, 'mockup', e.target.checked))}
                        >Mockup</Checkbox>

                        <Checkbox defaultChecked={record.design}
                            onChange={(e) => dispatch(updateCheckList(record._id, 'design', e.target.checked))}
                        >Design</Checkbox>
                    </div>
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
                        onConfirm={ (e) => confirm(record._id)}
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
                <Table columns={columns} dataSource={data} size="small" />
            </Spin>

        </Fragment>
    )
}