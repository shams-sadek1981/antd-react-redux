import React, { Component, Fragment } from 'react'
import { Form, Select, Row, Col, Divider, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList, Label } from "recharts"

export const SubTaskSummaryChart = (props) => {

    const { reportPersonal } = props

    const data = reportPersonal.data.subTaskData.result

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

                    <XAxis dataKey="subTask" interval={0} width={30} angle={-15}></XAxis>

                    <YAxis>
                        <Label value="SubTask" offset={30} position="top" />
                    </YAxis>

                    <Tooltip />
                    <Legend />
                    <Bar dataKey="estHour" fill="#8884d8" >
                        <LabelList dataKey="estHour" position="top" />
                    </Bar>
                </BarChart>
            }
        </div>
    )
}