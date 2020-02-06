import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, useLocation } from 'react-router-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
} from "react-router-dom";

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

import './styles.less'

import Test from './Test'

const { TabPane } = Tabs;
const Search = Input.Search;



class Sprint extends Component {

    state = {
        size: 'small',
        visible: false,

    };

    componentDidMount = async () => {

        /**
         * url params settings for tab key
         */
        const { path, url } = this.props.match

        let searchParams = new URLSearchParams(this.props.history.location.search);

        switch (searchParams.get('tab')) {
            case "completed":
                this.props.dispatch(changeTabKey("2"))
                break;

            case "upcoming":
                this.props.dispatch(changeTabKey("1"))
                break;
        }

        


        await this.props.dispatch(getPermissions())

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
            // console.log('Received values of form: ', values);

            this.props.dispatch(updateSubTask(values))

            form.resetFields();
        });
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    /**
     * Sprint change key
     */
    sprintChangeTabKey = (key) => {

        const { path, url } = this.props.match

        let searchParams = new URLSearchParams(this.props.history.location.search);

        switch (key) {
            case "1":
                searchParams.set('tab', 'upcoming')
                this.props.history.push(path + "?" + searchParams.toString())
                break;

            case "2":
                searchParams.set('tab', 'completed')
                this.props.history.push(path + "?" + searchParams.toString())
                break;
        }

        this.props.dispatch(changeTabKey(key))

    }

    render() {

        const { dispatch, release, sprint, upcomingTask } = this.props
        const { size } = this.state;

        // const { path, url } = this.props.match

        // console.log('Path:', path)
        // console.log('URL:', url)

        // const params = new URLSearchParams(this.props.location.search);
        // // let searchParams = new URLSearchParams(props.history.location.search);
        // const tab = params.get('tab')

        // console.log("TEST URL:", this.props.match.params.tab)

        // this.props.dispatch({
        //     type: "URL_PARAMS2",
        //     payload: {
        //         tab
        //     }
        // })

        return (
            <div id="sprint">

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
                    onChange={this.sprintChangeTabKey}
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