import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Tabs, Radio, Form, Modal, Button, Icon, Row, Col, Input, Divider } from 'antd';

// import { _AddUser } from './_AddUser'
import { _TaskList } from './_TaskList'
import { NewTaskModal } from './NewTaskModal'
import { SubTaskModal } from './SubTaskModal'
import { SearchHeader } from './SearchHeader'

import {
    handleSubmit,
    loadUpcomingTask,
    addNewTask,
    searchBy,
    changeTabKey
} from '../../actions/upcomingTaskActions'

import { handleSubTaskSubmit } from '../../actions/task/subTaskActions'

const { TabPane } = Tabs;
const Search = Input.Search;

class UpcomingTask extends Component {

    state = {
        size: 'small',
        visible: false,

    };

    componentDidMount = () => {
        this.props.dispatch(loadUpcomingTask())
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


    //-- Modal form subtask submit
    handleSubTaskCreate = () => {

        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);

            this.props.dispatch(handleSubTaskSubmit(values))

            form.resetFields();

        });
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {

        const { dispatch, upcomingTask } = this.props
        const { size } = this.state;

        return (
            <Fragment>

                {upcomingTask.modal.modalVisible &&
                    <NewTaskModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        // onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                }

                {upcomingTask.subTaskModal.modalVisible &&
                    <SubTaskModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        // onCancel={this.handleCancel}
                        onCreate={this.handleSubTaskCreate}
                    />
                }

                {/* ##### Search Header ##### */}
                <SearchHeader {...this.props}/>

                <Divider>Task</Divider>

                <Tabs
                    activeKey={upcomingTask.tabKey}
                    size={size}
                    onChange={(key) => dispatch(changeTabKey(key))}
                >
                    <TabPane tab="Task List" key="1">
                        <Row>
                            <Col span={24}>
                                <_TaskList {...this.props} />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tab="Completed Task" key="2">
                        Completed Task
                        <_TaskList {...this.props} />
                    </TabPane>
                    <TabPane tab="Running Task" key="3">Running Task</TabPane>
                </Tabs>
            </Fragment >
        )
    }
}

const mapStateToProps = state => ({
    upcomingTask: state.upcomingTaskReducer,
    users: state.userReducer
})


const WrappedComponent = Form.create({ name: 'upcoming-task' })(UpcomingTask);

export default withRouter(connect(mapStateToProps)(WrappedComponent));
