import React, { Component, Fragment } from 'react'
import { Form, Select, Row, Col, Divider, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Label } from "recharts"

export const _ProjectSummaryChart = (props) => {

    const { reports } = props

    const data = adminDashboard.projectSummaryList

    return (
        <div>
            {
                data.length > 0 &&
                <BarChart
                    width={1000}
                    height={600}
                    data={data}
                    margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="projectName" type="category" width={150}>
                        <Label value="Project Name" offset={0} position="top" />
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="estHour" fill="#8884d8" >
                        <LabelList dataKey="estHour" position="right" />
                    </Bar>
                </BarChart>
            }
        </div>
    )
}