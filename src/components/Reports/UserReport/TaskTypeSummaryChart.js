import React, { Component, Fragment } from 'react'
import { Form, Select, Row, Col, Divider, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, LabelList, Text } from "recharts"

export const TaskTypeSummaryChart = (props) => {

    const { reports } = props

    const data = reports.data.taskTypeData.result

    return (
        <div>
            {
                data.length > 0 &&
                <BarChart
                    width={400}
                    height={500}
                    data={data}
                    margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
                    layout="horizontal"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    
                    <XAxis dataKey="taskType" interval={0} width={30} angle={-15}>
                    </XAxis>

                    <YAxis>
                        <Label value="Task Type" offset={30} position="top" />
                    </YAxis>


                    <Tooltip />
                    <Legend />
                    <Bar dataKey="estHour" fill="#A64CA6">
                        <LabelList dataKey="estHour" position="top" />
                        {/* <LabelList dataKey="taskType" position="bottom" /> */}
                    </Bar>
                </BarChart>
            }
        </div>
    )
}