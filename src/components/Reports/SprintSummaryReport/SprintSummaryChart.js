import React, { Component, Fragment } from 'react'
import { Form, Select, Row, Col, Divider, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Label } from "recharts"


export const SprintSummaryChart = (props) => {

    const { reports } = props

    const sprintSummary = reports.sprintSummary

    return (
        <div>
            {
                ('userDetails' in sprintSummary.summary) &&
                <BarChart
                    width={1300}
                    height={650}
                    data={sprintSummary.summary.userDetails}
                    margin={{ top: 40, right: 30, left: 20, bottom: 5 }}
                    layout="horizontal"
                >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="userName"
                        interval={0}
                        width={30}
                        height={90}
                        angle={-45}
                        textAnchor="end"
                    />

                    <YAxis type="number" domain={[0, 'dataMax + 7']}
                        dataKey={(v)=> {

                            if ( v.estHour < 100 ) return 100

                            return parseInt(v.estHour)
                        }}
                    >
                        <Label value="Sprint Report" offset={30} position="top" />
                    </YAxis>

                    <Tooltip />

                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />


                    {/* ------------------ Est. Hour --------------- */}
                    {
                        reports.sprintSummary.chartBy.estHour &&
                        <Bar
                            style={{ cursor: 'pointer' }}
                            dataKey="estHour" fill="#D2691E"
                            name="Est. Hour"
                            onClick={(e) => console.log(e.estHour)}
                        >
                            <LabelList dataKey="estHour" position="top" />
                        </Bar>
                    }


                    {/* ------------------ Time Log --------------- */}
                    {
                        reports.sprintSummary.chartBy.timeLog &&
                        <Bar
                            style={{ cursor: 'pointer' }}
                            dataKey="timeLog" fill="#DEB887"
                            name="Time Log"
                            onClick={(e) => console.log(e.timeLog)}
                        >
                            <LabelList dataKey="timeLog" position="top" />
                        </Bar>
                    }


                    {/* Task Count */}
                    {
                        reports.sprintSummary.chartBy.taskCount &&
                        <Bar
                            style={{ cursor: 'pointer' }}
                            dataKey="taskCount" fill="#DC143C"
                            name="Task"
                            onClick={(e) => console.log(e.taskCount)}
                        >
                            <LabelList dataKey="taskCount" position="top" />
                        </Bar>
                    }


                    {/* ----------- Efficiency --------------- */}
                    {
                        reports.sprintSummary.chartBy.efficiency &&
                        <Bar
                            style={{ cursor: 'pointer' }}
                            dataKey="efficiency" fill="#7FFF00"
                            name="Efficiency"
                            onClick={(e) => console.log(e.efficiency)}
                        >
                            <LabelList dataKey="efficiency" position="top" />
                        </Bar>
                    }


                    {/* Progress */}
                    {
                        reports.sprintSummary.chartBy.progress &&
                        <Bar
                            style={{ cursor: 'pointer' }}
                            dataKey="percent" fill="#6495ED"
                            name="Progress"
                            onClick={(e) => console.log(e.percent)}
                        >
                            <LabelList dataKey="percent" position="top" />
                        </Bar>
                    }

                </BarChart>
            }
        </div>
    )
}