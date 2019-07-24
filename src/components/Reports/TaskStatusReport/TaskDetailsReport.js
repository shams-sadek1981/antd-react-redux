import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider, Row, Col } from 'antd';

import { TaskDescription } from './TaskDescription'

export const TaskDetailsReport = (props) => {

    const { reports } = props
    return (
        <Fragment>
            <div>
                Date Between: { reports.searchBy.startDate } to { reports.searchBy.endDate } 
            </div>
            <div>
                Project Name: <strong>{ reports.searchBy.project }</strong>
            </div>
            <div>
                Total Completed Task: <strong>{ reports.reportTaskStatus.totalTask }</strong>
            </div>
            <div>
                Total Estimation Hour: <strong>{ reports.reportTaskStatus.totalEst }</strong>
            </div>

            <table className="user-details-table report-table">
                <thead>
                    <tr>
                        <th style={{ width: "10%"}}>Completed_At</th>
                        <th>Task Name</th>
                        <th>Task Type</th>
                        <th style={{ width: '10%'}}>Est._Hour</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        reports.reportTaskStatus.result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.completedAt}</td>
                                <td><TaskDescription item={item}/></td>
                                <td>{item.taskType}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="3" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reports.reportTaskStatus.totalEst}</td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    )
}