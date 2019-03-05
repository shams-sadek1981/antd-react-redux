import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom'

import AsyncApp from './AsyncApp'

import MyLayout from '../components/MyLayout/'

import { changeLoggedIn } from '../actions/userActions'

class Routes extends Component {

    render() {
        
        let MyComponent = MyLayout
        
        if (this.props.userInfo.loggedIn) {
            MyComponent = AsyncApp
        }

        return (
            <div>
                <Router>
                    <Fragment>

                        <button onClick={() => this.props.dispatch(changeLoggedIn())}> {this.props.userInfo.logStatus} </button>


                        { this.props.userInfo.loggedIn && <h1>Hello World</h1>}

                        <ul>
                            {
                                this.props.userInfo.userList.map((item, index) => (
                                    <li key={index}>{item.name}</li>
                                ))
                            }
                        </ul>

                        <ul>
                            <li><NavLink to="/" activeStyle={{ color: 'green' }} exact >Home</NavLink></li>
                            <li><NavLink to="/about" activeStyle={{ color: 'green' }} exact>About</NavLink></li>
                            <li><NavLink to="/about/sadik" activeStyle={{ color: 'green' }} exact>About Sadik</NavLink></li>
                        </ul>


                        <Route path='/' exact component={MyComponent} />


                        <Route path='/about' exact render={() => {
                            return (
                                <div>
                                    <h2>About Page...</h2>

                                    
                                </div>
                            )
                        }} />

                        <Route path='/about/:userName' exact render={({ match }) => {
                            return (
                                <div>
                                    <h2>About Page... {match.params.userName}</h2>
                                </div>
                            )
                        }} />
                    </Fragment>
                </Router>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    userInfo: state.userReducer
})

export default connect(mapStateToProps)(Routes)