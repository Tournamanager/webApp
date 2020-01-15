import React, { Component } from 'react';


class UserDetailHeaderComponent extends Component {

    render() {
        return (
            <div>
                <h1 className="jumbotron text-center">{this.props.name}'s profile</h1>

            </div>
        )
    }
}

export default UserDetailHeaderComponent;
