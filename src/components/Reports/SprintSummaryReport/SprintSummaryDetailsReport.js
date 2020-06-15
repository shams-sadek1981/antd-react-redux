import React, { Fragment } from 'react'
import moment from 'moment'
import { Select, Form, DatePicker, Button, Divider, Row, Col, Checkbox } from 'antd';

import { SprintSummaryChart } from './SprintSummaryChart'
import { SprintBarchartOptionToggle } from '../../../actions/reportsActions';

export const SprintSummaryDetailsReport = (props) => {

    const { reports, dispatch } = props
    return (
        <Fragment>

            <Row gutter={24} className="no-print">
                <Col span={24}>

                    <div style={{ marginBottom: '15px' }}>
                        <h4>Check for barchart</h4>
                        <Checkbox
                            checked={reports.sprintSummary.chartBy.efficiency}
                            onChange={e => dispatch(SprintBarchartOptionToggle('efficiency', e.target.checked))}
                        >
                            Efficiency
                        </Checkbox>

                        <Checkbox
                            checked={reports.sprintSummary.chartBy.estHour}
                            onChange={e => dispatch(SprintBarchartOptionToggle('estHour', e.target.checked))}
                        >
                            Est. Hour
                        </Checkbox>

                        <Checkbox
                            checked={reports.sprintSummary.chartBy.taskCount}
                            onChange={e => dispatch(SprintBarchartOptionToggle('taskCount', e.target.checked))}
                        >
                            Task
                        </Checkbox>

                        <Checkbox
                            checked={reports.sprintSummary.chartBy.timeLog}
                            onChange={e => dispatch(SprintBarchartOptionToggle('timeLog', e.target.checked))}
                        >
                            Time Log
                        </Checkbox>

                        <Checkbox
                            checked={reports.sprintSummary.chartBy.progress}
                            onChange={e => dispatch(SprintBarchartOptionToggle('progress', e.target.checked))}
                        >
                            Progress
                        </Checkbox>

                    </div>

                    <div style={{ fontSize: '110%', fontStyle: 'italic', marginBottom: '5px' }}>Date Between {reports.searchBy.startDate} to {reports.searchBy.endDate}</div>

                    <div style={{ fontSize: '110%' }}>
                        Total Hours: <b>{reports.sprintSummary.summary.est}</b>
                        &nbsp; & Total Tasks: <b>{reports.sprintSummary.summary.totalTask}</b>
                    </div>

                    <div style={{ marginBottom: '-20px', marginTop: '5px' }}>
                        {Array.isArray(reports.sprintSummary.sprintData) &&
                            <h3>
                                {reports.sprintSummary.sprintData.map(r => r.name).join(', ')}
                            </h3>
                        }
                        {!Array.isArray(reports.subTaskSummary.project) &&
                            <h3>
                                {reports.subTaskSummary.project}
                            </h3>
                        }
                    </div>

                    <SprintSummaryChart {...props} />
                </Col>
            </Row>
        </Fragment>
    )
}