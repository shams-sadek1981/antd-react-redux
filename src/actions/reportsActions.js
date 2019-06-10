import moment from 'moment'
import {
    notification
} from 'antd';

import { get, post, put, deleteMethod } from '../functions'

import { loadUser } from './userActions'

//-- Define action names
export const REPORTS_SEARCH_BY = "REPORTS_SEARCH_BY"


const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message: message,
        description: description
    });
};



// export const searchBy = (fieldName, value) => {
//     return (dispatch, getState) => {

//         // dispatch(toggleSpinning(true))

//         let { searchBy, pagination, tabKey } = getState().upcomingTaskReducer
//         const { current } = pagination
//         const { name, project, text, status } = searchBy

//         //-- set Search by
//         searchBy = {
//             ...searchBy,
//             [fieldName]: value
//         }

//         pagination = {
//             ...pagination,
//             current: 1
//         }

//         dispatch({
//             type: REPORTS_SEARCH_BY,
//             payload: {
//                 searchBy,
//                 pagination
//             }
//         })

//         //-- Load Result
//         // dispatch(upcomingTaskSearchByResult({ status, tabKey }))


//         // dispatch(toggleSpinning(false))

//     }
// }

//-- handleSubmit

export const searchBy = (values) => {

    return ( dispatch, getState ) => {

        let { userName, startDate, endDate } = values
        startDate = moment(startDate).format('YYYY-MMM-DD')
        endDate = moment(endDate).format('YYYY-MMM-DD')

        const searchUrl = `/upcoming-task/subtask/report-user?startDate=${startDate}&endDate=${endDate}&userName=${userName}`

        const { searchBy } = getState().reportsReducer

        return get(searchUrl)
            .then(data => {
                dispatch({
                    type: REPORTS_SEARCH_BY,
                    payload: {
                        data,
                        searchBy: {
                            ...searchBy,
                            name: userName,
                            startDate: moment(startDate).format('DD/MMM/YYYY'),
                            endDate: moment(endDate).format('DD/MMM/YYYY')
                        }
                    }
                })
            })
            .catch(err => console.log(err))

    }

}