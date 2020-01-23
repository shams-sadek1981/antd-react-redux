import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider, Row, Col } from 'antd';

export const PersonalReport = (props) => {

    const { item } = props

    return (
        <Fragment>

            <div>
                <h1>{ item.userName }</h1>
                <h3>Senior Software Engineer</h3>
            </div>

            {/* Assessment Criteria */}
            <table className="user-details-table report-table" style={{ marginBottom: "50px"}}>
                <tbody>
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center'}}>Assessment Criteria</td>
                    </tr>

                    <tr>
                        <td>Learning Curve</td>
                        <td>Personality Curve</td>
                        <td>Performance Curve</td>
                        <td>Total Achieve Points</td>
                        <td style={{ background: 'silver'}}>Badge</td>
                    </tr>

                    <tr>
                        <td>20</td>
                        <td>30</td>
                        <td>50</td>
                        <td>100</td>
                        <td rowSpan="2">{ item.badge }</td>
                    </tr>

                    <tr>
                        <td>{ item.learningCurve}</td>
                        <td>{ item.personalityCurve}</td>
                        <td>{ item.performanceCurve}</td>
                        <td>{ item.total}</td>
                    </tr>
                </tbody>
            </table>


            {/* Performance Curve */}
            <table className="user-details-table report-table" style={{ marginBottom: "50px"}}>
                <tbody>
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'center'}}>Performance Curve (50%)</td>
                    </tr>

                    <tr>
                        <td>Meatup Deadline</td>
                        <td>Quality of Work</td>
                        <td>Extra Responsibility</td>
                        <td>Innovative Contribution</td>
                        <td>Customer Happiness</td>
                        <td>Preserving Data & Documentation of</td>
                        <td>Productivity</td>
                    </tr>

                    <tr>
                        <td>10</td>
                        <td>10</td>
                        <td>5</td>
                        <td>5</td>
                        <td>5</td>
                        <td>5</td>
                        <td>10</td>
                    </tr>

                    <tr>
                        <td>{ item.meatupDeadline}</td>
                        <td>{ item.qualityOfWork}</td>
                        <td>{ item.extraResponsibility}</td>
                        <td>{ item.innovativeContribution}</td>
                        <td>{ item.customerHappiness}</td>
                        <td>{ item.preservingData}</td>
                        <td>{ item.productivity}</td>
                    </tr>
                </tbody>
            </table>


            {/* Personality Curve */}
            <table className="user-details-table report-table" style={{ marginBottom: "100px"}}>
                <tbody>
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center'}}>Performance Curve (30%)</td>
                        <td colSpan="2" style={{ textAlign: 'center'}}>Learning Curve (20%)</td>
                    </tr>

                    <tr>
                        <td>Meatup Deadline</td>
                        <td>Quality of Work</td>
                        <td>Extra Responsibility</td>
                        <td>Innovative Contribution</td>
                        <td>Customer Happiness</td>
                        <td>Knowledge Sharing</td>
                        <td>Domain Knowledge</td>
                    </tr>

                    <tr>
                        <td>10</td>
                        <td>10</td>
                        <td>5</td>
                        <td>5</td>
                        <td>5</td>
                        <td>5</td>
                        <td>10</td>
                    </tr>

                    <tr>
                        <td>{ item.meatupDeadline}</td>
                        <td>{ item.qualityOfWork}</td>
                        <td>{ item.extraResponsibility}</td>
                        <td>{ item.innovativeContribution}</td>
                        <td>{ item.customerHappiness}</td>
                        <td>{ item.preservingData}</td>
                        <td>{ item.productivity}</td>
                    </tr>
                </tbody>
            </table>

        </Fragment>
    )
}