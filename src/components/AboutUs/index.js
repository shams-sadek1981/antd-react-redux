import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class AboutUs extends Component {
    render() {
        return (
            <div>
                <h1>About US</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // dashboard: state.dashboardReducer
})

export default withRouter(connect(mapStateToProps)(AboutUs))
