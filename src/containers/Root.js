import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import configureStore from '../configureStore'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomeLayout from '../components/HomeLayout'
import AdminPanel from '../components/AdminPanel'
import { PrivateRoute } from '../functions'

const store = configureStore()

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        {/* <PrivateRoute path="/admin-panel/:id?" component={ AdminPanel }/> */}
                        <PrivateRoute path="/admin-panel" component={ AdminPanel }/>
                        <Route path="/" component={HomeLayout}/>

                        {/* <Route path="/:id?" component={HomeLayout}/> */}
                    </Switch>
                </Router>
            </Provider>
        )
    }
}