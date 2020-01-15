import React, { Component } from 'react';


class UserDetailHeaderComponent extends Component {

    render() {
        return (
            <div>
                <h1 className="jumbotron text-center">Welcome, {this.props.name}</h1>

            </div>
        )
    }
}

export default UserDetailHeaderComponent;
