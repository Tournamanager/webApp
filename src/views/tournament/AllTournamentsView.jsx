import React, { Component } from "react";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import SearchList from "../../components/list/SearchList";

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
      "id name numberOfTeams description teams {name}"
    ).then(response => {
      this.setState({
        tournaments: response.data.data.tournaments,
        isSet: true
      })
    });
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
        <h1 className="ml-3 text-center">
          All Active Tournaments
          <button className="btn btn-primary ml-3 mb-1" onClick={this.redirectToTarget}>
            <i style={{ verticalAlign: 'middle', fontSize: '28px' }} className="material-icons">add_circle</i>
          </button>
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
