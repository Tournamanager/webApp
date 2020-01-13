import React, { Component } from "react";

class TournamentListComponent extends Component {
  
  render() {
    return (
      <tr onClick={() => this.props.history.push("/tournament/" + this.props.object.id)}>
        <td width="50%">{this.props.object.name}</td>
        <td width="50%">
          Teams: {this.props.object.teams.length}/
          {this.props.object.numberOfTeams}
        </td>
      </tr>
    );
  }
}

export default TournamentListComponent;
