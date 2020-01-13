import React, { Component } from "react";
import SearchList from "../../components/list/SearchList";
import firebase from "firebase";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";


class JoinTournamentView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      isSet: false
    };
  }

  componentDidMount() {
    this.getAllTournaments();
  }

  getAllTournaments() {
    ApiCommunication.graphQLRequest("query", "tournaments", "id name numberOfTeams teams{id}").then (
      response => {
        this.setState({tournaments: response.data.data.tournaments, isSet: true})
        });
  }

  render() {
    return (
      <div>
        <h1 className="jumbotron text-center">team A</h1>
        <SearchList objects={this.state.tournaments} isSet={this.state.isSet} src="joinTournament" {...this.props} />
      </div>
    );
  }
}

export default JoinTournamentView;
