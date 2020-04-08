import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider, Row, Col } from 'antd';

import { _ProjectSummaryChart } from './_ProjectSummaryChart'

export const ProjectSummaryDetailsReport = (props) => {

    const { reports } = props
    return (
        <Fragment>

            <Row gutter={24} className="no-print">
                <Col span={24}>
                    
                    <div style={{ fontSize: '110%',  fontStyle: 'italic', marginBottom: '5px'}}>Date Between {reports.projectSummary.startDate} to { reports.projectSummary.endDate }</div>

                    <div style={{ fontSize: '110%', marginBottom: '-20px'}}>
                        Total Hours: <b>{ reports.projectSummary.totalEst }</b>
                        &nbsp; & Total Tasks: <b>{ reports.projectSummary.totalTask }</b>
                    </div>

                    <_ProjectSummaryChart {...props}/>
                </Col>
            </Row>

            <Divider />

            <div>
                Date Between: { reports.searchBy.startDate } to { reports.searchBy.endDate } 
            </div>
            <div>
                Project Summary Report
            </div>

            <table className="user-summary-details-table report-table">
                <thead>
                    <tr>
                        <th style={{width: '60px'}}>SL</th>
                        <th>Project Name</th>
                        <th style={{width: '200px'}}>Task</th>
                        <th style={{width: '200px'}}>Est. Hour</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        reports.projectSummary.result.map((item, index) => (
                            <tr key={index}>
                                <td>{++index}</td>
                                <td>
                                    <b> {item.projectName} : </b>
                                    { item.assignedUser.join(", ")}
                                </td>
                                <td style={{ textAlign: 'right' }}>{item.myCount}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="2" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reports.projectSummary.totalTask}</td>
                        <td style={{ textAlign: 'right' }}>{reports.projectSummary.totalEst}</td>
                    </tr>
                </tbody>

            </table>
        </Fragment>
    )
}