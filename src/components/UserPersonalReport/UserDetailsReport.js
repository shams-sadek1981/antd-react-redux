import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider, Row, Col, Tag } from 'antd';

import { UserProjectDetailsReport } from './UserProjectDetailsReport'
import { UserTaskTypeDetailsReport } from './UserTaskTypeDetailsReport'
import { UserSubTaskDetailsReport } from './UserSubTaskDetailsReport'

import { ProjectSummaryChart } from './ProjectSummaryChart'
import { TaskTypeSummaryChart } from './TaskTypeSummaryChart'
import { SubTaskSummaryChart } from './SubTaskSummaryChart'

export const UserDetailsReport = (props) => {

    const { reportPersonal, users } = props

    return (
        <Fragment>

            <div>
                {
                    (reportPersonal.data.result.length > 0) &&
                    <div>
                        <span style={{ fontSize: '16pt', paddingRight: '10px' }}><b>{users.userInfo.name}</b></span>
                        <span>
                            &nbsp; From <i style={{ fontSize: '110%' }}>{reportPersonal.data.startDate}</i>
                            &nbsp; To <i style={{ fontSize: '110%' }}>{reportPersonal.data.endDate}</i>
                        </span>

                        <div style={{ marginTop: '10px' }}>
                            
                            <Tag color="volcano" style={{fontSize: '103%' }}>
                                <b style={{ fontSize: '107%' }}>{reportPersonal.data.totalTask}</b> Tasks
                            </Tag>

                            <Tag color="magenta" style={{ fontSize: '103%' }}>
                                Est. <b style={{ fontSize: '107%' }}>{reportPersonal.data.totalEst}</b> Hours
                            </Tag>

                            <Tag color="geekblue" style={{ fontSize: '103%' }}>
                                Timelog: <b style={{ fontSize: '107%' }}>{reportPersonal.data.efficiencyInfo.totalTimeLog}</b> Hours
                                by <b>{reportPersonal.data.efficiencyInfo.totalTaskWithTimeLog}</b> Tasks
                            </Tag>


                            {/* ---------------- Efficiency > 50% --------------- */}
                            {
                                reportPersonal.data.efficiencyInfo.efficiency > 50 &&
                                <Tag color="#87d068" style={{ fontSize: '103%' }}>
                                    Efficiency: <b style={{ fontSize: '107%' }}>{reportPersonal.data.efficiencyInfo.efficiency}</b>%
                                </Tag>
                            }

                            {/* ---------------- Efficiency < 50% --------------- */}
                            {
                                reportPersonal.data.efficiencyInfo.efficiency < 51 &&
                                <Tag color="#f50" style={{ fontSize: '103%' }}>
                                    Efficiency: <b style={{ fontSize: '107%' }}>{reportPersonal.data.efficiencyInfo.efficiency}</b>%
                                </Tag>
                            }

                            <Tag color="purple" style={{ fontSize: '103%' }}>
                                Avg. Hour Per Task: <span style={{ fontWeight: 'bold' }}>{reportPersonal.data.avgTaskHour}</span>
                            </Tag>

                            <Tag color="blue" style={{ fontSize: '103%' }}>
                                Avg. Hour Per Day: <span style={{ fontWeight: 'bold' }}>{reportPersonal.data.avgHourPerDay}</span>
                            </Tag>

                            <Tag color="purple" style={{ fontSize: '103%' }}>
                                Avg. Task Per Day: <span style={{ fontWeight: 'bold' }}>{reportPersonal.data.avgTaskPerDay}</span>
                            </Tag>

                        </div>

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

            <div>
                Date Between: {reportPersonal.searchBy.startDate} to {reportPersonal.searchBy.endDate}
            </div>
            <div>
                User Name: <strong>{users.userInfo.name}</strong>
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
                        <th style={{ width: '70px' }}>Log</th>
                    </tr>
                </thead>

                <tbody>

                    {
                        reportPersonal.data.result.map((item, index) => (
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
                                <td style={{ textAlign: 'right' }}>{item.timeLog}</td>
                            </tr>
                        ))
                    }

                    <tr>
                        <td colSpan="5" style={{ textAlign: 'right' }}>Total = </td>
                        <td style={{ textAlign: 'right' }}>{reportPersonal.data.totalEst}</td>
                        <td style={{ textAlign: 'right' }}>{reportPersonal.data.efficiencyInfo.totalTimeLog}</td>
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