import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AboutUs from '../AboutUs/'
import User from '../User'
import UserRole from '../UserRole'
import Project from '../Project'
import PublicHoliday from '../PublicHoliday'
import UpcomingTask from '../UpcomingTask'
import AdminDashboard from '../AdminDashboard'
import Release from '../Release'
import Reports from '../Reports'
import UploadFile from '../UploadFile'

export const AdminRoutes = (props) => {
    
    const { path, url } = props.match

    return (
        <Switch>
            <Route exact path={`${path}`} component={AdminDashboard} />
            <Route path={`${path}/users`} component={User} />
            <Route path={`${path}/users-role`} component={UserRole} />
            <Route path={`${path}/project`} component={Project} />
            <Route path={`${path}/public-holiday`} component={PublicHoliday} />
            <Route path={`${path}/upcoming-task`} component={UpcomingTask} />
            <Route path={`${path}/release`} component={Release} />
            <Route path={`${path}/reports`} component={Reports} />
            <Route path={`${path}/upload`} component={UploadFile} />
            <Route path={`${path}/customer`} render={() => <h2>Customers</h2>} />
            <Route render={() => <h2>Not Found Admin Panel child component</h2>} />
        </Switch>
    )
}
