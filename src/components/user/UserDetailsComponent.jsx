import React, { Component } from 'react';

class UserDetailsComponent extends Component {

    render() {
        return (
            <div>
                <div>
                    <h5>{this.props.data.name}</h5>
                </div>
                <div>
                    {this.props.data.teams.forEach(team => {
                        <h5>{team.name}</h5>
                    })}
                </div>
                <div>
                    {this.props.data.tournaments.forEach(tournament => {
                        <h5>{tournament.name}</h5>
                    })}
                </div>
            </div>
        )
    }
}

export default UserDetailsComponent;
