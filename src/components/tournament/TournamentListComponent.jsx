import React, { Component } from "react";

class TournamentListComponent extends Component {
  redirectToTarget = () => {
    this.props.history.push({
      pathname: "/tournament/" + this.props.object.id
    });
  };


  render() {
    return (
      <tr style={{ 'cursor': 'default' }}>
        <div className="card text-center" style={{ margin: '15px auto', maxWidth: '1200px' }}>
          <div className="card-header">
            <h5 className="card-title">{this.props.object.name}</h5>
          </div>
          <div className="card-body">
            <p className="card-text">{this.props.object.description}</p>
            <button className="btn btn-primary" onClick={() => this.redirectToTarget()}>Details</button>
          </div>
          <div className="card-footer text-muted">
            Teams: {this.props.object.teams.length}/{this.props.object.numberOfTeams}
          </div>
        </div>
      </tr>
    );
  }
}

export default TournamentListComponent;
