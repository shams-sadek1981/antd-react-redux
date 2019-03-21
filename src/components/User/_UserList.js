import React, { Fragment } from 'react'

import { Table, Divider, Tag } from 'antd';

import { removeUser } from '../../actions/userActions';


export const _UserList = (props) => {

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
                    <a onClick={() => props.dispatch(removeUser(record._id))} href="javascript:;">Delete</a>
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