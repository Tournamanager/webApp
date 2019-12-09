import React, { Component } from "react";
import TournamentTeamListComponent from "../../components/tournament/TournamentTeamListComponent";
import TournamentMatchListComponent from "../../components/tournament/TournamentMatchListComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";


class TournamentDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournament: {
                name: "TournamentName",
                teams: [],
                matches: []
            }
        }
    }

    getTournament() {
        const body = "query{ tournament(id: 1) {name, teams{name}, matches{teamHome {name}, teamAway {name}, date}}}";
        const vars = "{}";
        ApiCommunication.graphQlCallPost(body, vars)
            .then(response => this.setState({tournaments: response.data.data.tournament}))
    }

    componentDidMount()
    {
        this.getTournament()
    }

    render() {
        return (
            <div>
                <h1>{this.state.tournament.name}</h1>
                <h5>Teams</h5>
                <TournamentTeamListComponent teams={this.state.tournament.teams} />
                <h5>Matches</h5>
                <TournamentMatchListComponent matches={this.state.tournament.matches} />
                <h5>Match History</h5>
                <TournamentMatchListComponent matches={this.state.tournament.matches} />
            </div>
        )
    }
}

export default TournamentDetailsView;