import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider } from 'antd';

import { _UserSummaryChart } from './_UserSummaryChart'
export const UserSummaryDetailsReport = (props) => {

    const { reports } = props
    return (
        <Fragment>

            <div className="no-print">
                <div style={{ fontSize: '110%', fontStyle: 'italic', marginBottom: '5px' }}>Date Between {reports.searchBy.startDate} to {reports.searchBy.endDate}</div>

                <div style={{ fontSize: '110%' }}>
                    Total Hours: <b>{reports.userSummary.totalEst}</b>
                    &nbsp; & Total Tasks: <b>{reports.userSummary.totalTask}</b>
                </div>

                <div style={{ marginBottom: '-20px', marginTop: '5px'}}>
                    {reports.userSummary.project &&
                        <h3>
                            { reports.userSummary.project.map( item => item + ', ') }
                        </h3>
                    }
                </div>
                <_UserSummaryChart {...props} />
            </div>

            <Divider />

            <div>
                Date Between: {reports.searchBy.startDate} to {reports.searchBy.endDate}
            </div>
            <div>
                User Summary Report
            </div>

            <table className="user-summary-details-table report-table">
                <thead>
                    <tr>
                        <th style={{ width: '60px' }}>SL</th>
                        <th>User Name</th>
                        <th>Task</th>
                        <th>Est. Hour</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        reports.userSummary.result.map((item, index) => (
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{item.userName}</td>
                                <td style={{ textAlign: 'right' }}>{item.myCount}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="2" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reports.userSummary.totalTask}</td>
                        <td style={{ textAlign: 'right' }}>{reports.userSummary.totalEst}</td>
                    </tr>
                </tbody>

            </table>
        </Fragment>
    )
}