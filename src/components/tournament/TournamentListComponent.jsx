import React, { Component } from "react";

class TournamentListComponent extends Component {

    onClick() {
        this.props.history.push({
            pathname: "/tournament",
            id: this.props.object.id
        });
    }

    render() {
        return (
            <tr onClick={() => this.onClick()}>
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