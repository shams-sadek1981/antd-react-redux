import React, { Fragment } from 'react'
import { Rate, Button, Progress, Timeline, Icon, Popconfirm, Tag, Row, Col, Switch, Spin, Table } from 'antd';

import { deleteTaskFromSprint, editTask, filterByUserName, loadTaskBySprint, updateRunningTask, addNewSubTask } from '../../actions/sprintActions'
import { _SubTask } from './_SubTask'
import { _SubTaskDetails } from './_SubTaskDetails'
import { _TaskType } from './_TaskType'
import { handlePermission } from '../../functions'

import { link } from 'fs';

export const UserSummary = (props) => {

    const { dispatch, sprint, sprintName, userDetails } = props

    const sprintTaskList = sprint.taskList.find(item => item.sprintName == sprintName)

    //-- Delete Task From Sprint
    const confirm = item => dispatch(deleteTaskFromSprint(item))

    let completedColor = 'green';
    let dueColor = 'red';


    const backgroundColor = (userName) => {
        if (sprint.searchBy.sprintByUser == userName) {
            return "single-user-active"
        }

        return "single-user-inactive"
    }

    
    const randomColor = (userName) => {

        // check if search by User Name
        if (sprint.searchBy.sprintByUser) {

            if (sprint.searchBy.sprintByUser == userName) {
                completedColor = 'green'
                dueColor = 'red'
                return 'rgb(74, 116, 20)'
            } else {
                completedColor = 'silver'
                dueColor = 'silver'
                return 'silver'
            }
        }


        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 10)];
        }
        return color;
    }


    return (
        <div className="user-summary" style={{ marginLeft: '0px', display: 'flex', flexWrap: 'wrap' }}>

            {/* ----- User Details ---- */}
            {userDetails.map((item, index) =>
                <div
                    className={ backgroundColor(item.userName) }
                    key={index}
                    style={{ border: '1px solid #c0c0c057', borderRadius: '5px', padding: '10px', marginRight: '10px', cursor: 'pointer' }}
                    onClick={() => dispatch(loadTaskBySprint(sprintName, item.userName))}
                >

                    {/* ---- Task Status for KanbanBoard ---- */}
                    <Progress type="circle" strokeColor={randomColor(item.userName)} percent={item.percent} width={50} style={{ marginRight: '25px' }} />

                    <Tag color={randomColor(item.userName)} style={{ fontStyle: 'italic', fontWeight: 'bold', cursor: 'pointer' }}>
                        {item.userName}:
                            <span style={{ fontWeight: 'bold', fontSize: '115%', paddingLeft: '5px' }}>
                            {item.estHour.toString().match(/\.\d+/) ? parseFloat(item.estHour).toFixed(2) : item.estHour}
                        </span>/{item.taskCount}
                    </Tag>
                    <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                        <div style={{ paddingLeft: '5px', color: completedColor, float: 'left' }}>
                            Complete: <b>
                                    { item.complete.toString().match(/\.\d+/) ? parseFloat(item.complete).toFixed(2) : item.complete}
                                </b>/{ item.completedTask }
                        </div>
                        <div style={{ paddingLeft: '5px', color: dueColor, float: 'right' }}>
                            Due: <b>
                                {item.due.toString().match(/\.\d+/) ? parseFloat(item.due).toFixed(2) : item.due}
                            </b>/{ item.incompleteTask }
                            
                        </div>
                    </div>
                </div>)}
        </div>
    )
}