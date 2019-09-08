import React, { Fragment } from 'react'
import moment from 'moment'

import { Table, Divider, Tag, Icon, Popconfirm } from 'antd';

import { removeHoliday } from '../../actions/publicHolidayActions';


export const List = props => {

    const { dispatch, publicHoliday } = props

    const columns = [
        {
            title: 'Holiday',
            dataIndex: 'holiday',
            key: 'holiday',
            render: (text, record) => (
                <span>
                    { moment(record.holiday).format('DD/MMM/YYYY, dddd') }
                </span>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: text => <a href="javascript:;">{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>

                    <Popconfirm title="Are you sure to delete this holiday?"
                        onConfirm={(e) => dispatch(removeHoliday(record._id))}
                        okText="Yes" cancelText="No">

                        <a href="javascript:;">
                            <Icon type="delete" theme="twoTone" />
                        </a>
                    </Popconfirm>

                </span>
            ),
        }
    ];

    const data = publicHoliday.list.map( (item, index) => {

        return {
            _id: item._id,
            key: index,
            holiday: item.holiday,
            description: item.description,
        }
    })

    return (
        <Fragment>
            <Table
                loading={publicHoliday.spinning}
                pagination={publicHoliday.pagination}
                // onChange={handleTableChange}
                columns={columns}
                dataSource={data}
                size="small"
            />
        </Fragment>
    )
}