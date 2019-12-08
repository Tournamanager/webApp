import React, { Component } from "react";
import TournamentTeamListComponent from "../../components/tournament/TournamentTeamListComponent";
import TournamentMatchListComponent from "../../components/tournament/TournamentMatchListComponent";


class TournamentDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournament: {
                name: "TournamentName"
            }
        }
    }

    render() {
        return (
            <div>
                <h1>{this.state.tournament.name}</h1>
                <h5>Teams</h5>
                <TournamentTeamListComponent />
                <h5>Matches</h5>
                <TournamentMatchListComponent />
                <h5>Match History</h5>
                <TournamentMatchListComponent />
            </div>
        )
    }
}

export default TournamentDetailsView;