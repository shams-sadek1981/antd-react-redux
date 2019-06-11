import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { SearchByForm } from './UserReport/SearchByForm'
import { UserDetailsReport } from './UserReport/UserDetailsReport'
import { UserSummaryDetailsReport } from './UserSummaryReport/UserSummaryDetailsReport'
import { ProjectSummaryDetailsReport } from './ProjectSummaryReport/ProjectSummaryDetailsReport'
import { TaskTypeSummaryDetailsReport } from './TaskTypeSummaryReport/TaskTypeSummaryDetailsReport'

import { loadUser } from '../../actions/userActions'
import {
    searchBy,
    changeTabKey,
    searchByUserSummary,
    searchByProjectSummary,
    searchByTaskTypeSummary,
} from '../../actions/reportsActions'

import { Form, Select, Row, Col, Divider, Tabs } from 'antd';

import { UserReport } from './UserReport'
import { UserSummaryReport } from './UserSummaryReport'
import { ProjectSummaryReport } from './ProjectSummaryReport'
import { TaskTypeSummaryReport } from './TaskTypeSummaryReport'

import './style.less'

const { Option } = Select;
const { TabPane } = Tabs;



class Reports extends Component {

    componentDidMount() {
        this.props.dispatch(loadUser())
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.props.dispatch(searchBy(values))
            }
        });
    };
    
    handleSubmitUserSummary = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.props.dispatch(searchByUserSummary(values))
            }
        });
    };

    handleSubmitProjectSummary = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.props.dispatch(searchByProjectSummary(values))
            }
        });
    };

    handleSubmitTaskTypeSummary = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.props.dispatch(searchByTaskTypeSummary(values))
            }
        });
    };

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
                            <UserSummaryReport { ...this.props } handleSubmit={this.handleSubmitUserSummary}/>
                        }
                    </TabPane>

                    <TabPane tab="Project Summary" key="3">
                        {
                            reports.tabKey == 3 && 
                            <ProjectSummaryReport { ...this.props } handleSubmit={this.handleSubmitProjectSummary}/>
                        }
                    </TabPane>

                    <TabPane tab="Task Type Summary" key="4">
                        {
                            reports.tabKey == 4 && 
                            <TaskTypeSummaryReport { ...this.props } handleSubmit={this.handleSubmitTaskTypeSummary}/>
                        }
                    </TabPane>
                    
                
                </Tabs>


                { /* -------- Printing Section --------- */ }
                <div className="print-me">
                    { reports.tabKey == 1 && <UserDetailsReport {...this.props} /> }
                    { reports.tabKey == 2 && <UserSummaryDetailsReport {...this.props} /> }
                    { reports.tabKey == 3 && <ProjectSummaryDetailsReport {...this.props} /> }
                    { reports.tabKey == 4 && <TaskTypeSummaryDetailsReport {...this.props} /> }
                </div>

            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    reports: state.reportsReducer,
    users: state.userReducer,
})

const WrappedComponent = Form.create({ name: 'Reports' })(Reports);

export default withRouter(connect(mapStateToProps)(WrappedComponent))