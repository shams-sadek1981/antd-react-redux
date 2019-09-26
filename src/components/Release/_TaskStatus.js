import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm } from 'antd';


export const _TaskStatus = (props) => {

    const { subTasks } = props

    return (
        <Fragment>
            {
                subTasks.map((subTask, index) => {

                    let style = {
                        color: 'red'
                    }

                    if (subTask.completedAt) {
                        style = {
                            color: 'green'
                        }
                    }

                    return (
                        <span key={index} style={style}>
                            |
                                {subTask.assignedUser}:
                                {subTask.estHour}~
                                {subTask.name}
                            |
                        </span>
                    )

                })
            }
        </Fragment>
    )
}