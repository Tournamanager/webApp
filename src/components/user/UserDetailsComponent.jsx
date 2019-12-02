import React, { Component } from 'react';

class UserDetailsComponent extends Component {

    render() {
        return (
            <div>
               <h5>{this.props.data.name}</h5>
            </div>
        )
    }
}

export default UserDetailsComponent;
