import React, { Fragment } from 'react'
import { Rate, Button, Progress, Timeline, Icon, Popconfirm, Tag, Row, Col, Switch } from 'antd';

import { deleteTaskFromSprint, editTask, filterByUserName, loadTaskBySprint, updateRunningTask } from '../../actions/sprintActions'
import { _TaskStatus } from './_TaskStatus'
import { _TaskType } from './_TaskType'
import { handlePermission } from '../../functions'

import styles from './styles.module.less'

export const TaskList = (props) => {

    const { dispatch, sprint, sprintName, userDetails } = props

    const sprintTaskList = sprint.taskList.find(item => item.sprintName == sprintName)

    //-- Delete Task From Sprint
    const confirm = item => dispatch(deleteTaskFromSprint(item))

    const randomColor = () => {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 10)];
        }
        return color;
    }

    return (
        <Fragment>

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
                        <Progress type="circle" percent={item.percent} width={50} style={{ marginRight: '25px' }} />
                        <Tag color={randomColor()} style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                            {item.userName}:
                            <span style={{ fontWeight: 'bold', fontSize: '115%', paddingLeft: '5px' }}>
                                {item.estHour}
                            </span>
                        </Tag>
                        <div style={{ marginTop: '5px', fontStyle: 'italic' }}>
                            <div style={{ paddingLeft: '5px', color: 'green', float: 'left' }}>
                                Complete: <b>{item.complete}</b>
                            </div>
                            <div style={{ paddingLeft: '5px', color: 'red', float: 'right' }}>
                                Due: <b>{item.due}</b>
                            </div>
                        </div>
                    </div>)}
            </div>
            <div style={{ clear: 'both', marginBottom: '15px' }}></div>

            {sprintTaskList &&
                <div className={styles.taskList} style={{ marginLeft: '-40px' }}>
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
                                    <Col span={19}>
                                        <a style={{ color: 'black' }} href="javascript:;" onClick={() => {
                                            dispatch(editTask(sprintName, item._id))
                                        }}>

                                            {++index}. {item.taskName}
                                        </a>

                                        {/* --- Est Hour --- */}
                                        <span style={{ fontWeight: 'bold', color: 'green', marginLeft: '5px', marginRight: '5px' }}>
                                            #{item.estHour}
                                        </span>

                                        {/* --- Running --- */}
                                        <Switch
                                            onChange = { () => dispatch(updateRunningTask({
                                                _id: item._id,
                                                running: ! item.running
                                            }))}
                                            style={{ marginRight: '5px'}}
                                            size="small"
                                            checked={item.running}
                                        />

                                        {/* --- Task Rate --- */}
                                        <Rate
                                            onChange = { (value) => dispatch(updateRunningTask({
                                                _id: item._id,
                                                rate: value
                                            }))}
                                            allowHalf value={item.rate} style={{ fontSize: '13px' }}
                                        />

                                        {/* ----- Sub Task ----- */}
                                        <_TaskStatus
                                            {...props}
                                            subTasks={item.subTasks}
                                            taskId={item._id}
                                            sprintName={sprintName}
                                        />
                                    </Col>

                                    {/* ----- Task Type----- */}
                                    <Col span={2} align="right">
                                        <_TaskType
                                            taskType={item.taskType}
                                            projectName={item.projectName}
                                        />
                                    </Col>

                                    <Col span={3} align="right">
                                        <Progress type="circle" percent={item.percent} width={50} style={{ padding: '5px 10px', }} />
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
                                    </Col>

                                </Row>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </Fragment>
    )
}