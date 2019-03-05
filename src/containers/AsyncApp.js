import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { changeName } from '../actions/todoActions';

import User from '../components/User'

class AsyncApp extends Component {

    render(){
        return (
            <div>
                <h1>Hello World</h1>

                <User/>

                <h2>{ this.props.todo.name }</h2>

                <button onClick={ () => this.props.dispatch( changeName('Faiza Fatema') ) }>Change Name</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    todo: state.todoReducer,
})

export default connect(mapStateToProps)(AsyncApp)