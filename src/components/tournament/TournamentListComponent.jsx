import React, { Component } from "react";

class TournamentListComponent extends Component {

    render() {
        return (
            <tr>
                <td width="50%">
                    {this.props.object.name}
                </td>
                <td width="50%">
                    Teams: {this.props.object.teams.length}/{this.props.object.numberOfTeams}
                </td>
            </tr>
        )
    }
}

export default TournamentListComponent;