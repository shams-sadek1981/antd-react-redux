import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider, Row, Col } from 'antd';

export const TaskDescription = (props) => {

    const { item } = props

    const startDate = moment(item.startDate).format("DD.MMM.YY")
    const endDate = moment(item.endDate).format("DD.MMM.YY")

    return (
        <Fragment>
            <div style={{ fontSize: '11pt', float: 'left'}}>{item.taskName}</div>
            <div style={{ float: 'right', fontSize: '10pt'}}>
                { startDate }~{endDate}
            </div>
            <div style={{ clear: 'left'}}></div>
            <div>
                {
                    item.subTasks.map((doc, index) => (
                        <span key={index} style={{ fontSize: '10pt'}}>
                            |   <span style={{ fontWeight: 'bold'}}>
                                    {doc.user}
                                </span>:

                                <span style={{ color: 'green', fontWeight: 'bold'}}>
                                    {doc.estHour}
                                </span> 
                                ~{doc.subTask} 
                            |
                        </span>
                    ))
                }
            </div>
        </Fragment>
    )
}