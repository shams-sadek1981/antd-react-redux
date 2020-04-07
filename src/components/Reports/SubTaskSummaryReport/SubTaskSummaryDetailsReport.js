import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider, Row, Col } from 'antd';

import { SubTaskSummaryChart } from './SubTaskSummaryChart'

export const SubTaskSummaryDetailsReport = (props) => {

    const { reports } = props
    return (
        <Fragment>

            <Row gutter={24} className="no-print">
                <Col span={24}>
                    <SubTaskSummaryChart {...props}/>
                </Col>
            </Row>

            <Divider />

            <div>
                Date Between: { reports.searchBy.startDate } to { reports.searchBy.endDate } 
            </div>
            <div>
                SubTask Summary Report
            </div>

            <table className="user-summary-details-table report-table">
                <thead>
                    <tr>
                        <th style={{width: '60px'}}>SL</th>
                        <th>SubTask Name</th>
                        <th style={{ width: '250px'}}>Task</th>
                        <th style={{ width: '250px'}}>Est. Hour</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        reports.subTaskSummary.result.map((item, index) => (
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>{item.subTask}</td>
                                <td style={{ textAlign: 'right' }}>{item.myCount}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="2" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reports.subTaskSummary.totalTask}</td>
                        <td style={{ textAlign: 'right' }}>{reports.subTaskSummary.totalEst}</td>
                    </tr>
                </tbody>

            </table>
        </Fragment>
    )
}