import React, { Fragment } from 'react'

import { Select, Button, Icon, Row, Col, Input } from 'antd';


import { addNewUser, searchBy } from '../../actions/userActions'


const { Option } = Select;
const Search = Input.Search;

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export const SearchHeader = (props) => {

    const { dispatch, upcomingTask, searchInput, users } = props

    return (
        <Fragment>
            <Row>

                <Col span={18}>
                    <Button
                        type="primary"
                        onClick={() => dispatch(addNewUser())}
                    >
                        <Icon type="plus-circle" />New User
                    </Button>
                </Col>

                <Col span={6} align="right">
                    <Search
                        placeholder="input search text"
                        defaultValue={users.searchBy.text}
                        onSearch={value => dispatch(searchBy('text', value))}
                        style={{ width: 200 }}
                        autoFocus
                    />
                </Col>
            </Row>
        </Fragment>
    )
}