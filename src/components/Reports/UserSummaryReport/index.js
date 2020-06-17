import React, { Component, Fragment } from 'react'

import { Form, Select, Row, Col, Divider, Tabs, Spin } from 'antd';

import { SearchByForm } from './SearchByForm'
import { UserSummaryDetailsReport } from './UserSummaryDetailsReport'

export const UserSummaryReport = (props) => {

    const { handleSubmit } = props

    return (
        <Fragment>
            <Row gutter={24}>
                <Col span={24}>
                    <SearchByForm {...props} handleSubmit={handleSubmit} />
                </Col>
            </Row>

            <Divider />

            <Row gutter={24} >
                <Col span={24}>
                    <Spin tip="Loading..." spinning={props.reports.spinning}>
                        <UserSummaryDetailsReport {...props} />
                    </Spin>
                </Col>
            </Row>
        </Fragment>
    )
}

