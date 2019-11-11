import React, { Fragment } from 'react'
import { Tag, Badge, Icon } from 'antd';

import { editSubTask, addNewSubTask } from '../../actions/sprintActions'

export const _SubTask = (props) => {

    const { subTasks, dispatch, taskId, sprintName } = props

    return (
        <div style={{ paddingTop: '10px', display: 'flex' }}>
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
                                |
                            </a>
                        </div>
                    )

                })
            }

            {/* ---- Add Subtask Plus Icon ----  */}
            <Icon
                onClick={ () => dispatch(addNewSubTask(taskId))}
                type="plus-circle"
                style={{ cursor: 'pointer', marginLeft: '5px', color: 'green'}}
            />
        </div>
    )
}