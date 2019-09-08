import React, { Fragment } from 'react'

import { Select, Button, Icon, Row, Col, Input } from 'antd';


import { addNewProject, searchBy } from '../../actions/projectActions'


const { Option } = Select;
const Search = Input.Search;

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export const SearchHeader = (props) => {

    const { dispatch, upcomingTask, searchInput, project } = props

    return (
        <Fragment>
            <Row>

                <Col span={18}>
                    <Button
                        type="primary"
                        onClick={() => dispatch(addNewProject())}
                    >
                        <Icon type="plus-circle" />New Project
                    </Button>
                </Col>

                <Col span={6} align="right">
                    <Search
                        placeholder="input search text"
                        defaultValue={project.searchBy.text}
                        onSearch={value => dispatch(searchBy('text', value))}
                        style={{ width: 200 }}
                        autoFocus
                    />
                </Col>
            </Row>
        </Fragment>
    )
}