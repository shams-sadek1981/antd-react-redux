import React, { Fragment } from 'react'

import { Select, Button, Icon, Row, Col, Input } from 'antd';

import {
    addNew,
    searchBy,
} from '../../actions/releaseActions'

import { _SearchByProject } from './_SearchByProject'

const { Option } = Select;
const Search = Input.Search;

function handleBlur() {
    console.log('blur');
}

function handleFocus() {
    console.log('focus');
}

export const SearchHeader = (props) => {

    const { dispatch, upcomingTask } = props

    return (
        <Fragment>
            <Row>
                <Col span={3}>
                    <Button
                        type="primary"
                        onClick={() => dispatch(addNew())}
                    >
                        <Icon type="plus-circle" />New
                    </Button>
                </Col>

                <Col span={5}>
                    <_SearchByProject {...props} />
                </Col>

                <Col span={5}>
                    <Search
                        placeholder="input search text"
                        onSearch={value => dispatch(searchBy('text', value))}
                        style={{ width: 200 }}
                    />
                </Col>
            </Row>
        </Fragment>
    )
}