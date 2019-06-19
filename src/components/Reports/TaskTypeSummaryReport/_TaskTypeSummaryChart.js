import React, { Component, Fragment } from 'react'
import { Form, Select, Row, Col, Divider, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, LabelList } from "recharts"

export const _TaskTypeSummaryChart = (props) => {

    const { reports } = props

    const data = reports.taskTypeSummary.result

    return (
        <div>
            {
                data.length > 0 &&
                <BarChart
                    width={1000}
                    height={600}
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />   
                    
                    <YAxis dataKey="taskType" type="category" width={150}>
                        <Label value="Task Type" offset={0} position="top" />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="estHour" fill="#A64CA6">
                        <LabelList dataKey="estHour" position="right" />
                    </Bar>
                </BarChart>
            }
        </div>
    )
}