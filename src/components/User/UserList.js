import React, { Fragment } from 'react'

import { Table, Divider, Tag, Icon, Popconfirm } from 'antd';

import { removeUser, editUser, changePagination } from '../../actions/userActions';


export const UserList = (props) => {

    const { dispatch, users } = props

    const handleTableChange = (pagination, filters, sorter) => {
        dispatch(changePagination(pagination))
    }

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
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
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

                    <Popconfirm title="Are you sure to delete this user?"
                        onConfirm={(e) => dispatch(removeUser(record._id))}
                        okText="Yes" cancelText="No">

                        <a href="javascript:;">
                            <Icon type="delete" theme="twoTone" />
                        </a>
                    </Popconfirm>

                </span>
            ),
        }
    ];

    const data = users.userList.map((item, index) => {

        return {
            _id: item._id,
            key: index,
            name: item.name,
            mobile: item.mobile,
            department: item.department
        }
    })

    return (
        <Fragment>
            <Table
                loading={users.spinning}
                pagination={users.pagination}
                onChange={handleTableChange}
                columns={columns}
                dataSource={data}
                size="small"
            />
        </Fragment>
    )
}