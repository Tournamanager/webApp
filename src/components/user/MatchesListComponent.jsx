import React, { Component } from "react";

class MyMatchesList extends Component {

  render() {
    return (
        <tr onClick={() => this.props.history.push("/match/" + this.props.object.id)}>
          {this.props.object.teamHome.name} - {this.props.object.teamAway.name}, {this.props.object.date}
        </tr>
    )
  }
}

export default MyMatchesList;
