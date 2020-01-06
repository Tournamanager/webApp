import React, { Component } from "react";

class TournamentListComponent extends Component {
  constructor(props) {
    super(props);
  }

  redirectToTarget = () => {
    this.props.history.push({
      pathname: "/tournament",
      id: this.props.object.id
    });
  };

  render() {
    return (
      <tr onClick={() => this.redirectToTarget()}>
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
