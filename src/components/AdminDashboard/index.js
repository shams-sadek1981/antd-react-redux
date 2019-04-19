import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Form } from 'antd';

import { Chart, Axis, Legend, Tooltip, Geom } from 'bizcharts';

import {
    userSummaryLoading,
    projectSummaryLoading
} from '../../actions/adminDashboardActions'

const cols = {
    estHour: { alias: '销售量' },
    assignedUser: { alias: '游戏种类' }
};

class AdminDashboard extends Component {

    componentDidMount = () => {
        this.props.dispatch(userSummaryLoading())
        this.props.dispatch(projectSummaryLoading())
    }

    render() {

        const { userSummaryList, projectSummaryList } = this.props.adminDashboard

        const projectWidth = projectSummaryList.length * 120
        const userWidth = userSummaryList.length * 100


        return (
            <div>
                <h1> Project Summary </h1>
                <Chart width={projectWidth} height={400} data={projectSummaryList} scale={cols}>
                    <Axis name="projectName" />
                    <Axis name="estHour" />
                    <Legend position="top" dy={-20} />
                    <Tooltip />
                    <Geom type="interval" position="projectName*estHour" color="projectName" />
                </Chart>
                

                <h1> User Summary </h1>
                <Chart width={userWidth} height={400} data={userSummaryList} scale={cols}>
                    <Axis name="assignedUser" />
                    <Axis name="estHour" />
                    <Legend position="top" dy={-20} />
                    <Tooltip />
                    <Geom type="interval" position="assignedUser*estHour" color="assignedUser" />
                </Chart>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    adminDashboard: state.adminDashboardReducer,
})

const WrappedComponent = Form.create({ name: 'admin-dashboard' })(AdminDashboard);

export default withRouter(connect(mapStateToProps)(WrappedComponent));
