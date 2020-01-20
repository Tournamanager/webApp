import React, { Component } from "react";
import SearchList from "../../components/list/SearchList";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";


class JoinTournamentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      team: {},
      isSet: false
    };
  }

  componentDidMount() {
    this.getTeam();
    this.getAllTournaments();
  }

  getAllTournaments() {
    ApiCommunication.graphQLRequest("query", "tournaments", "id name numberOfTeams teams{id}").then (
      response => {
        this.setState({tournaments: response.data.data.tournaments, isSet: true})
        });
  }

  getTeam() {
    ApiCommunication.graphQLRequest(
      "query",
      "team",
      "id name",
      [{ name: "id", type: "ID", value: this.props.match.params.id }])
      .then(response => {
        if (response != null) {
          this.setState({ team: response.data.data.team })
        }
      })
  }

  render() {
    return (
      <div>
        <h1 className="jumbotron text-center">{this.state.team.name}</h1>
        <SearchList objects={this.state.tournaments} isSet={this.state.isSet} src="joinTournament" {...this.props} />
      </div>
    );
  }
}

export default JoinTournamentView;
