import React, { Fragment } from 'react'

import { Select } from 'antd';

import { searchBy } from '../../actions/upcomingTaskActions';


const { Option } = Select;


function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export const _SearchByProject = (props) => {

    const { dispatch, upcomingTask } = props

    const handleChange = (projectName) => {
        dispatch(searchBy('project', projectName))
    }

    return (
        <Fragment>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a project"
                optionFilterProp="children"
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >

                <Option value="all" key={-1}>ALL Project</Option>
            {
                upcomingTask.projects.map( (project, index) =>
                    <Option value={project} key={index}>{project}</Option>
                )
            }
            </Select>
        </Fragment>
    )
}