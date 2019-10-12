import React, { Fragment } from 'react'
import { List, Button, Progress, Timeline, Icon, Popconfirm, Tag, Row, Col } from 'antd';

import { deleteTaskFromSprint, editTask } from '../../actions/sprintActions'
import { _TaskStatus } from './_TaskStatus'
import { _TaskEstHour } from './_TaskEstHour'
import { handlePermission } from '../../functions'

import styles from './styles.module.less'

export const TaskList = (props) => {

    const { dispatch, sprint, sprintName, userDetails } = props

    const taskListBySprint = sprint.taskList.filter(item => item.sprintName == sprintName)

    const sprintList = taskListBySprint[0]

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

            <div style={{ marginLeft: '60px' }}>
                {userDetails.map((item, index) =>
                    <div key={index} style={{ float: 'left', border: '1px solid #c0c0c057', borderRadius: '5px', padding: '10px', marginRight: '10px' }}>
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

            {sprintList &&
                <div className={styles.taskList}>
                    <ul>
                        {sprintList.result.map((item, index) => (
                            <li key={index} style={{ background: 'rgb(255, 255, 255)', marginBottom: '3px', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                <Row gutter={24}>
                                    <Col span={19}>
                                        <a href="javascript:;" onClick={() => {
                                                dispatch(editTask(sprintName, item._id))
                                        }}>
                                            {++index}. {item.taskName}
                                        </a>
                                        
                                        <_TaskStatus subTasks={item.subTasks} />
                                    </Col>

                                        <Col span={2} align="right">
                                            <_TaskEstHour
                                                subTasks={item.subTasks}
                                                taskType={item.taskType}
                                                projectName={item.projectName}
                                            />
                                        </Col>

                                        <Col span={3} align="right">
                                            <Progress type="circle" percent={item.percent} width={50} style={{ padding: '5px 10px', }} />
                                            {
                                                (handlePermission(props, 'release_task_delete')) &&
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