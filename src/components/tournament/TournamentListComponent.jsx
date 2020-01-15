import React, { Component } from "react";

class TournamentListComponent extends Component {
  
  render() {
    return (
      <tr style={{ 'cursor': 'default' }}>
        <div className="card text-center" style={{ 'margin': '15px auto', 'max-width': '1200px' }}>
          <div className="card-header">
            <h5 className="card-title">{this.props.object.name}</h5>
          </div>
          <div className="card-body">
            <p className="card-text">{this.props.object.description}</p>
            <a href="#" className="btn btn-primary" onClick={() => this.redirectToTarget()}>Details</a>
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
