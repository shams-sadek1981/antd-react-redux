import React, { Fragment } from 'react'

import { Select } from 'antd';

import { searchBy } from '../../actions/upcomingTaskActions';


const { Option } = Select;


function handleBlur() {
    // console.log('blur');
}

function handleFocus() {
    // console.log('focus');
}

export const _SearchByUser = (props) => {

    const { dispatch, users, upcomingTask } = props

    const handleChange = (userName) => {
        dispatch(searchBy('name', userName))
    }

    return (
        <Fragment>
            <Select
                showSearch
                style={{ width: 200 }}
                defaultValue={ upcomingTask.searchBy.name }
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >

                <Option value="all" key={-1}>ALL User</Option>
            {
                users.allUser.map( (item, index) =>
                    <Option value={item.name} key={index}>{item.name}</Option>
                )
            }
            </Select>
        </Fragment>
    )
}