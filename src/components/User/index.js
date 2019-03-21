import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Tabs, Radio, Form } from 'antd';

import { _AddUser } from './_AddUser'
import { _UserList } from './_UserList'

import { loadUser, addUser, changeDefaultActiveKey } from '../../actions/userActions'

const { TabPane } = Tabs;

class User extends Component {

    componentDidMount = () => {
        this.props.dispatch(loadUser())
    }

    state = { size: 'small' };

    render() {

        const { size } = this.state;

        return (
            <Tabs
                activeKey={this.props.users.defaultActiveKey}
                size={size}
                onChange={(key) => this.props.dispatch(changeDefaultActiveKey(key))}
            >
                <TabPane tab="User List" key="1"><_UserList {...this.props} /></TabPane>
                <TabPane tab="New User" key="2"><_AddUser {...this.props} /></TabPane>
            </Tabs>
        )
    }
}

const mapStateToProps = state => ({
    users: state.userReducer
})


const WrappedUser = Form.create({ name: 'user' })(User);

export default connect(mapStateToProps)(WrappedUser)
