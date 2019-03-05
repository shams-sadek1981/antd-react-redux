import React from 'react'

import { addUser } from '../../actions/userActions';

export const AddUser = (props) => {

    return (
        <div>
            <h3>User Form</h3>
                
                <label htmlFor="userName">Name</label>
                <input type="text" name="userName" defaultValue="Habib" id="userName"/>
                
                <input type="button" value="Add User"/>
        </div>
    )
}