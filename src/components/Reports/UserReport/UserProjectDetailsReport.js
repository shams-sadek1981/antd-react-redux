import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';

export const UserProjectDetailsReport = (props) => {

    const { reports } = props

    return (
        <Fragment>

            <table className="user-details-table report-table">
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th style={{ width: '12%'}}>Est. Hour</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        reports.data.projectData.result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.projectName}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="1" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reports.data.totalEst}</td>
                    </tr>
                </tbody>

            </table>
        </Fragment>
    )
}