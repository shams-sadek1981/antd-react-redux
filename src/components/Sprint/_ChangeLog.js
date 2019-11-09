import React, { Fragment } from 'react'
import { List } from 'antd';


export const _ChangeLog = (props) => {

    const { description } = props

    const data = description.split(/\r\n|\n|\r/);

    return (
        <Fragment>
            {
                data.map((item, index) => (
                    (item != "") &&
                    <div key={index} style={{ marginLeft: '60px'}}>
                        {item}
                    </div>
                ))
            }
        </Fragment>
    )
}