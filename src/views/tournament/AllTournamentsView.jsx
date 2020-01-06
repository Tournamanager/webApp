import React, { Component } from "react";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import SearchList from "../../components/list/SearchList";
import { Row } from "react-bootstrap"

class AllTournamentsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      isSet: false
    };
    this.redirectToTarget = this.redirectToTarget.bind(this)
  }

  componentDidMount() {
    this.getAllTournaments();
  }

  getAllTournaments() {
    ApiCommunication.graphQLRequest(
      "query",
      "tournaments",
      "id name numberOfTeams teams {name}"
    ).then(response =>
      this.setState({
        tournaments: response.data.data.tournaments,
        isSet: true
      })
    );
  }

  setActiveTournament(tournament) {
    alert(tournament.name);
  }

  redirectToTarget() {
    this.props.history.push({ pathname: "/createTournament" })
  }

  render() {
    return (
      <div>
        <h1 className="ml-3">
            All Active Tournaments
            <button className="btn btn-primary float-right mr-3 mt-1" onClick={this.redirectToTarget}>+</button>
        </h1>
        <SearchList
          objects={this.state.tournaments}
          isSet={this.state.isSet}
          {...this.props}
          src="tournaments"
        />
      </div>
    );
  }
}

export default AllTournamentsView;
