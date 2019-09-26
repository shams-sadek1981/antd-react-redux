import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm } from 'antd';


export const _TaskEstHour = (props) => {

    const { subTasks } = props

    let totalHour = 0
    subTasks.forEach(item => {
        totalHour += item.estHour
    });

    return (
        <Fragment>
            <span style={{ fontWeight: 'bold', paddingLeft: '10px', color: '#0000ffb0'}}>
                : {totalHour}
                {totalHour > 1 && ' Hours'}
                {totalHour == 1 && ' Hour'}
            </span>
        </Fragment>
    )
}