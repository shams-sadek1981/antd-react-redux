import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Tabs, Radio, Form, Modal, Button, Icon } from 'antd';

import { AddUser } from './AddUser'
import { List } from './List'
import { AssignPermission } from './AssignPermission'
import { NewRoleModal } from './NewRoleModal'

import { SearchHeader } from './SearchHeader'

import {
    handleSubmit,
    changeDefaultActiveKey,
    addNewRole,
    userRoleSearchByResult,
    getUserPermissionList
} from '../../actions/userRoleActions'

const { TabPane } = Tabs;

class UserRole extends Component {

    state = {
        size: 'small',
        visible: false,
    };

    componentDidMount = () => {
        this.props.dispatch(getUserPermissionList())
        this.props.dispatch(userRoleSearchByResult())
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

        const { dispatch, userRole } = this.props
        const { size } = this.state;

        return (
            <Fragment>

                <SearchHeader {...this.props}/>

                <NewRoleModal
                    {...this.props}
                    wrappedComponentRef={this.saveFormRef}
                    // onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />


                <Tabs
                    activeKey={ userRole.defaultActiveKey}
                    size={size}
                    onChange={(key) => dispatch(changeDefaultActiveKey(key))}
                >
                    <TabPane tab="User Role List" key="1">
                        <List {...this.props} />
                    </TabPane>
                    <TabPane tab="Assign Permission" key="2">
                        <AssignPermission {...this.props} />
                    </TabPane>
                </Tabs>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    userRole: state.userRoleReducer
})


const WrappedUser = Form.create({ name: 'user_role' })(UserRole);

export default withRouter(connect(mapStateToProps)(WrappedUser));
