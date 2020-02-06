import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import AboutUs from '../AboutUs/'
import User from '../User'
import UserPersonalReport from '../UserPersonalReport'
import EvaluationReport from '../EvaluationReport'
import UserRole from '../UserRole'
import Project from '../Project'
import PublicHoliday from '../PublicHoliday'
import UpcomingTask from '../UpcomingTask'
import AdminDashboard from '../AdminDashboard'
import Release from '../Release'
import Sprint from '../Sprint'
import Reports from '../Reports'
import UploadFile from '../UploadFile'
import ChangePassword from '../ChangePassword'

import { PermissionRoute } from '../../functions'

export const AdminRoutes = (props) => {
    
    const { path, url } = props.match
    const { users } = props
    
    return (
        <Switch>
            <Route exact path={`${path}`} component={AdminDashboard} />
            
            <PermissionRoute path={`${path}/users`} component={User} permissionName="menu_user" users={users}/>
            
            <Route path={`${path}/user-report`} component={UserPersonalReport}/>

            <PermissionRoute path={`${path}/evaluation`} component={EvaluationReport} permissionName="menu_user_role" users={users}/>

            <PermissionRoute path={`${path}/users-role`} component={UserRole} permissionName="menu_user_role" users={users}/>
            
            <PermissionRoute path={`${path}/project`} component={Project} permissionName="menu_project" users={users}/>
            
            <PermissionRoute path={`${path}/public-holiday`} component={PublicHoliday} permissionName="menu_public_holiday" users={users}/>
            
            <PermissionRoute path={`${path}/upcoming-task`} component={UpcomingTask} permissionName="menu_upcoming_task" users={users}/>
            
            <PermissionRoute path={`${path}/release`} component={Release} permissionName="menu_release" users={users}/>
            
            <PermissionRoute path={`${path}/sprint`} component={Sprint} permissionName="menu_sprint" users={users}/>
            
            <PermissionRoute path={`${path}/reports`} component={Reports} permissionName="menu_reports" users={users}/>
            
            <PermissionRoute path={`${path}/upload`} component={UploadFile} permissionName="menu_upload" users={users}/>

            <Route path={`${path}/change-password`} component={ChangePassword}/>

            <Route render={() => <h2>Not Found Admin Panel child component</h2>} />
        </Switch>
    )
}
