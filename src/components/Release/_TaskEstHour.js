import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm } from 'antd';


export const _TaskEstHour = (props) => {

    const { subTasks } = props

    let totalHour = 0
    subTasks.forEach(item => {
        totalHour += item.estHour
    });

    return (
        <div style={{ float: "right"}}>
            <span style={{ paddingLeft: '10px', color: '#0000ffb0'}}>
                <b>{totalHour}</b>
                <i>{totalHour > 1 && ' Hours'}</i>
                <i>{totalHour == 1 && ' Hour'}</i>
            </span>
        </div>
    )
}