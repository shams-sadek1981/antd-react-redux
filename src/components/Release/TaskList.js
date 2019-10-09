import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm, Tag } from 'antd';

import { deleteTaskFromRelease } from '../../actions/releaseActions'
import { _TaskStatus } from './_TaskStatus'
import { _TaskEstHour } from './_TaskEstHour'

import { handlePermission } from '../../functions'

import styles from './styles.module.less'

export const TaskList = (props) => {

    const { dispatch, release, version } = props

    const taskListByRelease = release.taskList.filter(item => item.version == version)
    const releaseList = taskListByRelease[0]

    const confirm = item => dispatch(deleteTaskFromRelease(item))

    return (
        <Fragment>

            {releaseList &&
                <div className={styles.taskList}>
                    <ul>
                        {releaseList.result.map((item, index) => (
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
                                            <Popconfirm title="Are you sure to remove from release?"
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