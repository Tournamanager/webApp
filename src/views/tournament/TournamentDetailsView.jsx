import React, { Component } from "react";
import TournamentTeamListComponent from "../../components/tournament/TournamentTeamListComponent";
import TournamentMatchListComponent from "../../components/tournament/TournamentMatchListComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TournamentDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.redirectEdit = this.redirectEdit.bind(this);
    this.startTournament = this.startTournament.bind(this);
  }

  getTournament(id) {
    ApiCommunication.graphQLRequest(
      "query",
      "tournament",
      "id name numberOfTeams description teams{name} matches{teamHome {name} teamAway {name} date}",
      [
        {
          name: "id",
          type: "ID",
          value: id
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
    ApiCommunication.graphQLRequest("mutation", "generateMatches", "id", [
      { name: "id", type: "Int", value: this.state.tournament.id },
      { name: "method", type: "String", value: "competition"}
    ])
  }

  redirectEdit() {
    this.props.history.push({
      pathname: "/editTournament",
      id: this.state.tournament.id
    });
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
          <button onClick={this.redirectEdit}>Edit</button>
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
              />
            </div>
            <div>
              <h5>Match History</h5>
              <TournamentMatchListComponent matches={this.getPassedMatches()} />
            </div>
          </div>
        </div>
        <button onClick={this.startTournament}>Start Tournament</button>
      </div>
    );
  }
}

export default TournamentDetailsView;
