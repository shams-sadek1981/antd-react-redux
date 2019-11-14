import React, { Fragment } from 'react'
import { Rate, Button, Progress, Timeline, Icon, Popconfirm, Tag, Row, Col, Switch, Spin } from 'antd';

import { deleteTaskFromSprint, editTask, filterByUserName, loadTaskBySprint, updateRunningTask, addNewSubTask } from '../../actions/sprintActions'
import { _SubTask } from './_SubTask'
import { _TaskType } from './_TaskType'
import { handlePermission } from '../../functions'

import styles from './styles.module.less'

export const TaskList = (props) => {

    const { dispatch, sprint, sprintName, userDetails } = props

    const sprintTaskList = sprint.taskList.find(item => item.sprintName == sprintName)

    //-- Delete Task From Sprint
    const confirm = item => dispatch(deleteTaskFromSprint(item))

    let completedColor = 'green';
    let dueColor = 'red';

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
        <Spin spinning={sprint.loading}>
            {/* -------------------- Sprint calculation -------------------- */}

            <div style={{ marginLeft: '0px' }}>

                {/* ------ Filter BY User ------ */}
                {sprint.searchBy.sprintByUser &&
                    <div>
                        Filter By:
                        <span style={{ color: '#4F5CB8', fontWeight: 'bold', marginLeft: '5px', fontFamily: 'sans-serif' }}>
                            {sprint.searchBy.sprintByUser}
                        </span>
                    </div>
                }

                {/* ----- User Details ---- */}
                {userDetails.map((item, index) =>
                    <div
                        key={index}
                        style={{ float: 'left', border: '1px solid #c0c0c057', borderRadius: '5px', padding: '10px', marginRight: '10px', cursor: 'pointer' }}
                        onClick={() => dispatch(loadTaskBySprint(sprintName, item.userName))}
                    >

                        {/* ---- Task Status for KanbanBoard ---- */}
                        <Progress type="circle" strokeColor={randomColor(item.userName)} percent={item.percent} width={50} style={{ marginRight: '25px' }} />

                        <Tag color={randomColor(item.userName)} style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                            {item.userName}:
                            <span style={{ fontWeight: 'bold', fontSize: '115%', paddingLeft: '5px' }}>
                                {item.estHour}
                            </span>
                        </Tag>
                        <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                            <div style={{ paddingLeft: '5px', color: completedColor, float: 'left' }}>
                                Complete: <b>{item.complete}</b>
                            </div>
                            <div style={{ paddingLeft: '5px', color: dueColor, float: 'right' }}>
                                Due: <b>{item.due}</b>
                            </div>
                        </div>
                    </div>)}
            </div>
            <div style={{ clear: 'both', marginBottom: '15px' }}></div>

            {sprintTaskList &&
                <div style={{ marginLeft: '-40px' }} className={styles.taskList}>
                    <ul>
                        {sprintTaskList.result.map((item, index) => (
                            <li key={index}
                                style={{
                                    background: 'rgb(255, 255, 255)',
                                    marginBottom: '3px',
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                    listStyle: 'none',
                                    padding: '3px 10px 0px',
                                    borderRadius: '5px',
                                    transition: 'all 500ms ease'
                                }}
                            >
                                <Row gutter={24}>
                                    <Col span={18}>
                                        <a style={{ color: 'black' }} href="javascript:;" onClick={() => {
                                            dispatch(editTask(sprintName, item._id))
                                        }}>
                                            {++index}. {item.taskName}
                                        </a>


                                        {/* --- Est Hour --- */}
                                        <span style={{ color: 'black', marginLeft: '5px', marginRight: '5px' }}>
                                            #<b>{item.estHour}</b>
                                        </span>


                                        {/* --- Task Rate --- */}
                                        <Rate
                                            onChange={(value) => dispatch(updateRunningTask({
                                                _id: item._id,
                                                rate: value
                                            }))}
                                            allowHalf value={item.rate} style={{ fontSize: '13px', marginLeft: '10px' }}
                                        />


                                        {/* ---- Add Subtask Plus Icon ----  */}
                                        <Icon
                                            onClick={() => dispatch(addNewSubTask(item._id))}
                                            type="plus-circle"
                                            style={{ cursor: 'pointer', marginLeft: '5px', color: 'green' }}
                                        />

                                        {/* ----- Sub Task ----- */}
                                        <_SubTask
                                            {...props}
                                            subTasks={item.subTasks}
                                            taskId={item._id}
                                            sprintName={sprintName}
                                        />
                                    </Col>

                                    {/* ----- Task Type----- */}
                                    <Col span={2} align="left">
                                        <_TaskType
                                            taskType={item.taskType}
                                            projectName={item.projectName}
                                        />
                                    </Col>

                                    <Col span={4} align="right">

                                        <Row gutter={24}>
                                            <Col span={14} align="center">

                                                {
                                                    item.release &&
                                                    // <Tooltip title={item.description}>
                                                    <Tag color="blue">{item.release}</Tag>
                                                    // </Tooltip>
                                                }

                                                {/* ---- Task status for KanbanBoard ---- */}
                                                {!item.completedAt &&
                                                    <Switch
                                                        onChange={() => dispatch(updateRunningTask({
                                                            _id: item._id,
                                                            running: !item.running
                                                        }))}
                                                        style={{ marginRight: '5px', marginTop: '10px' }}
                                                        size="small"
                                                        checked={item.running}
                                                    />
                                                }
                                            </Col>

                                            <Col span={10} align="right">

                                                <div style={{ display: 'flex' }}>
                                                    {/* ---- Task Percent ---- */}
                                                    <Progress type="circle" percent={item.percent} width={50} style={{ padding: '5px', }} />

                                                    {
                                                        (handlePermission(props, 'sprint_task_delete')) &&
                                                        <Popconfirm title="Are you sure to remove from sprint?"
                                                            onConfirm={(e) => confirm(item)}
                                                            okText="Yes" cancelText="No">

                                                            <a href="javascript:;">
                                                                <Icon type="close-circle" theme="twoTone" />
                                                            </a>
                                                        </Popconfirm>
                                                    }
                                                </div>

                                            </Col>
                                        </Row>

                                    </Col>

                                </Row>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </Spin>
    )
}