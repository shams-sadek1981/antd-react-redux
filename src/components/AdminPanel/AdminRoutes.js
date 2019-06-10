import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AboutUs from '../AboutUs/'
import User from '../User'
import UpcomingTask from '../UpcomingTask'
import AdminDashboard from '../AdminDashboard'
import Release from '../Release'
import Reports from '../Reports'

export const AdminRoutes = (props) => {
    
    const { path, url } = props.match

    return (
        <Switch>
            <Route exact path={`${path}`} component={AdminDashboard} />
            <Route path={`${path}/users`} component={User} />
            <Route path={`${path}/upcoming-task`} component={UpcomingTask} />
            <Route path={`${path}/release`} component={Release} />
            <Route path={`${path}/reports`} component={Reports} />
            <Route path={`${path}/customer`} render={() => <h2>Customers</h2>} />
            <Route render={() => <h2>Not Found Admin Panel child component</h2>} />
        </Switch>
    )
}
