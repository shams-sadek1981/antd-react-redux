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

            {/* -------------------- Sprint calculation -------------------- */}
            {taskListByRelease.length > 0 &&
                <div style={{ borderRadius: '5px', marginBottom: '5px'}}>
                    <div style={{ paddingLeft: '40px' }}>

                        <div style={{ float: 'left' }}>
                            <h3 style={{ color: '#0000ffab' }}>
                                # Total Est: <b>{release.sprint.totalEst}</b>
                            </h3>
                            <h4 style={{ color: '#008000cf', float: 'left' }}>
                                # Completed: <b>{release.sprint.completedEst}</b>
                            </h4>
                            <h4 style={{ color: '#ff0000c4', float: 'left', paddingLeft: '15px' }}>
                                # Due: <b>{release.sprint.dueEst}</b>
                            </h4>
                        </div>

                        <div style={{ float: 'right', paddingRight: '30px', paddingBottom: '5px' }}>
                            <Progress type="circle" percent={release.sprint.percent} width={60} />
                        </div>

                        <div style={{ clear: 'both' }}></div>
                    </div>
                </div>
            }

            <ul>
                {taskListByRelease.map((item, index) => (
                    <li key={index} style={{ background: 'rgba(108, 127, 63, 0.25)', marginBottom: '3px' }}>
                        <div>
                            <div style={{ float: 'left' }}>
                                {++index}. {item.taskName}

                                <_TaskEstHour subTasks={item.subTasks} />
                                <_TaskStatus subTasks={item.subTasks} />
                            </div>

                            <div style={{ float: 'right' }}>

                                <Progress type="circle" percent={item.percent} width={50} style={{ padding: '5px 10px', }} />

                                <Popconfirm title="Are you sure to remove from release?"
                                    onConfirm={(e) => confirm(item)}
                                    okText="Yes" cancelText="No">

                                    <a href="javascript:;">
                                        <Icon type="close-circle" theme="twoTone" />
                                    </a>
                                </Popconfirm>
                            </div>

                            <div style={{ clear: 'both' }}>

                            </div>

                        </div>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}