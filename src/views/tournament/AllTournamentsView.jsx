import React, { Component } from "react";

import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import SearchList from "../../components/list/SearchList";

class AllTournamentsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            tournaments:[],
            selectedTournament:{}
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
                <SearchList objects={this.state.tournaments} src="tournaments"/>
            </div>
        );
    }
}

export default AllTournamentsView;