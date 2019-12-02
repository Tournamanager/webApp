import React, { Component } from 'react';

class TeamRowComponent extends Component {

    render() {
        return (
            <div>
               <h5>{this.props.data.team.name}</h5>
                <p>this is a team row btw</p>
            </div>
        )
    }
}

export default TeamRowComponent;
