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
        <Row style={{marginLeft: "10px"}}>
          <h1>All Active Tournaments</h1>
          <button onClick={this.redirectToTarget}>+</button>
        </Row>
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
