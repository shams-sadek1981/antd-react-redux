import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Tabs, Radio, Form, Modal, Button, Icon } from 'antd';

import { _AddUser } from './_AddUser'
import { _UserList } from './_UserList'
import { NewUserModal } from './_NewUserModal'

import { loadUser, handleSubmit, changeDefaultActiveKey, addNewUser } from '../../actions/userActions'

const { TabPane } = Tabs;

class User extends Component {

    state = {
        size: 'small',
        visible: false,
    };

    componentDidMount = () => {
        this.props.dispatch(loadUser())
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

        const { dispatch } = this.props
        const { size } = this.state;

        return (
            <Fragment>

                <Button
                    type="primary"
                    onClick={ () => dispatch(addNewUser()) }
                >
                    <Icon type="plus-circle" />New User
                </Button>

                <NewUserModal
                    {...this.props}
                    wrappedComponentRef={this.saveFormRef}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />


                <Tabs
                    activeKey={this.props.users.defaultActiveKey}
                    size={size}
                    onChange={(key) => dispatch(changeDefaultActiveKey(key))}
                >
                    <TabPane tab="User List" key="1"><_UserList {...this.props} /></TabPane>
                    <TabPane tab="New User" key="2"><_AddUser {...this.props} /></TabPane>
                </Tabs>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    users: state.userReducer
})


const WrappedUser = Form.create({ name: 'user' })(User);

export default withRouter(connect(mapStateToProps)(WrappedUser));
