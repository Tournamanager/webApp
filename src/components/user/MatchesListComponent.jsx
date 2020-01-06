import React, { Component } from "react";

class MyMatchesList extends Component {

  onClick() {
    this.props.history.push({
      pathname: "/match",
      id: this.props.object.id
    });
  }

  render() {
    return (
        <tr onClick={() => this.onClick()}>
          {this.props.object.teamHome.name} - {this.props.object.teamAway.name}, {this.props.object.date}
        </tr>
    )
  }
}

export default MyMatchesList;
