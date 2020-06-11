import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

export const UserSubTaskDetailsReport = (props) => {

    const { reports } = props

    return (
        <Fragment>

            <table className="user-details-table report-table">
                <thead>
                    <tr style={{ background: "#eee"}}>
                        <th>SubTask</th>
                        <th style={{ width: '12%'}}>Task</th>
                        <th style={{ width: '12%'}}>Est. Hour</th>
                        <th style={{ width: '12%'}}>Time Log</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        reports.data.subTaskData.result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.subTask}</td>
                                <td style={{ textAlign: 'right' }}>{item.myCount}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                                <td style={{ textAlign: 'right' }}>{item.timeLog}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="1" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reports.data.totalTask}</td>
                        <td style={{ textAlign: 'right' }}>{reports.data.totalEst}</td>
                        <td style={{ textAlign: 'right' }}>{reports.data.efficiencyInfo.totalTimeLog}</td>
                    </tr>
                </tbody>

            </table>
        </Fragment>
    )
}