import React, { Component } from "react";
import TournamentTeamListComponent from "../../components/tournament/TournamentTeamListComponent";
import TournamentMatchListComponent from "../../components/tournament/TournamentMatchListComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TournamentDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTournament() {
    ApiCommunication.graphQLRequest(
      "query",
      "tournament",
      "id name numberOfTeams description teams{id name} rounds{matches{teamHome {name} teamAway {name} date}}",
      [
        {
          name: "id",
          type: "ID",
          value: this.props.match.params.id
        }
      ]
    ).then(response =>
      this.setState({ tournament: response.data.data.tournament })
    );
  }

  componentDidMount() {
    this.getTournament();
  }

  getUpcomingMatches() {
    let upcomingMatches = [];
    for (let round of this.state.tournament.rounds) {
      for (let match of round) {
        if (new Date(match.date) >= new Date()) {
          upcomingMatches.push(match);
        }
      }
    }
    return upcomingMatches;
  }

  getPassedMatches() {
    let passedMatches = [];
    for (let round of this.state.tournament.rounds) {
      for (let match of round) {
        if (new Date(match.date) < new Date()) {
          passedMatches.push(match);
        }
      }
    }
    return passedMatches;
  }

  startTournament() {
    ApiCommunication.graphQLRequest("mutation", "generateMatches", "id", [
      { name: "id", type: "Int", value: this.state.tournament.id },
      { name: "method", type: "String", value: "competition" }
    ])
  }

  render() {
    return this.state.tournament == null ? (
      <div className={"alert-warning"}>
        <p> Tournament not found. Try a different tournament! </p>
      </div>
    ) : (
        <div>
          <div>
            <h1 className="ml-3 text-center">{this.state.tournament.name}
              <button className="btn btn-primary ml-3 mb-1" onClick={() => this.props.history.push("/editTournament/" + this.state.tournament.id)}>
                <i style={{ verticalAlign: 'middle', fontSize: '28px' }} class="material-icons">edit</i></button></h1>
            <hr />

          </div>
          <div className={"row justify-content-md-center"} style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div className={"col-sm-4"}>
              <TournamentTeamListComponent
                teams={this.state.tournament.teams}
                numberOfTeams={this.state.tournament.numberOfTeams}
                class="col-sm"
                {...this.props}
              />
            </div>
            <div className={"col-sm-8"}>
              <div>
                <h5>Matches</h5>
                <TournamentMatchListComponent
                  matches={this.getUpcomingMatches()}
                  {...this.props}
                />
              </div>
              <div>
                <h5>Match History</h5>
                <TournamentMatchListComponent matches={this.getPassedMatches()} />
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <button className="btn btn-primary ml-3 mb-1" onClick={() => this.startTournament}>Start Tournament</button>
          </div>

        </div>
      );
  }
}

export default TournamentDetailsView;
