import React, { Component } from 'react'
import { connect } from 'react-redux'

class Project extends Component {
    render() {
        return (
            <div>
                <h2>Project</h2>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    projectInfo: state.projectReducer
})

export default connect(mapStateToProps)(Project)
