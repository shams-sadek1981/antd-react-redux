import React, { Fragment } from 'react'

import { Select } from 'antd';

import { searchBy } from '../../actions/releaseActions';


const { Option } = Select;


function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export const _SearchByProject = (props) => {

    const { dispatch, release, project } = props

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
                project.list.map( (project, index) =>
                    <Option value={project.name} key={index}>{project.name}</Option>
                )
            }
            </Select>
        </Fragment>
    )
}