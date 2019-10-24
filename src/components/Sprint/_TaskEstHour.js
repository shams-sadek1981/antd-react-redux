import React, { Fragment } from 'react'
import { Tag, Button, Progress, Timeline, Icon, Popconfirm } from 'antd';


export const _TaskEstHour = (props) => {

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

    let totalHour = 0
    subTasks.forEach(item => {
        totalHour += item.estHour
    });

    return (
        <div style={{ float: "right"}}>
            <Tag color={color} style={{ float: 'right' }}>
                { props.taskType }:<b>{ totalHour }</b>
            </Tag>
            <div style={{ color: '#0000ffa1', float: 'left'}}>{ props.projectName}</div>
        </div>
    )
}