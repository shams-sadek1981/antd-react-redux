import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Tabs, Radio, Form, Modal, Button, Icon, Row, Col } from 'antd';

// import { _AddUser } from './_AddUser'
import { _TaskList } from './_TaskList'
import { NewTaskModal } from './NewTaskModal'
import { SubTaskModal } from './SubTaskModal'
import { _SearchByUser } from './_SearchByUser'
import { _SearchByProject } from './_SearchByProject'

import { 
    handleSubmit,
    loadUpcomingTask,
    addNewTask,
    } from '../../actions/upcomingTaskActions'

import { handleSubTaskSubmit } from '../../actions/task/subTaskActions'

const { TabPane } = Tabs;

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

                { upcomingTask.modal.modalVisible &&
                    <NewTaskModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        // onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                }

                { upcomingTask.subTaskModal.modalVisible &&
                    <SubTaskModal
                    {...this.props}
                    wrappedComponentRef={this.saveFormRef}
                    // onCancel={this.handleCancel}
                    onCreate={this.handleSubTaskCreate}
                    />
                }

                <Tabs
                    activeKey="1"
                    size={size}
                // onChange={(key) => dispatch(changeDefaultActiveKey(key))}
                >
                    <TabPane tab="Task List" key="1">
                        <Row>
                            <Col span={3}>
                                <Button
                                    type="primary"
                                    onClick={() => dispatch(addNewTask())}
                                >
                                    <Icon type="plus-circle" />New Task
                                </Button>
                            </Col>

                            <Col span={3}>
                                <div> <i>Total Est. <b>{upcomingTask.totalEstHour} </b></i></div>
                                <div> <i>Total Task: <b>{upcomingTask.totalTask} </b></i></div>
                                <div> <i>Total Subtask: <b>{upcomingTask.totalSubTask} </b></i></div>
                            </Col>
                            
                            <Col span={3}>
                                <div> <i>User: <b>{upcomingTask.userName} </b></i></div>
                                <div> <i>User Est: <b>{upcomingTask.userEstHour} </b></i></div>
                                <div> <i>User Subtask: <b>{upcomingTask.userTotalSubTask} </b></i></div>
                            </Col>

                            <Col span={5}>
                                <_SearchByUser {...this.props} />
                            </Col>

                            <Col span={5}>
                                <_SearchByProject {...this.props} />
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <_TaskList {...this.props} />
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tab="Upcoming Task" key="2">Upcoming Task</TabPane>
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
