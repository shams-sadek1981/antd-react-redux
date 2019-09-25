import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm } from 'antd';

import { deleteTaskFromRelease } from '../../actions/releaseActions'

export const TaskList = (props) => {

    const { dispatch, release, version } = props

    const taskListByRelease = release.taskList.filter(item => item.release == version)

    const confirm = item => dispatch(deleteTaskFromRelease(item))


    return (
        <Fragment>
            
            { taskListByRelease.length > 0 &&
                <h4>Task List...</h4>
            }

            <ul>
                {taskListByRelease.map((item, index) => (
                    <li key={index} style={{ background: 'rgba(63, 65, 127, 0.08)', marginBottom: '3px'}}>
                        <div>
                            <div style={{ float: 'left' }}>
                                {++index}. {item.taskName}
                            </div>
                            <div style={{ float: 'right' }}>
                                <Popconfirm title="Are you sure to remove from release?"
                                    onConfirm={(e) => confirm(item)}
                                    okText="Yes" cancelText="No">

                                    <a href="javascript:;">
                                        <Icon type="close-circle" theme="twoTone" />
                                    </a>
                                </Popconfirm>
                            </div>
                        </div>
                        <Progress
                            percent={item.percent}
                            status="active" size="small" strokeWidth={2}
                        />
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}