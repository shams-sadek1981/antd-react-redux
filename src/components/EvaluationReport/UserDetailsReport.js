import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider, Row, Col } from 'antd';

import { PersonalReport } from './PersonalReport'

export const UserDetailsReport = (props) => {

    const { evaluationReducer, users } = props

    return (
        <Fragment>

            { evaluationReducer.evaluationResult.map((item, index) => <PersonalReport item={item}/>) }

            <div>
                Date Between: { moment(evaluationReducer.searchBy.startDate).format("DD-MMM-YYYY") }
                To
                { moment(evaluationReducer.searchBy.endDate).format("DD-MMM-YYYY") }
            </div>

            <table className="user-details-table report-table">
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>User Name</th>
                        <th>Learning Curve</th>
                        <th>Personality Curve</th>
                        <th>Performance Curve</th>
                        <th>Badge</th>
                        <th>Meatup Deadline</th>
                        <th>Quality of Work</th>
                        <th>Extra Responsibility</th>
                        <th>Innovative Contribution</th>
                        <th>Customer Happiness</th>
                        <th>Preserving Data</th>
                        <th>Productivity</th>
                        <th>Organizational Behaviour</th>
                        <th>Standup Attendance</th>
                        <th>Avg WorkingHour</th>
                        <th>helpsColleague</th>
                        <td>Community Engagement</td>
                        <td>Knowledge Sharing</td>
                        <td>Domain Knowledge</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        evaluationReducer.evaluationResult.map((item, index) => (
                            <tr key={index}>
                                <td>{ ++index}</td>
                                <td>{ item.userName}</td>
                                <td>{ item.learningCurve}</td>
                                <td>{ item.personalityCurve}</td>
                                <td>{ item.performanceCurve}</td>
                                <td>{ item.badge}</td>
                                <td>{ item.meatupDeadline}</td>
                                <td>{ item.qualityOfWork}</td>
                                <td>{ item.extraResponsibility}</td>
                                <td>{ item.innovativeContribution}</td>
                                <td>{ item.customerHappiness}</td>
                                <td>{ item.preservingData}</td>
                                <td>{ item.productivity}</td>
                                <td>{ item.organizationBehavior}</td>
                                <td>{ item.standupAttendance}</td>
                                <td>{ item.avgWorkingHour}</td>
                                <td>{ item.helpsColleague}</td>
                                <td>{ item.communityEngagement}</td>
                                <td>{ item.knowledgeSharing}</td>
                                <td>{ item.domainKnowledge}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            
            
        </Fragment>
    )
}