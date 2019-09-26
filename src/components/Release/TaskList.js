import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm } from 'antd';

import { deleteTaskFromRelease } from '../../actions/releaseActions'
import { _TaskStatus } from './_TaskStatus'
import { _TaskEstHour } from './_TaskEstHour'

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
                    <li key={index} style={{ background: 'rgba(108, 127, 63, 0.25)', marginBottom: '3px'}}>
                        <div>
                            <div style={{ float: 'left' }}>
                                {++index}. {item.taskName}

                                <_TaskEstHour subTasks={item.subTasks}/>
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

                            <div style={{ clear: 'both' }}>
                                <_TaskStatus subTasks={item.subTasks}/>
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