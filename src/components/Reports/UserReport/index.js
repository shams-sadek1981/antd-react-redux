import React, { Component, Fragment } from 'react'

import { Form, Select, Row, Col, Divider, Tabs, Spin } from 'antd';

import { SearchByForm } from './SearchByForm'
import { UserDetailsReport } from './UserDetailsReport'

export const UserReport = (props) => {

    const { handleSubmit, reports } = props

    return (
        <Fragment>
            <Row gutter={24}>
                <Col span={24}>
                    <SearchByForm {...props} />
                </Col>
            </Row>

            <Divider />

            <Row gutter={24} >
                <Col span={24}>
                    <Spin tip="Loading..." spinning={reports.spinning}>
                        <UserDetailsReport {...props} />
                    </Spin>
                </Col>
            </Row>
        </Fragment>
    )
}

