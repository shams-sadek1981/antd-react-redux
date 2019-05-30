import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Form } from 'antd';

import { Chart, Axis, Legend, Tooltip, Geom, Label } from 'bizcharts';

import {
    userSummaryLoading,
    projectSummaryLoading
} from '../../actions/adminDashboardActions'

const cols = {
    // estHour: { alias: '销售量' },
    // assignedUser: { alias: '游戏种类' }
};

class AdminDashboard extends Component {

    componentDidMount = () => {
        this.props.dispatch(userSummaryLoading())
        this.props.dispatch(projectSummaryLoading())
    }

    render() {

        const { userSummaryList, projectSummaryList } = this.props.adminDashboard

        let projectWidth = projectSummaryList.length * 120
        if (projectSummaryList.length < 2) {
            projectWidth = 200
        }


        let userWidth = userSummaryList.length * 100
        if (userSummaryList.length < 2) {
            userWidth = 200
        }

        console.log('userSummaryList', userSummaryList)

        return (
            <div>
                <h1> Project Summary </h1>
                <Chart
                    width={projectWidth}
                    height={400}
                    data={projectSummaryList}
                    scale={cols}
                >
                    {/* <Axis name="projectName" /> */}
                    <Axis name="estHour"/>
                    <Legend position="top" dy={-20} />
                    <Tooltip />
                    <Geom type="interval" position="projectName*estHour" color="projectName"/>
                </Chart>

                <h1> User Summary </h1>
                <Chart width={userWidth} height={400} data={userSummaryList} scale={cols}>
                    <Axis name="assignedUser" />
                    <Axis name="estHour" />
                    <Legend position="top" dy={-20} />
                    <Tooltip />
                    {/* <Geom type="interval" position="assignedUser*estHour" color="assignedUser" /> */}
                    <Geom type='interval'
                        type="interval" position="assignedUser*estHour" color="assignedUser"
                        animate={{
                            appear: {
                                animation: 'delayScaleInY',
                                easing: 'easeElasticOut',
                                delay: index => {
                                    return index * 10;
                                }
                            }
                        }}
                    />
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
