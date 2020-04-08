import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

export const UserSubTaskDetailsReport = (props) => {

    const { reportPersonal } = props

    return (
        <Fragment>

            <table className="user-details-table report-table">
                <thead>
                    <tr>
                        <th>SubTask</th>
                        <th style={{ width: '12%'}}>Task</th>
                        <th style={{ width: '12%'}}>Est. Hour</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        reportPersonal.data.subTaskData.result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.subTask}</td>
                                <td style={{ textAlign: 'right' }}>{item.myCount}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="1" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reportPersonal.data.totalTask}</td>
                        <td style={{ textAlign: 'right' }}>{reportPersonal.data.totalEst}</td>
                    </tr>
                </tbody>

            </table>
        </Fragment>
    )
}