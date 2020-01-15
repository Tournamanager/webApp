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

  redirectToTarget() {
    this.props.history.push({ pathname: "/createTournament" })
  }

  render() {
    return (
      <div>
        <h1 className="ml-3">
            All Active Tournaments
            <button className="btn btn-dark float-right mr-3 mt-1" onClick={() => this.props.history.push("/createTournament")}>
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
