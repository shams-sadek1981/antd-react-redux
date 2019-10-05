import React, { Fragment } from 'react'
import { List } from 'antd';


export const _ChangeLog = (props) => {

    const { description } = props

    const data = description.split(/\r\n|\n|\r/);

    return (
        <Fragment>
            { data.lenght > 0 &&
                <h4>Changelog...</h4>
            }
            
            <ol>
                {
                    data.map((item, index) => (
                        (item != "") &&
                        <li key={index}>{item}</li>
                    ))
                }
            </ol>
        </Fragment>
    )
}