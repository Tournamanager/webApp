import React, { Component } from "react";

import ApiCommunication from "../../services/apicommunication/ApiCommunication";

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

                <TournamentList tournaments={this.state.tournaments}></TournamentList>


            </div>
        );
    }
}

export default AllTournamentsView;
