import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

export const UserTaskTypeDetailsReport = (props) => {

    const { reportPersonal } = props

    return (
        <Fragment>

            <table className="user-details-table report-table">
                <thead>
                    <tr>
                        <th>Task Type</th>
                        <th style={{ width: '12%'}}>Task</th>
                        <th style={{ width: '12%'}}>Est. Hour</th>
                        <th style={{ width: '12%'}}>Time Log</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        reportPersonal.data.taskTypeData.result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.taskType}</td>
                                <td style={{ textAlign: 'right' }}>{item.myCount}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                                <td style={{ textAlign: 'right' }}>{item.timeLog}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="1" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reportPersonal.data.totalTask}</td>
                        <td style={{ textAlign: 'right' }}>{reportPersonal.data.totalEst}</td>
                        <td style={{ textAlign: 'right' }}>{reportPersonal.data.efficiencyInfo.totalTimeLog}</td>
                    </tr>
                </tbody>

            </table>
        </Fragment>
    )
}