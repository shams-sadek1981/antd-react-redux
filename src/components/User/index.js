import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Tabs, Radio, Form, Modal, Button, Icon } from 'antd';

import { AddUser } from './AddUser'
import { UserList } from './UserList'
import { NewUserModal } from './NewUserModal'

import { SearchHeader } from './SearchHeader'

import { handleSubmit, changeDefaultActiveKey, addNewUser, userSearchByResult } from '../../actions/userActions'
import { userRoleSearchByResult } from '../../actions/userRoleActions'
import { getAllProject } from '../../actions/projectActions'

const { TabPane } = Tabs;

class User extends Component {

    state = {
        size: 'small',
        visible: false,
    };

    componentDidMount = () => {
        this.props.dispatch(userSearchByResult())
        this.props.dispatch(userRoleSearchByResult())
        this.props.dispatch(getAllProject())
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

                <SearchHeader {...this.props}/>

                <NewUserModal
                    {...this.props}
                    wrappedComponentRef={this.saveFormRef}
                    // onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />


                <Tabs
                    activeKey={this.props.users.defaultActiveKey}
                    size={size}
                    onChange={(key) => dispatch(changeDefaultActiveKey(key))}
                >
                    <TabPane tab="User List" key="1"><UserList {...this.props} /></TabPane>
                    {/* <TabPane tab="New User" key="2"><AddUser {...this.props} /></TabPane> */}
                </Tabs>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    users: state.userReducer,
    userRole: state.userRoleReducer,
    project: state.projectReducer
})


const WrappedUser = Form.create({ name: 'user' })(User);

export default withRouter(connect(mapStateToProps)(WrappedUser));
