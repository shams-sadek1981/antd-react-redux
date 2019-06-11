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

    handleSubmit = (e, tabKeyNo) => {
        e.preventDefault();
        
        const values = this.props.form.getFieldsValue()

        switch ( tabKeyNo ) {
            case "1": //-- search by user
                this.props.dispatch(searchBy(values))
                break;

            case "2": //-- user summary
                this.props.dispatch(searchByUserSummary(values))
                break;

            case "3": //-- project summary
                this.props.dispatch(searchByProjectSummary(values))
                break;

            case "4": //-- task type summary
                this.props.dispatch(searchByTaskTypeSummary(values))
                break;
        }
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
                            <UserSummaryReport { ...this.props } handleSubmit={this.handleSubmit}/>
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