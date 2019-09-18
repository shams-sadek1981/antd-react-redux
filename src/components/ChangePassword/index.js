import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Tabs, Radio, Form, Modal, Button, Icon, Divider, Input, Row, Col } from 'antd';

// import { handleSubmit, getAllProject } from '../../actions/projectActions'
// import { List } from './List'
// import { SearchHeader } from './SearchHeader'

// import { ProjectModal } from './ProjectModal'

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ChangePassword extends Component {

    componentDidMount = () => {
        // this.props.dispatch(getAllProject())
        // this.props.dispatch(userRoleSearchByResult())
    }

    //-- Modal form submit
    // handleCreate = () => {
    //     const form = this.formRef.props.form;
    //     form.validateFields((err, values) => {
    //         if (err) {
    //             return;
    //         }

    //         console.log('Received values of form: ', values);

    //         // this.props.dispatch(handleSubmit(values))

    //         form.resetFields();

    //     });
    // }

    // saveFormRef = (formRef) => {
    //     this.formRef = formRef;
    // }

    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;


        return (
            <Row gutter={24}>
                <Col span={8}>
                    <Form layout="vertical">
                        <Form.Item label="Password">
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [{ required: true, message: 'Please input the user password!' }],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                Submit
                        </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    // project: state.projectReducer
})

const WrappedComponent = Form.create({ name: 'change_password' })(ChangePassword);

export default withRouter(connect(mapStateToProps)(WrappedComponent))