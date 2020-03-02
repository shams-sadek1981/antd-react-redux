import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider, Row, Col } from 'antd';

import { UserProjectDetailsReport } from './UserProjectDetailsReport'
import { UserTaskTypeDetailsReport } from './UserTaskTypeDetailsReport'
import { UserSubTaskDetailsReport } from './UserSubTaskDetailsReport'

import { ProjectSummaryChart } from './ProjectSummaryChart'
import { TaskTypeSummaryChart } from './TaskTypeSummaryChart'
import { SubTaskSummaryChart } from './SubTaskSummaryChart'

export const UserDetailsReport = (props) => {

    const { reports } = props
    return (
        <Fragment>

            <div>
                {
                    (reports.data.result.length > 0) &&
                    <div>
                        <strong style={{ fontSize: '16pt' }}>{reports.searchBy.name}</strong>
                        <span style={{ marginLeft: '10px'}}>
                            Total: <b style={{ fontSize: '110%'}}>{reports.data.totalEst}</b> Hours
                        </span>
                    </div>
                }
            </div>

            <Row gutter={24} className="no-print">
                <Col span={8}>
                    <ProjectSummaryChart {...props} />
                </Col>

                <Col span={8}>
                    <TaskTypeSummaryChart {...props} />
                </Col>

                <Col span={8}>
                    <SubTaskSummaryChart {...props} />
                </Col>
            </Row>

            <Divider />

            <div style={{ fontSize: '16pt' }}>
                <strong>
                    {
                        (reports.searchBy.name != 'all') &&
                        reports.searchBy.name
                    }
                </strong>
            </div>

            <div>
                Date Between: {reports.searchBy.startDate} to {reports.searchBy.endDate}
            </div>

            <table className="user-details-table report-table">
                <thead>
                    <tr style={{ background: "#eee", textAlign: 'center' }}>
                        <th style={{ width: "120px" }}>Completed At</th>
                        <th>Task Name</th>
                        <th>Subtask</th>
                        <th style={{ width: "100px" }}>Project</th>
                        <th style={{ width: "120px" }}>Task Type</th>
                        <th style={{ width: '70px' }}>Hour</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        reports.data.result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.completedAt}</td>
                                <td>{item.taskName}</td>
                                <td>
                                    {item.subTask}
                                    {item.subTaskDescription &&
                                        " - " + item.subTaskDescription
                                    }
                                </td>
                                <td>{item.projectName}</td>
                                <td>{item.taskType}</td>
                                <td style={{ textAlign: 'right' }}>{item.estHour}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="5" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{reports.data.totalEst}</td>
                    </tr>
                </tbody>
            </table>


            {/* ------------ Project Details by user ------------- */}
            <Divider />
            <UserProjectDetailsReport {...props} />


            {/* ------------ Task Type Details by user ------------- */}
            <Divider />
            <UserTaskTypeDetailsReport {...props} />

            {/* ------------ SubTask Details by user ------------- */}
            <Divider />
            <UserSubTaskDetailsReport {...props} />

        </Fragment>
    )
}