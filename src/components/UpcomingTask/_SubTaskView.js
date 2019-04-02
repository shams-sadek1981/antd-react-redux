import React from 'react'
import { List, Typography, Button, Divider, Popconfirm, Icon, Skeleton, Checkbox } from 'antd';

import { addNewSubTask, deleteSubTask, editSubTask, updateSubTask, updateSubTaskStatus } from '../../actions/task/subTaskActions';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

export const _SubTaskView = (props) => {

    const { dispatch, taskId } = props

    const confirm = (subTaskId) => {
        dispatch(deleteSubTask(taskId, subTaskId))
    }

    return (
        <div>
            <a href="javascript:;" style={{ fontSize: '13px', cursor: 'pointer' }}
                onClick={() => dispatch(addNewSubTask(taskId))}>
                +Sub Task
            </a>
            <List
                size="small"
                header={
                    <div>
                        <div style={{ width: '15px', float: 'left' }}>SL</div>
                        <Divider type="vertical" style={{ float: 'left' }} />

                        <div style={{ width: '250px', float: 'left' }}>Sub Task</div>
                        <Divider type="vertical" style={{ float: 'left' }} />

                        <div style={{ width: '200px', float: 'left' }}>Assigned User</div>
                        <Divider type="vertical" style={{ float: 'left' }} />

                        <div style={{ width: '200px', float: 'left' }}>Est. Hour</div>
                        <Divider type="vertical" style={{ float: 'left' }} />

                        <div style={{ width: '50px', float: 'left' }}>Status</div>
                        <Divider type="vertical" style={{ float: 'left' }} />

                        <div style={{ width: '60px', float: 'right' }}>Action</div>
                        <Divider type="vertical" />
                    </div>
                }
                bordered
                dataSource={props.subTasks}
                renderItem={(item, index) => (
                    <List.Item actions={[
                        <Icon type="edit" theme="twoTone"
                            onClick={() => dispatch(editSubTask(taskId, item._id))}
                        />,

                        <Popconfirm title="Are you sure delete this subTask?"
                            onConfirm={(e) => confirm(item._id)}
                            okText="Yes" cancelText="No">

                            <a href="javascript:;">
                                <Icon type="delete" theme="twoTone" />
                            </a>
                        </Popconfirm>
                    ]}>

                        <div style={{ width: '15px' }}>{++index}</div>
                        <Divider type="vertical" />

                        <div style={{ width: '250px' }}>{item.name}</div>
                        <Divider type="vertical" />

                        <div style={{ width: '200px' }}>{item.assignedUser}</div>
                        <Divider type="vertical" />

                        <div style={{ width: '200px' }}>{item.estHour}</div>
                        <Divider type="vertical" />

                        <div>
                            <Checkbox defaultChecked={item.status}
                                onChange={(e) => dispatch(
                                    updateSubTaskStatus({
                                        ...item,
                                        status: ! item.status
                                    })
                                )}
                            />
                        </div>
                        {/* <Divider type="vertical" /> */}

                    </List.Item>
                )}
            />
        </div>
    )
}