import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Tabs, Radio, Form, Modal, Button, Icon, Row, Col } from 'antd';

// import { _AddUser } from './_AddUser'
import { _TaskList } from './_TaskList'
import { _NewTaskModal } from './_NewTaskModal'
import { _SearchByUser } from './_SearchByUser'
import { _SearchByProject } from './_SearchByProject'

import { handleSubmit, loadUpcomingTask, addNewTask } from '../../actions/upcomingTaskActions'

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


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {

        const { dispatch, upcomingTask } = this.props
        const { size } = this.state;

        return (
            <Fragment>

                <Row>
                    <Col span={3}>
                        <Button
                            type="primary"
                            onClick={() => dispatch(addNewTask())}
                        >
                            <Icon type="plus-circle" />New Task
                        </Button>
                    </Col>

                    <Col span={4}>
                        <div> <i>Total Est.</i> <b>{upcomingTask.totalEstHour} </b><i>Hours</i></div>
                    </Col>

                    <Col span={5}>
                        <_SearchByUser {...this.props} />
                    </Col>
                    
                    <Col span={5}>
                        <_SearchByProject {...this.props} />
                    </Col>
                </Row>

                <_NewTaskModal
                    {...this.props}
                    wrappedComponentRef={this.saveFormRef}
                    // onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />

                <Tabs
                    activeKey="1"
                    size={size}
                // onChange={(key) => dispatch(changeDefaultActiveKey(key))}
                >
                    <TabPane tab="Task List" key="1"><_TaskList {...this.props} /></TabPane>
                    {/* <TabPane tab="New User" key="2"><_AddUser {...this.props} /></TabPane> */}
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
