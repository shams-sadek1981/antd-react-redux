import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm, Tag } from 'antd';

import { deleteTaskFromRelease } from '../../actions/releaseActions'
import { _TaskStatus } from './_TaskStatus'
import { _TaskEstHour } from './_TaskEstHour'
import { handlePermission } from '../../functions'


export const _SprintCalculation = (props) => {

    const { dispatch, releaseList } = props

    return (
        <div style={{ borderRadius: '5px', marginBottom: '5px' }}>
            <div style={{ paddingLeft: '40px' }}>

                <div style={{ float: 'left' }}>
                    <h3 style={{ color: '#0000ffab' }}>
                        <i>#Total Est:</i> <b>{releaseList.totalEst}</b>
                    </h3>
                    <h4 style={{ color: '#008000cf', float: 'left' }}>
                        <i>#Completed:</i> <b>{releaseList.completedEst}</b>
                    </h4>
                    <h4 style={{ color: '#ff0000c4', float: 'left', paddingLeft: '15px' }}>
                        <i>#Due:</i> <b>{releaseList.dueEst}</b>
                    </h4>
                </div>

                <div style={{ float: 'right', paddingRight: '30px', paddingBottom: '5px' }}>
                    <Progress type="circle" percent={releaseList.percent} width={60} />
                </div>

                <div style={{ clear: 'both' }}></div>
            </div>
        </div>
    )
}