import React, { Component, Fragment } from 'react'
import { Form, Select, Row, Col, Divider, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Label, Cell } from "recharts"

export const ProjectSummaryChart = (props) => {

    const { adminDashboard } = props

    const data = adminDashboard.projectSummaryList

    return (
        <div>
            {
                data.length > 0 &&
                <BarChart
                    width={1000}
                    height={400}
                    data={data}
                    margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
                    layout="horizontal"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="projectName" >

                    </XAxis>

                    <YAxis>
                        <Label value="Project Name" offset={30} position="top" />
                    </YAxis>

                    <Tooltip />
                    <Legend />
                    <Bar
                        style={{ cursor: 'pointer' }}
                        dataKey="estHour"
                        fill="#8884d8"
                    >
                        <LabelList dataKey="estHour" position="top" />
                    </Bar>
                </BarChart>
            }
        </div>
    )
}