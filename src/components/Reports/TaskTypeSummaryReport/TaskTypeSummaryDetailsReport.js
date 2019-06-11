import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider } from 'antd';

import { _TaskTypeSummaryChart } from './_TaskTypeSummaryChart'

export const TaskTypeSummaryDetailsReport = (props) => {

    const { reports } = props
    return (
        <Fragment>

            <div className="no-print">
                <_TaskTypeSummaryChart {...props}/>
            </div>
    
            <Divider />

            <div>
                Date Between: { reports.searchBy.startDate } to { reports.searchBy.endDate } 
            </div>
            <div>
                Task Type Summary Report
            </div>

            <table className="user-summary-details-table report-table">
                <thead>
                    <tr>
                        <th>Task Type</th>
                        <th>Est. Hour</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        reports.taskTypeSummary.result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.taskType}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="1" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reports.taskTypeSummary.totalEst}</td>
                    </tr>
                </tbody>

            </table>
        </Fragment>
    )
}