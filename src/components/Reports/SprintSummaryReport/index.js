import React, { Component, Fragment } from 'react'

import { Form, Select, Row, Col, Divider, Tabs } from 'antd';

import { SearchByForm } from './SearchByForm'
import { SprintSummaryDetailsReport } from './SprintSummaryDetailsReport'

export const SprintSummaryReport = (props) => {

    const { handleSubmit } = props

    return (
        <Fragment>
            <Row gutter={24}>
                <Col span={24}>
                    <SearchByForm {...props} handleSubmit={ handleSubmit } />
                </Col>
            </Row>

            <Divider />

            <Row gutter={24} >
                <Col span={24}>
                    <SprintSummaryDetailsReport {...props} />
                </Col>
            </Row>
        </Fragment>
    )
}

