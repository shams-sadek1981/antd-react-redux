import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm, Tag } from 'antd';

import { deleteTaskFromSprint } from '../../actions/sprintActions'
import { _TaskStatus } from './_TaskStatus'
import { _TaskEstHour } from './_TaskEstHour'
import { handlePermission } from '../../functions'


export const TaskList = (props) => {

    const { dispatch, release, version, sprint } = props

    const taskListBySprint = sprint.taskList.filter(item => item.release == version)

    const confirm = item => dispatch(deleteTaskFromSprint(item))

    return (
        <Fragment>

            {/* -------------------- Sprint calculation -------------------- */}
            {taskListBySprint.length > 0 &&
                <div style={{ borderRadius: '5px', marginBottom: '5px' }}>
                    <div style={{ paddingLeft: '40px' }}>

                        <div style={{ float: 'left' }}>
                            <h3 style={{ color: '#0000ffab' }}>
                                <i>#Total Est:</i> <b>{sprint.sprint.totalEst}</b>
                            </h3>
                            <h4 style={{ color: '#008000cf', float: 'left' }}>
                                <i>#Completed:</i> <b>{sprint.sprint.completedEst}</b>
                            </h4>
                            <h4 style={{ color: '#ff0000c4', float: 'left', paddingLeft: '15px' }}>
                                <i>#Due:</i> <b>{sprint.sprint.dueEst}</b>
                            </h4>
                        </div>

                        <div style={{ float: 'right', paddingRight: '30px', paddingBottom: '5px' }}>
                            <Progress type="circle" percent={sprint.sprint.percent} width={60} />
                        </div>

                        <div style={{ clear: 'both' }}></div>
                    </div>
                </div>
            }

            <ul>
                {taskListBySprint.map((item, index) => (
                    <li key={index} style={{ background: 'rgb(255, 255, 255)', marginBottom: '3px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                        <div>
                            <div style={{ float: 'left' }}>
                                {++index}. {item.taskName}
                                <_TaskStatus subTasks={item.subTasks} />
                            </div>

                            <div style={{ float: 'right' }}>

                                <Progress type="circle" percent={item.percent} width={50} style={{ padding: '5px 10px', }} />
                                {
                                    (handlePermission(props, 'release_task_delete')) &&
                                    <Popconfirm title="Are you sure to remove from sprint?"
                                        onConfirm={(e) => confirm(item)}
                                        okText="Yes" cancelText="No">

                                        <a href="javascript:;">
                                            <Icon type="close-circle" theme="twoTone" />
                                        </a>
                                    </Popconfirm>
                                }
                            </div>

                            <_TaskEstHour subTasks={item.subTasks} taskType={item.taskType}/>

                            <div style={{ clear: 'both' }}></div>

                        </div>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}