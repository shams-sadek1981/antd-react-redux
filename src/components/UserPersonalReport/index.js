import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Form, Select, Row, Col, Divider, Tabs } from 'antd';

import { DateRange } from './DateRange'
import { setDateRange, searchByUser } from '../../actions/userReportActions'

import { UserDetailsReport } from './UserDetailsReport'

class UserPersonalReport extends Component {

    componentDidMount() {
        this.props.dispatch(setDateRange())
        this.props.dispatch(searchByUser())
    }

    render() {

        // const { handleSubmit } = props

        return (
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <DateRange {...this.props}/>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24} >
                    <Col span={24}>
                        <UserDetailsReport {...this.props} />
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.userReducer,
    reportPersonal: state.reportPersonalReducer
})

const WrappedComponent = Form.create({ name: 'UserPersonalReport' })(UserPersonalReport);

export default withRouter(connect(mapStateToProps)(WrappedComponent))
