import React, { Fragment } from 'react'

import { Table, Divider, Tag, Icon } from 'antd';

import { removeUser, editUser } from '../../actions/userActions';


export const _UserList = (props) => {

    const { dispatch } = props

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => dispatch(editUser(record._id))} href="javascript:;">
                        <Icon type="edit" theme="twoTone" />
                    </a>

                    <Divider type="vertical" />

                    <a onClick={() => dispatch(removeUser(record._id))} href="javascript:;">
                        <Icon type="delete" theme="twoTone" />
                    </a>
                    
                </span>
            ),
        }
    ];

    const data = props.users.userList.map((item, index) => {

        return {
            _id: item._id,
            key: index,
            name: item.name,
            mobile: item.mobile
        }
    })

    return (
        <Fragment>
            <Table columns={columns} dataSource={data} />
        </Fragment>
    )
}