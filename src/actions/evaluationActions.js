import { notification } from 'antd';
import moment from 'moment'
import axios from 'axios'

// import FileDownload from 'js-file-download'

import { get, post, put, deleteMethod, postWithoutToken } from '../functions'
import { BrowserRouter, browserHistory } from 'react-router-dom'

//-- Define action names
export const EVALUATION_CHANGE_SEARCH_VALUE = "EVALUATION_CHANGE_SEARCH_VALUE"
export const EVALUATION_RESULT = "EVALUATION_RESULT"


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};

export const changeName = (value) => (dispatch, getState) => {

    dispatch({
        type: 'MOHSIN_CHANGE_NAME',
        payload: {
            name: 'Talha Moshin',
            value: value
        }
    })
}

// Change Search Field
export const changeSearchField = (val, fieldName = "startDate") => (dispatch, getState) => {

    const { searchBy } = getState().evaluationReducer

    dispatch({
        type: 'EVALUATION_CHANGE_SEARCH_VALUE',
        payload: {
            searchBy: {
                ...searchBy,
                [fieldName]: val
            }
        }
    })
}

//-- Search Result
export const searchResult = () => (dispatch, getState) => {

    const { searchBy } = getState().evaluationReducer

    // const { evaluationName, startDate, endDate, } = searchBy
    const { evaluationName } = searchBy

    let queryString = ''

    if (evaluationName) {
        queryString += 'evaluationName=' + evaluationName
    }

    // if (startDate) {
    //     queryString +=  '&startDate=' + moment(startDate).format("YYYY-MMM-DD")
    //     queryString +=  '&endDate=' + moment(endDate).format("YYYY-MMM-DD")
    // }

    const searchUrl = `/evaluation/get-all-marks?${queryString}`

    get(searchUrl)
        .then(data => {
            dispatch({
                type: EVALUATION_RESULT,
                payload: {
                    evaluationResult: data.result
                }
            })
        })
        .catch(err => openNotificationWithIcon('error', 'Error Message', err.message))
}



/**
 * Download .pdf file
 * 
 */
export const downloadPdfFile = () => (dispatch, getState) => {

    const { searchBy } = getState().evaluationReducer

    const { evaluationName } = searchBy

    let queryString = ''

    if (evaluationName) {
        queryString += 'evaluationName=' + evaluationName
    }


    /**
     * Generate .pdf file
     * 
     */
    const generatePdfUrl = `/evaluation/generate-all-emp-pdf?${queryString}`

    get(generatePdfUrl)
        .then(data => {

            /**
            * Download .pdf File
            * 
            */
            setTimeout(function () {

                const searchUrl = process.env.REACT_APP_HOST + `/evaluation/download-pdf-file?${queryString}`

                axios({
                    url: searchUrl, //your url
                    method: 'GET',
                    responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${evaluationName}.pdf`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            }, 1000)


        })
        .catch(err => {
            openNotificationWithIcon('error', 'Error Message', err.message)
        })



    // axios.get(searchUrl)
    //     .then((response) => {
    //         FileDownload(response.data, 'report.pdf');
    //     })

}



/**
 * Download .zip file
 * 
 */
export const downloadZipFile = () => (dispatch, getState) => {

    const { searchBy } = getState().evaluationReducer

    const { evaluationName } = searchBy

    let queryString = ''

    if (evaluationName) {
        queryString += 'evaluationName=' + evaluationName
    }


    /**
     * Generate .pdf file
     * 
     */
    const generatePdfUrl = `/evaluation/generate-personal-pdf-zip?${queryString}`

    get(generatePdfUrl)
        .then(data => {

            /**
            * Download .pdf File
            * 
            */
            setTimeout(function () {

                const searchUrl = process.env.REACT_APP_HOST + `/evaluation/download-pdf-users-zip?${queryString}`

                axios({
                    url: searchUrl, //your url
                    method: 'GET',
                    responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${evaluationName}.zip`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
            }, 1000)


        })
        .catch(err => {
            openNotificationWithIcon('error', 'Error Message', err.message)
        })



    // axios.get(searchUrl)
    //     .then((response) => {
    //         FileDownload(response.data, 'report.pdf');
    //     })

}