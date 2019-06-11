import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button } from 'antd';



export const UserDetailsReport = (props) => {

    const { reports } = props
    return (
        <Fragment>
            <div>
                Date Between: { reports.searchBy.startDate } to { reports.searchBy.endDate } 
            </div>
            <div>
                User Name: <strong>{ reports.searchBy.name }</strong>
            </div>

            <table className="user-details-table report-table">
                <thead>
                    <tr>
                        <th>Completed At</th>
                        <th>Task Name</th>
                        <th>Subtask</th>
                        <th>Project Name</th>
                        <th>Task Type</th>
                        <th>Est. Hour</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        reports.data.result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.completedAt}</td>
                                <td>{item.taskName}</td>
                                <td>{item.subTask}</td>
                                <td>{item.projectName}</td>
                                <td>{item.taskType}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="5" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reports.data.totalEst}</td>
                    </tr>
                </tbody>

            </table>
        </Fragment>
    )
}