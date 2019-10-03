import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm, Tag } from 'antd';

import { deleteTaskFromRelease } from '../../actions/releaseActions'
import { _TaskStatus } from './_TaskStatus'
import { _TaskEstHour } from './_TaskEstHour'
import { handlePermission } from '../../functions'



function TaskTypeDisplay(props) {

    const featureTypes = [
        {
            name: 'New Feature',
            color: 'blue'
        },
        {
            name: 'Enhancement',
            color: 'magenta'
        },
        {
            name: 'Plugin Issue',
            color: 'orange'
        },
        {
            name: 'R&D',
            color: 'green'
        }
    ]

    const findItem = featureTypes.find(item => item.name == props.taskType)

    let color = 'orange'
    if (typeof (findItem) != 'undefined') color = findItem.color

    return <Tag color={color} style={{ float: 'right' }}>{props.taskType}</Tag>
}

export const TaskList = (props) => {

    const { dispatch, release, version } = props

    const taskListByRelease = release.taskList.filter(item => item.release == version)

    const confirm = item => dispatch(deleteTaskFromRelease(item))

    return (
        <Fragment>

            {/* -------------------- Sprint calculation -------------------- */}
            {taskListByRelease.length > 0 &&
                <div style={{ borderRadius: '5px', marginBottom: '5px' }}>
                    <div style={{ paddingLeft: '40px' }}>

                        <div style={{ float: 'left' }}>
                            <h3 style={{ color: '#0000ffab' }}>
                                <i>#Total Est:</i> <b>{release.sprint.totalEst}</b>
                            </h3>
                            <h4 style={{ color: '#008000cf', float: 'left' }}>
                                <i>#Completed:</i> <b>{release.sprint.completedEst}</b>
                            </h4>
                            <h4 style={{ color: '#ff0000c4', float: 'left', paddingLeft: '15px' }}>
                                <i>#Due:</i> <b>{release.sprint.dueEst}</b>
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
                    <li key={index} style={{ background: 'rgba(126, 63, 127, 0.13)', marginBottom: '3px' }}>
                        <div>
                            <div style={{ float: 'left' }}>
                                {++index}. {item.taskName}
                                <_TaskStatus subTasks={item.subTasks} />
                            </div>

                            <div style={{ float: 'right' }}>

                                <Progress type="circle" percent={item.percent} width={50} style={{ padding: '5px 10px', }} />
                                {
                                    (handlePermission(props, 'release_task_delete')) &&
                                    <Popconfirm title="Are you sure to remove from release?"
                                        onConfirm={(e) => confirm(item)}
                                        okText="Yes" cancelText="No">

                                        <a href="javascript:;">
                                            <Icon type="close-circle" theme="twoTone" />
                                        </a>
                                    </Popconfirm>
                                }
                            </div>

                            <_TaskEstHour subTasks={item.subTasks} />

                            <TaskTypeDisplay taskType={item.taskType} />

                            <div style={{ clear: 'both' }}></div>

                        </div>
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}