import React from 'react'
import { List } from 'antd';


export const _ChangeLog = (props) => {

    const { description } = props

    const data = description.split(/\r\n|\n|\r/);

    return (
        <ol>
            {
                data.map((item, index) => (
                    (item != "") &&
                    <li key={index}>{item}</li>
                ))
            }
        </ol>
    )
}