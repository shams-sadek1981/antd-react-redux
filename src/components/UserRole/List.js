import React, { Fragment } from 'react'

import { Table, Divider, Tag, Icon, Popconfirm } from 'antd';

import { removeRole, editRole } from '../../actions/userRoleActions';


export const List = (props) => {

    const { dispatch, userRole } = props

    const handleTableChange = (pagination, filters, sorter) => {
        // dispatch(changePagination(pagination))
    }

    const confirm = (id) => {
        dispatch(removeRole(id))
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => dispatch(editRole(record._id))} href="javascript:;">
                        <Icon type="edit" theme="twoTone" />
                    </a>

                    <Divider type="vertical" />

                    <Popconfirm title="Are you sure to delete this task?"
                        onConfirm={(e) => confirm(record._id)}
                        okText="Yes" cancelText="No">

                        <a href="javascript:;">
                            <Icon type="delete" theme="twoTone" />
                        </a>
                    </Popconfirm>

                </span>
            ),
        }
    ];

    const data = userRole.roleList.map((item, index) => {

        return {
            _id: item._id,
            key: index,
            name: item.name,
            description: item.description,
        }
    })

    return (
        <Fragment>
            <Table
                loading={userRole.spinning}
                pagination={userRole.pagination}
                onChange={handleTableChange}
                columns={columns}
                dataSource={data}
                size="small"
            />
        </Fragment>
    )
}