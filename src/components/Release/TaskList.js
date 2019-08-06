import React, { Fragment } from 'react'
import { List, Button } from 'antd';

export const TaskList = (props) => {

    const { dispatch, release, version } = props

    const taskListByRelease = release.taskList.filter(item => item.release == version)

    return (
        <Fragment>
            <h4>Task List</h4>
            <ol>
                {taskListByRelease.map((item, index) => (
                    <li key={index}>{item.taskName}</li>
                ))}
            </ol>
        </Fragment>
    )
}