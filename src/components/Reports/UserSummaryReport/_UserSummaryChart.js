import React, { Component, Fragment } from 'react'
import { Form, Select, Row, Col, Divider, Tabs } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, LabelList } from "recharts"

// const data = [
//     { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//     { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//     { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
// ];


export const _UserSummaryChart = (props) => {

    const { reports } = props

    const data = reports.userSummary.result

    return (
        <div>
            {
                data.length > 0 &&
                <BarChart
                    width={1100}
                    height={750}
                    data={data}
                    margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                >
                    <CartesianGrid strokeDasharray="3 4" />
                    <XAxis type="number" />
                    <YAxis dataKey="userName" type="category" width={120}>
                        {/* <Label value="User Name" offset={0} position="top" /> */}
                    </YAxis>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="estHour" fill="#82ca9d">
                        <LabelList dataKey="estHour" position="insideRight" />
                    </Bar>
                    
                    <Bar dataKey="officeHour" fill="#8884d8">
                        {/* <LabelList dataKey="officeHour" position="right" /> */}
                    </Bar>
                    
                    {/* <Bar dataKey="timeLog" fill="#778899">
                        <LabelList dataKey="timeLog" position="right" />
                    </Bar> */}
                </BarChart>
            }
        </div>
    )
}