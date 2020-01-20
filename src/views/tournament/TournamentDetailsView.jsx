import React, { Component } from "react";
import TournamentTeamListComponent from "../../components/tournament/TournamentTeamListComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TournamentDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.startTournament = this.startTournament.bind(this)
  }

  getTournament() {
    ApiCommunication.graphQLRequest(
      "query",
      "tournament",
      "id name numberOfTeams description teams{id name} rounds{ matches{ id teamHome{ name } teamAway{ name } }}",
      [
        {
          name: "id",
          type: "ID",
          value: this.props.match.params.id
        }
      ]
    ).then(response => {
      let tournament = response.data.data.tournament;
      this.setState({ tournament: tournament })
    }
    )
  }

  componentDidMount() {
    this.getTournament();
  }

  startTournament() {
    ApiCommunication.graphQLRequest("mutation", "startTournament", "rounds{ matches{ id teamHome{ name } teamAway{ name } }}",
      [
        { name: "id", type: "Int", value: this.state.tournament.id },
        { name: "method", type: "String", value: "competition" }
      ]).then(response => {
        let tournament = this.state.tournament
        tournament.rounds = response.data.data.startTournament.rounds
        this.setState({ tournament: tournament }, () => console.log(this.state.tournament))
      }
      )
  }

  render() {
    return this.state.tournament == null ? (
      <div className={"alert-warning"}>
        <p> Tournament not found. Try a different tournament! </p>
      </div>
    ) : (
        <div>
          <div className={"row"}>
            <div style={{ width: '100%' }}>
              <h1 className="ml-3 text-center">{this.state.tournament.name}
                <button className="btn btn-primary ml-3 mb-1" onClick={() => this.props.history.push("/editTournament/" + this.state.tournament.id)}>
                  <i style={{ verticalAlign: 'middle', fontSize: '28px' }} className="material-icons">edit</i></button></h1>
              <hr />
            </div>
          </div>

          <div className={"row justify-content-md-center"}>
            <div className={"col-sm-8"}>
              <TournamentTeamListComponent
                teams={this.state.tournament.teams}
                numberOfTeams={this.state.tournament.numberOfTeams}
                className="col-sm"
                {...this.props}
              />
            </div>
          </div>

          <div className={"row justify-content-md-center"} style={{ margin: "20px 0px" }}>
            <h4>matches</h4>
            {this.state.tournament.rounds.length != 0 ? (
              <div className={"row justify-content-md-center"} style={{ width: '100%', textAlign: 'center' }}>
                {this.state.tournament.rounds.map(round => (
                  <div className="col-sm-2">
                    {round.matches.map(match => (
                      <div className={"text-center border"} style={{ margin: '10px 0px' }}>
                        <span style={{ color: '#007BFF', fontWeight: 'bold', margin: '5px', fontSize: '24px' }}>{match.teamHome.name} </span>
                        VS
                         <span style={{ color: '#007BFF', fontWeight: 'bold', margin: '5px', fontSize: '24px' }}>{match.teamAway.name} </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>) : (
                <div style={{ width: '100%', textAlign: 'center' }} className={"row justify-content-md-center"}>No matches have been generated yet</div>
              )}
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <button className="btn btn-primary ml-3 mb-1" onClick={() => this.startTournament()}>Start Tournament</button>
          </div>

        </div>
      );
  }
}

export default TournamentDetailsView;
