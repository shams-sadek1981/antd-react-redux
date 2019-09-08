import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs, Radio, Form, Modal, Button, Icon, Divider } from 'antd';

import { handleSubmit, getAllProject } from '../../actions/projectActions'
import { List } from './List'
import { SearchHeader } from './SearchHeader'

import { ProjectModal } from './ProjectModal'

class Project extends Component {

    componentDidMount = () => {
        this.props.dispatch(getAllProject())
        // this.props.dispatch(userRoleSearchByResult())
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
        return (
            <Fragment>

                <SearchHeader {...this.props} />
                {/* <ProjectModal {...this.props}/> */}

                <ProjectModal
                    {...this.props}
                    wrappedComponentRef={this.saveFormRef}
                    // onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />

                <Divider />

                <List {...this.props} />

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    project: state.projectReducer
})

const WrappedComponent = Form.create({ name: 'project' })(Project);

export default withRouter(connect(mapStateToProps)(WrappedComponent))