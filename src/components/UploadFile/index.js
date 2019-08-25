import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { postFile } from '../../functions'
import axios from 'axios'

import styles from './styles.module.css'

import {
    Button, Modal, Form, Input, Radio, Icon, Select, Upload, notification
} from 'antd';
const { Option } = Select;

const bearer = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = bearer;

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

class UploadFile extends Component {

    handleChange = e => {

        console.table(e.target.files)
        // console.log(e.target.files[0])

        const files = e.target.files

        let formData = new FormData()
        formData.append('taskCsv', files[0])

        const url = "http://localhost:3000/upcoming-task/upload-csv"

        axios.post(url, formData)
            .then(res => {
                console.log(res)
                openNotificationWithIcon('success', 'Upload', 'File Uploaded Successfully')
            })
            .catch(err => console.log(err))
    }

    render() {
        const {
            visible, onCancel, onCreate, form,
        } = this.props;

        const { getFieldDecorator } = form;

        const { dispatch, users } = this.props

        console.log(styles)
        
        return (
            <div>
                <input type="file" name="file" onChange={e => this.handleChange(e)} />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    users: state.userReducer
})

const WrappedUser = Form.create({ name: 'upload_file' })(UploadFile);

export default withRouter(connect(mapStateToProps)(WrappedUser));