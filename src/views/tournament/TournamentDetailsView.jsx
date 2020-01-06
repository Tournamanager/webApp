import React, { Component } from "react";
import TournamentTeamListComponent from "../../components/tournament/TournamentTeamListComponent";
import TournamentMatchListComponent from "../../components/tournament/TournamentMatchListComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TournamentDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getTournament(id) {
    ApiCommunication.graphQLRequest(
      "query",
      "tournament",
      "name numberOfTeams description teams{name} matches{teamHome {name} teamAway {name} date}",
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
    this.getTournament(this.props.location.id);
  }

  getUpcomingMatches() {
    let upcomingMatches = [];
    for (let match of this.state.tournament.matches) {
      if (new Date(match.date) >= new Date()) {
        upcomingMatches.push(match);
      }
    }
    return upcomingMatches;
  }

  getPassedMatches() {
    let passedMatches = [];
    for (let match of this.state.tournament.matches) {
      if (new Date(match.date) < new Date()) {
        passedMatches.push(match);
      }
    }
    return passedMatches;
  }

  startTournament() {
    ApiCommunication.graphQLRequest("mutation", "startTournament", null, [
      { name: "id", type: "Int", value: this.state.tournamentId }
    ]);
  }

  render() {
    return this.state.tournament == null ? (
      <div className={"alert-warning"}>
        <p> Tournament not found. Try a different tournament! </p>
      </div>
    ) : (
      <div>
        <div className={"row"}>
          <h1 className={"col-sm-11"}>{this.state.tournament.name}</h1>
          <button onClick={() => this.props.history.push("/editTournament")}>Edit</button>
        </div>
        <div className={"row justify-content-md-center"}>
          <div className={"col-sm-4"}>
            <TournamentTeamListComponent
              teams={this.state.tournament.teams}
              numberOfTeams={this.state.tournament.numberOfTeams}
              class="col-sm"
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
        <button onClick={() => this.startTournament}>Start Tournament</button>
      </div>
    );
  }
}

export default TournamentDetailsView;
