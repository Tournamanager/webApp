import React, { Component } from "react";

import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import SearchList from "../../components/list/SearchList";

class AllTournamentsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      tournaments: [],
      selectedTournament: {}
    };

    this.redirectToCreateTournament = this.redirectToCreateTournament.bind(
      this
    );
  }

  getAllTournaments() {
    const body = "query {tournaments{name}}";
    const vars = "{}";
    ApiCommunication.graphQlCallPost(body, vars).then(response =>
      this.setState({ tournaments: response.data.data.tournaments })
    );
  }

  componentDidMount() {
    this.getAllTournaments();
  }

  setActiveTournament(tournament) {
    alert(tournament.name);
  }

  redirectToCreateTournament = () => {
    this.props.history.push({ pathname: "/createTournament" });
  };

  render() {
    return (
      <div>
        <h1>All Active Tournaments</h1>
        <SearchList objects={this.state.tournaments} src="tournaments" />
        <button
          className="btn btn-primary"
          onClick={this.redirectToCreateTournament}
        >
          Create Tournament
        </button>
      </div>
    );
  }
}

export default AllTournamentsView;
