import React, { Fragment } from 'react'
import { Tag, Badge, Icon, Tooltip } from 'antd';

import { editSubTask, addNewSubTask } from '../../actions/sprintActions'

export const _SubTask = (props) => {

    const { subTasks, dispatch, taskId, taskName, sprintName } = props

    return (
        <div style={{ paddingTop: '10px', display: 'flex', flexWrap: 'wrap' }}>
            {
                subTasks.map((subTask, index) => {

                    let style = { color: '#ff0000d4' }
                    let badgeStyle = { backgroundColor: '#ff0000ab' }

                    if (subTask.completedAt) {
                        style = { color: 'green' }
                        badgeStyle = { backgroundColor: '#52c41a' }
                    }

                    return (
                        <div key={index} style={style}>
                            <a style={style} href="javascript:;" onClick={() => {
                                dispatch(editSubTask(sprintName, taskId, subTask._id))
                            }}>
                                |
                                    <span style={{ padding: '5px', fontStyle: 'italic' }}>
                                    <span>{subTask.assignedUser}:</span>
                                    <span style={{ fontWeight: 'bold' }}>{subTask.estHour}:</span>
                                    <span style={{ color: "#0000ffbd" }}>{subTask.name}</span>
                                </span>
                                {subTask.refLink &&
                                    <a href={subTask.refLink} target="_blank" style={{ marginLeft: '2px', marginRight: '2px' }}>
                                        <Icon type="link" style={{ fontSize: '17px', color: '#08c' }} />
                                    </a>
                                }
                                |
                            </a>

                        </div>
                    )

                })
            }

            <Icon
                className="add-subtask-top"
                onClick={() => dispatch(addNewSubTask(taskId, taskName))}
                type="plus-circle"
                style={{ cursor: 'pointer', marginLeft: '10px', color: 'green' }}
            />
        </div>
    )
}