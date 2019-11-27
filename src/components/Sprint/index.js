import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Tabs, Radio, Form, Modal, Button, Icon, Row, Col, Input, Divider } from 'antd';

import { List } from './List'
import { NewModal } from './NewModal'
import { SearchHeader } from './SearchHeader'
import { TaskModal } from './TaskModal'
import { SubTaskModal } from './SubTaskModal'


import {
    // handleSubmit,
    // releaseSearchByResult,
    addNewTask,
    searchBy,
    // changeTabKey
} from '../../actions/releaseActions'

import {
    handleSubmit,
    sprintSearchByResult,
    changeTabKey,
    updateSubTask,
    handleTaskSubmit
} from '../../actions/sprintActions'

import { getAllProject, getProjectByUser } from '../../actions/projectActions';
import { getAllTaskType } from '../../actions/taskTypeActions';

import { loadUser, getPermissions } from '../../actions/userActions'

import styles from './styles.module.less'
import './styles.less'

const { TabPane } = Tabs;
const Search = Input.Search;


class Sprint extends Component {

    state = {
        size: 'small',
        visible: false,

    };

    componentDidMount = async () => {
        
        await this.props.dispatch( getPermissions() )

        this.props.dispatch(sprintSearchByResult())
        
        this.props.dispatch(getProjectByUser())

        this.props.dispatch(getAllTaskType())

        this.props.dispatch(loadUser())
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

    //-- Modal Task update form submit
    handleTaskUpdate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log('Received values of form: ', values);

            this.props.dispatch(handleTaskSubmit(values))

            form.resetFields();

        });
    }

    //-- Modal SubTask update form submit
    handleSubTaskUpdate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            this.props.dispatch(updateSubTask(values))

            form.resetFields();
        });
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {

        const { dispatch, release, sprint, upcomingTask } = this.props
        const { size } = this.state;

        return (
            <div id="sprint" className={styles.wrapper}>

                {sprint.modal.modalVisible &&
                    <NewModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        // onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                }

                {sprint.upcomingTaskModal.modalVisible &&
                    <TaskModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        // onCancel={this.handleCancel}
                        onCreate={this.handleTaskUpdate}
                    />
                }
                
                {sprint.subTaskModal.modalVisible &&
                    <SubTaskModal
                        {...this.props}
                        wrappedComponentRef={this.saveFormRef}
                        // onCancel={this.handleCancel}
                        onCreate={this.handleSubTaskUpdate}
                    />
                }

                {/* ---- Search Header ---- */}
                <SearchHeader {...this.props} />

                <Divider>Task</Divider>

                <Tabs
                    activeKey={sprint.tabKey}
                    size={size}
                    onChange={(key) => dispatch(changeTabKey(key))}
                >
                    <TabPane tab="Upcoming Sprint" key="1">
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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    release: state.releaseReducer,
    sprint: state.sprintReducer,
    project: state.projectReducer,
    users: state.userReducer,
    upcomingTask: state.upcomingTaskReducer,
    taskType: state.taskTypeReducer,
})


const WrappedComponent = Form.create({ name: 'sprint' })(Sprint);

export default withRouter(connect(mapStateToProps)(WrappedComponent));