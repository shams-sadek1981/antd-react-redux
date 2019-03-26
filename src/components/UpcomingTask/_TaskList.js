import React, { Fragment } from 'react'

import { Table, Divider, Tag, Icon, Checkbox } from 'antd';

import { editTask, removeTask, updateCheckList } from '../../actions/upcomingTaskActions';


export const _TaskList = (props) => {

    const { dispatch } = props

    const columns = [
        {
            title: 'Task Name',
            dataIndex: 'taskName',
            key: 'taskName',
            render: (text, record) =>
                <div>
                    <a href="javascript:;">{text}</a>
                    <div>
                        { record.taskType }
                        <span style={{ fontStyle: 'italic'}}> Est: {record.estHour}</span>
                    </div>
                </div>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Assigned User',
            dataIndex: 'assignedUser',
            key: 'assignedUser',
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
                        <Checkbox defaultChecked={record.frontend} style={{width: '100px'}}
                            onChange={ (e) => dispatch( updateCheckList( record._id, 'frontend', e.target.checked) )}
                        >Frontend</Checkbox>
                        
                        <Checkbox
                            defaultChecked={record.srs}
                            onChange={ (e) => dispatch( updateCheckList( record._id, 'srs', e.target.checked) )}
                        > SRS
                        </Checkbox>
                        
                    </div>
                    <div>
                        <Checkbox defaultChecked={record.mockup} style={{width: '100px'}}
                            onChange={ (e) => dispatch( updateCheckList( record._id, 'mockup', e.target.checked) )}
                        >Mockup</Checkbox>

                        <Checkbox defaultChecked={record.design}
                            onChange={ (e) => dispatch( updateCheckList( record._id, 'design', e.target.checked) )}
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

                    <a onClick={() => dispatch(removeTask(record._id))} href="javascript:;">
                        <Icon type="delete" theme="twoTone" />
                    </a>

                </span>
            ),
        }
    ];

    
    //-- Set Data for Table Data
    const data = props.upcomingTask.taskList.map((item, index) => {
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
        }
    })

    return (
        <Fragment>
            <Table columns={columns} dataSource={data} />
        </Fragment>
    )
}