import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Tabs, Radio, Form, Modal, Button, Icon, Row, Col, Input, Divider } from 'antd';

import { List } from './List'
import { NewModal } from './NewModal'
import { SearchHeader } from './SearchHeader'

import {
    handleSubmit,
    releaseSearchByResult,
    addNewTask,
    searchBy,
    changeTabKey
} from '../../actions/releaseActions'


const { TabPane } = Tabs;
const Search = Input.Search;

class Release extends Component {

    state = {
        size: 'small',
        visible: false,

    };

    componentDidMount = () => {
        this.props.dispatch(releaseSearchByResult())
    }

    //-- Modal form submit
    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            this.props.dispatch(handleSubmit(values))

            form.resetFields();

        });
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {

        const { dispatch, release } = this.props
        const { size } = this.state;

        return (
            <Fragment>

                {release.modal.modalVisible &&
                    <NewModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        // onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                }


                {/* ##### Search Header ##### */}
                <SearchHeader {...this.props}/>

                <Divider>Task</Divider>

                <Tabs
                    activeKey={release.tabKey}
                    size={size}
                    onChange={(key) => dispatch(changeTabKey(key))}
                >
                    <TabPane tab="Upcoming Release" key="1">
                        <Row>
                            <Col span={24}>
                                <List {...this.props} />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tab="Completed" key="2">
                        <List {...this.props} />
                    </TabPane>
                </Tabs>
            </Fragment >
        )
    }
}

const mapStateToProps = state => ({
    release: state.releaseReducer,
})


const WrappedComponent = Form.create({ name: 'release' })(Release);

export default withRouter(connect(mapStateToProps)(WrappedComponent));
