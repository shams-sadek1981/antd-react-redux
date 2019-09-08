import React, { Fragment } from 'react'

import { Table, Divider, Tag, Icon, Popconfirm } from 'antd';

import {changePagination, removeProject, editProject } from '../../actions/projectActions';


export const List = (props) => {

    const { dispatch, project } = props

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
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={() => dispatch(editProject(record._id))} href="javascript:;">
                        <Icon type="edit" theme="twoTone" />
                    </a>

                    <Divider type="vertical" />

                    <Popconfirm title="Are you sure to delete this project?"
                        onConfirm={(e) => dispatch(removeProject(record._id))}
                        okText="Yes" cancelText="No">

                        <a href="javascript:;">
                            <Icon type="delete" theme="twoTone" />
                        </a>
                    </Popconfirm>

                </span>
            ),
        }
    ];

    const data = project.list.map((item, index) => {

        return {
            _id: item._id,
            key: index,
            name: item.name,
        }
    })

    return (
        <Fragment>
            <Table
                loading={project.spinning}
                pagination={project.pagination}
                onChange={handleTableChange}
                columns={columns}
                dataSource={data}
                size="small"
            />
        </Fragment>
    )
}