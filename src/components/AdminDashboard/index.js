import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Form } from 'antd';

import { Chart, Axis, Legend, Tooltip, Geom, Label, Coord } from 'bizcharts';

import {
    userSummaryLoading,
    projectSummaryLoading
} from '../../actions/adminDashboardActions'

import { ProjectSummaryChart } from './ProjectSummaryChart'

const cols = {
    // estHour: { alias: '销售量' },
    // assignedUser: { alias: '游戏种类' }
};

class AdminDashboard extends Component {

    componentDidMount = async () => {
        // await console.log(localStorage.getItem('token'))
        this.props.dispatch(userSummaryLoading())
        await this.props.dispatch(projectSummaryLoading())
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
                <h1> User Summary </h1>
                <Chart
                    width={userWidth}
                    height={500}
                    data={userSummaryList}
                    scale={cols}
                    forceFit
                >
                    <Coord transpose />
                    <Axis name="assignedUser" />
                    <Axis name="estHour" />
                    <Legend position="top" dy={-20} />
                    <Tooltip />
                    {/* <Geom type="interval" position="assignedUser*estHour" color="assignedUser" /> */}
                    <Geom
                        type='interval'
                        position="assignedUser*estHour"
                        color="assignedUser"
                        animate={{
                            appear: {
                                animation: 'delayScaleInY',
                                easing: 'easeElasticOut',
                                delay: index => {
                                    return index * 10;
                                }
                            }
                        }}
                    >
                        <Label content="estHour" />
                    </Geom>
                </Chart>

                <h1> Project Summary </h1>
                <Chart
                    width={projectWidth}
                    height={450}
                    data={projectSummaryList}
                    scale={cols}
                    onClick={evt => { console.log(evt) }}
                    forceFit
                >
                    <Axis name="projectName" />
                    <Axis name="estHour" />
                    <Legend position="bottom" dy={-20} />
                    <Tooltip />
                    <Geom type="interval"
                        position="projectName*estHour"
                        color="projectName"
                    >
                        <Label content="estHour" />
                    </Geom>
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