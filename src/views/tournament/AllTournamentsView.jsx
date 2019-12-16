import React, { Component } from "react";

import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import SearchList from "../../components/list/SearchList";

class AllTournamentsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournaments:[],
            isSet: false
        };
    }

    componentDidMount() {
        this.getAllTournaments()
    }

    getAllTournaments() {
        const body = "query {tournaments{id name teams {id} numberOfTeams}}";
        const vars = "{}";
        ApiCommunication.graphQlCallPost(body, vars)
            .then(response => this.setState({tournaments: response.data.data.tournaments}))
    }

    setActiveTournament(tournament) {
        alert(tournament.name)
    }

    render() {
        return (
            <div>
                <h1>All Active Tournaments</h1>
                <SearchList objects={this.state.tournaments} isSet={this.state.isSet} src="tournaments"/>
            </div>
        );
    }
}

export default AllTournamentsView;