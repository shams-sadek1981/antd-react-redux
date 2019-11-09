import React, { Fragment } from 'react'
import { Tag, Button, Progress, Timeline, Icon, Popconfirm } from 'antd';


export const _TaskType = (props) => {

    const { subTasks } = props

    const featureTypes = [
        {
            name: 'New Feature',
            color: 'pink'
        },
        {
            name: 'Enhancement',
            color: 'blue'
        },
        {
            name: 'Plugin Issue',
            color: ''
        },
        {
            name: 'Client Issue',
            color: 'magenta'
        }
    ]

    const findItem = featureTypes.find(item => item.name == props.taskType)

    let color = 'orange'
    if (typeof (findItem) != 'undefined') color = findItem.color

    return (
        <div style={{ float: "right"}}>
            <Tag color={color} style={{ float: 'right' }}>
                { props.taskType }
            </Tag>
            
            <div style={{ color: 'rgba(0, 0, 255, 0.36)', float: 'left', width: '120px', textAlign: 'center', marginTop: '10px'}}>
                { props.projectName}
            </div>
        </div>
    )
}