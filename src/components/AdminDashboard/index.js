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

// import React from "react";
// import {
//   G2,
//   Chart,
//   Geom,
//   Axis,
//   Tooltip,
//   Coord,
//   Label,
//   Legend,
//   View,
//   Guide,
//   Shape,
//   Facet,
//   Util
// } from "bizcharts";

// class Pieranged extends React.Component {
//   render() {
//     const data = [
//       {
//         type: "分类一",
//         value: 27
//       },
//       {
//         type: "分类二",
//         value: 25
//       },
//       {
//         type: "分类三",
//         value: 18
//       },
//       {
//         type: "分类四",
//         value: 15
//       },
//       {
//         type: "分类五",
//         value: 10
//       },
//       {
//         type: "Other",
//         value: 5
//       }
//     ];

//     class SliderChart extends React.Component {
//       render() {
//         return (
//           <Chart
//             height={window.innerHeight}
//             data={data}
//             forceFit
//             padding={[40, 0]}
//           >
//             <Coord
//               type="theta"
//               startAngle={Math.PI}
//               endAngle={Math.PI * (3 / 2)}
//             />
//             <Tooltip />
//             <Geom type="intervalStack" position="value" color="type">
//               <Label content="type" />
//             </Geom>
//           </Chart>
//         );
//       }
//     }
//     return (
//       <div>
//         <SliderChart />
//       </div>
//     );
//   }
// }

// export default Pieranged;