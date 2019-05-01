import React from 'react'
import { List } from 'antd';


export const _ChangeLog = (props) => {

    const { description } = props

    const data = description.split(/\r\n|\n|\r/);

    return (
        <ol>
            {
                data.map( (item, index) => (
                    <li key={index}>{ item }</li>
                ))
            }
        </ol>
        // <List
        //     size="small"
        //     header={<div style={{ fontWeight: 'bold'}}>Change Log</div>}
        //     bordered
        //     dataSource={data}
        //     renderItem={item => (<List.Item>{item}</List.Item>)}
        // />
    )
}