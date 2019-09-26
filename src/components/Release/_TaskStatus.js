import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm } from 'antd';


export const _TaskStatus = (props) => {

    const { subTasks } = props

    return (
        <div style={{ paddingTop: '10px'}}>
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
                                &nbsp;
                                    {subTask.assignedUser}:
                                    {subTask.estHour}~
                                    {subTask.name}
                                &nbsp;
                            |
                        </span>
                    )

                })
            }
        </div>
    )
}