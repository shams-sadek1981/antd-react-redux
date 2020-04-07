import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { SearchByForm } from './UserReport/SearchByForm'
import { UserDetailsReport } from './UserReport/UserDetailsReport'
import { UserSummaryDetailsReport } from './UserSummaryReport/UserSummaryDetailsReport'
import { ProjectSummaryDetailsReport } from './ProjectSummaryReport/ProjectSummaryDetailsReport'
import { TaskTypeSummaryDetailsReport } from './TaskTypeSummaryReport/TaskTypeSummaryDetailsReport'
import { SubTaskSummaryDetailsReport } from './SubTaskSummaryReport/SubTaskSummaryDetailsReport'
import { TaskDetailsReport } from './TaskStatusReport/TaskDetailsReport'

import { loadUser } from '../../actions/userActions'
import {
    searchBy,
    setDateRange,
    changeTabKey,
    searchByUserSummary,
    searchByProjectSummary,
    searchByTaskTypeSummary,
    searchBySubTaskSummary,
    reportTaskStatusByDate
} from '../../actions/reportsActions'

import { Form, Select, Row, Col, Divider, Tabs } from 'antd';

import { UserReport } from './UserReport'
import { UserSummaryReport } from './UserSummaryReport'
import { ProjectSummaryReport } from './ProjectSummaryReport'
import { TaskTypeSummaryReport } from './TaskTypeSummaryReport'
import { SubTaskSummaryReport } from './SubTaskSummaryReport'
import { TaskStatusReport } from './TaskStatusReport'

import './style.less'

const { Option } = Select;
const { TabPane } = Tabs;


class Reports extends Component {
    
    componentDidMount() {
        this.props.dispatch(loadUser())
        this.props.dispatch(setDateRange())
    }

    render() {

        const { reports, dispatch } = this.props

        return (
            <Fragment>
                <Tabs defaultActiveKey={ reports.tabKey } onChange={ (key) => dispatch( changeTabKey(key) )} className="no-print">
                    <TabPane tab="By User" key="1">
                        {
                            reports.tabKey == 1 &&
                            <UserReport { ...this.props } handleSubmit={this.handleSubmit}/>
                        }
                    </TabPane>

                    <TabPane tab="User Summary" key="2">
                        {
                            reports.tabKey == 2 && 
                            <UserSummaryReport { ...this.props } />
                        }
                    </TabPane>

                    <TabPane tab="Project Summary" key="3">
                        {
                            reports.tabKey == 3 && 
                            <ProjectSummaryReport { ...this.props } handleSubmit={this.handleSubmit}/>
                        }
                    </TabPane>

                    <TabPane tab="Task Type Summary" key="4">
                        {
                            reports.tabKey == 4 && 
                            <TaskTypeSummaryReport { ...this.props } handleSubmit={this.handleSubmit}/>
                        }
                    </TabPane>
                    
                    <TabPane tab="SubTask Summary" key="5">
                        {
                            reports.tabKey == 5 && 
                            <SubTaskSummaryReport { ...this.props } handleSubmit={this.handleSubmit}/>
                        }
                    </TabPane>

                    <TabPane tab="Task Status" key="6">
                        {
                            reports.tabKey == 6 &&
                            <TaskStatusReport { ...this.props }/>
                        }
                    </TabPane>
                    
                
                </Tabs>


                { /* -------- Printing Section --------- */ }
                <div className="print-me">
                    { reports.tabKey == 1 && <UserDetailsReport {...this.props} /> }
                    { reports.tabKey == 2 && <UserSummaryDetailsReport {...this.props} /> }
                    { reports.tabKey == 3 && <ProjectSummaryDetailsReport {...this.props} /> }
                    { reports.tabKey == 4 && <TaskTypeSummaryDetailsReport {...this.props} /> }
                    { reports.tabKey == 5 && <SubTaskSummaryDetailsReport {...this.props} /> }
                    { reports.tabKey == 6 && <TaskDetailsReport {...this.props} /> }
                </div>

            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    reports: state.reportsReducer,
    users: state.userReducer,
    projects: state.projectReducer
})

const WrappedComponent = Form.create({ name: 'Reports' })(Reports);

export default withRouter(connect(mapStateToProps)(WrappedComponent))