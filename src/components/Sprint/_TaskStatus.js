import React, { Fragment } from 'react'
import { Tag, Badge } from 'antd';


export const _TaskStatus = (props) => {

    const { subTasks } = props

    return (
        <div style={{ paddingTop: '10px' }}>
            {
                subTasks.map((subTask, index) => {

                    let style = { color: 'red', float: 'left' }
                    let badgeStyle = { backgroundColor: '#ff0000ab' }

                    if (subTask.completedAt) {
                        style = { color: 'green' }
                        badgeStyle = { backgroundColor: '#52c41a' }
                    }

                    return (
                        <div key={index} style={style}>
                            |
                            <span style={{ padding: '5px', fontStyle: 'italic'}}>
                                <span>{subTask.assignedUser}:</span>
                                <span style={{ fontWeight: 'bold'}}>{subTask.estHour}:</span>
                                <span style={{ color: "#0000ffbd" }}>{subTask.name}</span>
                            </span>
                            |
                        </div>
                    )

                })
            }
        </div>
    )
}