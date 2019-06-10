import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { SearchByForm } from './SearchByForm'
import { UserDetailsReport } from './UserDetailsReport'

import { loadUser } from '../../actions/userActions'
import { searchBy } from '../../actions/reportsActions'

import { Form, Select, Row, Col, Divider } from 'antd';

import './style.less'

const { Option } = Select;

class Reports extends Component {

    componentDidMount() {
        this.props.dispatch(loadUser())
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.props.dispatch(searchBy(values))
            }
        });
    };

    render() {

        return (
            <Fragment>

                <Row gutter={24} className="no-print">
                    <Col span={24}>
                        <SearchByForm {...this.props} handleSubmit={this.handleSubmit} />
                    </Col>
                </Row>

                <Divider/>

                <Row gutter={24} className="print-me">
                    <Col span={24}>
                        <UserDetailsReport {...this.props} />
                    </Col>
                </Row>

            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
    reports: state.reportsReducer,
    users: state.userReducer,
})

const WrappedComponent = Form.create({ name: 'Reports' })(Reports);

export default withRouter(connect(mapStateToProps)(WrappedComponent))