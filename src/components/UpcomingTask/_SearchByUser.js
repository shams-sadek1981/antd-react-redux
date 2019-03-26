import React, { Fragment } from 'react'

import { Select } from 'antd';

import { searchByUser } from '../../actions/upcomingTaskActions';


const { Option } = Select;


function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export const _SearchByUser = (props) => {

    const { dispatch, users } = props

    const handleChange = (value) => {
        dispatch(searchByUser(value))
        console.log(`selected ${value}`);
    }

    return (
        <Fragment>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
            {
                users.userList.map( (item, index) =>
                    <Option value={item.name} key={index}>{item.name}</Option>
                )
            }
            </Select>
        </Fragment>
    )
}