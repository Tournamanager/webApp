import React, { Component } from "react";

import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import TournamentListComponent from "../../components/tournament/TournamentListComponent";

class AllTournamentsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            tournaments: [],
            selectedTournament: {}
        };
    }

    getAllTournaments() {
        const body = "query {tournaments{name}}";
        const vars = "{}";
        ApiCommunication.graphQlCallPost(body, vars)
            .then(response => this.setState({tournaments: response.data.data.tournaments}))
    }

    componentDidMount() {
        this.getAllTournaments();
    }

    setActiveTournament(tournament) {
        alert(tournament.name)
    }

    render() {
        return (
            <div>
                <h1>All Active Tournaments</h1>
                <TournamentListComponent tournaments={this.state.tournaments}></TournamentListComponent>
            </div>
        );
    }
}

export default AllTournamentsView;