import React, {Component} from "react";
import TournamentTeamListComponent from "../../components/tournament/TournamentTeamListComponent";
import TournamentMatchListComponent from "../../components/tournament/TournamentMatchListComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";


class TournamentDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // tournamentId: 1,
            // tournament: {
            //     name: "TournamentName",
            //     teams: [{key:"1", name: "The A Team"}, {key:"2", name: "The B Team"}],
            //     // teams: [],
            //     matches: [],
            //     numberOfTeams: 8,
            // }
        }
    }

    getTournament() {
        const body = "query q($id:ID!){tournament(id: $id){name, teams{name}, matches{teamHome {name}, teamAway {name}, date}, numberOfTeams}}";
        const vars = `{ id: ${this.state.tournamentId} }`;
        ApiCommunication.graphQlCallPost(body, vars)
            .then(response => this.setState({tournaments: response.data.data.tournament}))
    }

    componentDidMount() {
        this.getTournament()
    }

    render() {
        return ( this.state.tournament == null ?
            <div className={"alert-warning"}>
                <p> Tournament not found. Try a different tournament! </p>
            </div> :
            <div>
                <h1>{this.state.tournament.name}</h1>
                <div className={"row justify-content-md-center"}>
                    <div className={"col-sm-4"}>
                        <TournamentTeamListComponent teams={this.state.tournament.teams} numberOfTeams={this.state.tournament.numberOfTeams} class="col-sm"/>
                    </div>
                    <div className={"col-sm-8"}>
                        <h5>Matches</h5>
                        <TournamentMatchListComponent matches={this.state.tournament.matches}/>
                        <h5>Match History</h5>
                        <TournamentMatchListComponent matches={this.state.tournament.matches}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default TournamentDetailsView;