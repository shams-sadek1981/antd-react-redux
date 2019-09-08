import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs, Radio, Form, Modal, Button, Icon, Divider } from 'antd';

import { getAllHolidays, handleSubmit, searchBy } from '../../actions/publicHolidayActions'
import { List } from './List'
import { SearchHeader } from './SearchHeader'

import { HolidayModal } from './HolidayModal'



class PublicHoliday extends Component {

    componentDidMount = () => {
        this.props.dispatch(searchBy())
        this.props.dispatch(getAllHolidays())
    }

    //-- Modal form submit
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);

            this.props.dispatch(handleSubmit(values))

            form.resetFields();

        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        return (
            <Fragment>

                <SearchHeader {...this.props} />

                <HolidayModal {...this.props}
                    wrappedComponentRef={this.saveFormRef}
                    onCreate={this.handleCreate}
                />

                <Divider />

                <List {...this.props} />

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    publicHoliday: state.publicHolidayReducer
})

const WrappedComponent = Form.create({ name: 'public_holiday' })(PublicHoliday);

export default withRouter(connect(mapStateToProps)(WrappedComponent))