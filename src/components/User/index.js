import React, { Component } from 'react'
import { connect } from 'react-redux'

import { AddUser } from './AddUser'
class User extends Component {

    render(){

        return (
            <div>
                <AddUser />

                <h4>User List...</h4>


                {
                    this.props.users.userList.map( (user, index) => (
                        <div key={index}>
                            <p>User Name: { user.name}</p>
                            <p>User Age: { user.age}</p>
                            <hr/>
                        </div>
                    ))
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    users: state.userReducer
})

export default connect(mapStateToProps)(User)
