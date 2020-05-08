import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { postFile } from '../../functions'
import axios from 'axios'

import styles from './styles.module.css'

import {
    changeDataForEvaluation
} from '../../actions/uploadActions'

import {
    Button, Modal, Form, Input, Radio, Icon, Select, Upload, notification, Row, Col, DatePicker, Card
} from 'antd';
const { Option } = Select;

const bearer = "Bearer " + localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = bearer;

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

class UploadFile extends Component {

    handleChange = e => {

        // console.table(e.target.files)
        // console.log(e.target.files[0])

        const files = e.target.files

        let formData = new FormData()
        formData.append('taskCsv', files[0])

        const url = process.env.REACT_APP_HOST + "/upcoming-task/upload-csv"

        axios.post(url, formData)
            .then(res => {
                openNotificationWithIcon('success', 'Upload', 'File Uploaded Successfully')
            })
            .catch(err => console.log(err))
    }



    /**
     * Upload Evaluation File to Database
     * 
     */
    handleChangeForEvaluation = e => {

        // console.table(e.target.files)
        // console.log(e.target.files[0])

        const { evaluation } = this.props.upload
        const { evaluationName, startDate, endDate } = evaluation

        const files = e.target.files

        let formData = new FormData()
        formData.append('evaluationCsv', files[0])
        formData.append('evaluationName', evaluationName)
        formData.append('startDate', startDate)
        formData.append('endDate', endDate)

        // set url
        const url = process.env.REACT_APP_HOST + "/csv/upload-evaluation-csv"

        axios.post(url, formData)
            .then(res => {
                openNotificationWithIcon('success', 'Upload', 'Evaluation File Uploaded Successfully')
            })
            .catch(err => {
                openNotificationWithIcon('error', 'Upload', err)
            })
    }

    render() {
        const {
            visible, onCancel, onCreate, form,
        } = this.props;

        const { getFieldDecorator } = form;

        const { dispatch, users } = this.props

        // console.log(styles)

        const dateFormat = 'YYYY-MMM-DD';

        return (
            <div>
                <Card
                    title="Select Sprint File"
                    style={{}}
                >
                    <h3>Select Sprint File</h3>
                    <input type="file" name="file" onChange={e => this.handleChange(e)} />
                </Card>

                <Card
                    title="Select Evaluation File"
                    style={{ marginTop: '50px' }}
                >

                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item label="Evaluation Name">
                                <Input
                                    autoComplete="off"
                                    onChange={e => dispatch(changeDataForEvaluation('evaluationName', e.target.value))}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Start Date">
                                <DatePicker
                                    format={dateFormat}
                                    onChange={e => dispatch(changeDataForEvaluation('startDate', e))}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={4}>
                            <Form.Item label="End Date">
                                <DatePicker
                                    format={dateFormat}
                                    onChange={e => dispatch(changeDataForEvaluation('endDate', e))}
                                />
                            </Form.Item>
                        </Col>
                    </Row>


                    <input type="file" name="evaluationFile" onChange={e => this.handleChangeForEvaluation(e)} />
                </Card>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    users: state.userReducer,
    upload: state.uploadReducer
})

const WrappedUser = Form.create({ name: 'upload_file' })(UploadFile);

export default withRouter(connect(mapStateToProps)(WrappedUser));