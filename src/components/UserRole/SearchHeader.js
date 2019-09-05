import React, { Fragment } from 'react'

import { Select, Button, Icon, Row, Col, Input } from 'antd';


import { addNewRole, searchBy } from '../../actions/userRoleActions'


const { Option } = Select;
const Search = Input.Search;

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export const SearchHeader = (props) => {

    const { dispatch, upcomingTask, searchInput, userRole } = props

    return (
        <Fragment>
            <Row>
                <Col span={18}>
                    <Button
                        type="primary"
                        onClick={() => dispatch(addNewRole())}
                    >
                        <Icon type="plus-circle" />New User Role
                    </Button>
                </Col>

                <Col span={6} align="right">
                    <Search
                        placeholder="input search text"
                        defaultValue={userRole.searchBy.text}
                        onSearch={value => dispatch(searchBy('text', value))}
                        style={{ width: 200 }}
                        autoFocus
                    />
                </Col>
            </Row>
        </Fragment>
    )
}