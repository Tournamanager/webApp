import React, { Component } from "react";

class MyTournamentsList extends Component {

  onClick() {
    this.props.history.push({
      pathname: "/tournament",
      id: this.props.object.id
    });
  }

  render() {
    let start = "";
    if (this.props.object.matches !== undefined
        && this.props.object.matches !== null
        && this.props.object.matches.length !== 0){
      start = ", Tournament started!"
    }
    return (
        <tr onClick={() => this.onClick()}>
          {this.props.object.name}, {this.props.object.teams.length}/{this.props.object.numberOfTeams}{start}
        </tr>
    )
  }
}

export default MyTournamentsList;