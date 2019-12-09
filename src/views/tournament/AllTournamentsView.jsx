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
                <h1>All Tournaments</h1>
                {this.state.tournaments.map(tournament => (
                    <div key={tournament.toString() + 'card'}className="card">
                        <div key={tournament.toString() + 'cardbody'} className="card-body">
                            <h5 className="card-title" key={tournament.toString() + ''}>{tournament.name}</h5>
                            <button onClick={() => this.setActiveTournament(tournament)} key={tournament.toString() + 'button'}>Details</button>
                        </div>
                    </div>
                ), )}
            </div>
        );
    }
}

export default AllTournamentsView;
