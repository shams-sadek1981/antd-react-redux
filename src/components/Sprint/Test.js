import React, { Component } from 'react';

class Test extends Component {
    state = {
        name: 'Sadik'
    }

    render() {
        return (
            <div className="test-1">
                Hello World { this.state.name }
            </div>
        );
    }
}

export default Test;