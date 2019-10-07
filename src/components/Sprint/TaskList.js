import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm, Tag } from 'antd';

import { deleteTaskFromSprint } from '../../actions/sprintActions'
import { _TaskStatus } from './_TaskStatus'
import { _TaskEstHour } from './_TaskEstHour'
import { handlePermission } from '../../functions'


export const TaskList = (props) => {

    const { dispatch, sprint, sprintName } = props

    const taskListBySprint = sprint.taskList.filter(item => item.sprintName == sprintName)

    const sprintList = taskListBySprint[0]
    props.dispatch({
        type: 'ABC',
        payload: {
            taskListBySprint,
            sprintName,
            sprintList
        }
    })

    const confirm = item => dispatch(deleteTaskFromSprint(item))

    return (
        <Fragment>

            {/* -------------------- Sprint calculation -------------------- */}
            {sprintList &&
                <div>
                    <div style={{ borderRadius: '5px', marginBottom: '5px' }}>
                        <div style={{ paddingLeft: '40px' }}>

                            <div style={{ float: 'left' }}>
                                <h3 style={{ color: '#0000ffab' }}>
                                    <i>#Total Est:</i> <b>{sprintList.totalEst}</b>
                                </h3>
                                <h4 style={{ color: '#008000cf', float: 'left' }}>
                                    <i>#Completed:</i> <b>{sprintList.completedEst}</b>
                                </h4>
                                <h4 style={{ color: '#ff0000c4', float: 'left', paddingLeft: '15px' }}>
                                    <i>#Due:</i> <b>{sprintList.dueEst}</b>
                                </h4>
                            </div>

                            <div style={{ float: 'right', paddingRight: '30px', paddingBottom: '5px' }}>
                                <Progress type="circle" percent={sprintList.percent} width={60} />
                            </div>

                            <div style={{ clear: 'both' }}></div>
                        </div>
                    </div>

                    <ul>
                        {sprintList.result.map((item, index) => (
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

                                    <_TaskEstHour subTasks={item.subTasks} taskType={item.taskType} />

                                    <div style={{ clear: 'both' }}></div>

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </Fragment>
    )
}