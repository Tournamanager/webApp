import React, { Component } from 'react';


class AddUserToTeamView extends Component {

    render() {
        return (
            <div>
                <h1 className="jumbotron text-center">team {this.props.name}</h1>
             
            </div>
        )
    }
}

export default AddUserToTeamView;