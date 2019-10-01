import React, { Fragment } from 'react'
import { Tag, Badge } from 'antd';


export const _TaskStatus = (props) => {

    const { subTasks } = props

    return (
        <div style={{ paddingTop: '10px' }}>
            {
                subTasks.map((subTask, index) => {

                    let style = { color: 'red' }
                    let badgeStyle = { backgroundColor: '#ff0000ab' }

                    if (subTask.completedAt) {
                        style = { color: 'green' }
                        badgeStyle = { backgroundColor: '#52c41a' }
                    }

                    return (
                        <span key={index} style={style}>
                            |
                                &nbsp;
                                    <i>{subTask.assignedUser}::</i>
                            <Badge
                                count={subTask.estHour}
                                style={ badgeStyle }
                            >
                                <i style={{ paddingRight: '10px', color: "#0000ffbd"}}>{subTask.name}</i>
                            </Badge>
                            
                            &nbsp;
                        |
                        </span>
                    )

                })
            }
        </div>
    )
}