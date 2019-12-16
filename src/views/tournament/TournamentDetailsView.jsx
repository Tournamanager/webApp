import React, {Component} from "react";
import TournamentTeamListComponent from "../../components/tournament/TournamentTeamListComponent";
import TournamentMatchListComponent from "../../components/tournament/TournamentMatchListComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";


class TournamentDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournamentId: 1,
            tournament: {
                name: "TournamentName",
                teams: [
                    {
                        name: "The A Team"
                    },
                    {
                        key: "2", name: "The B Team"
                    }
                ],
                matches: [
                    {
                        teamHome: {name: "The A Team"},
                        teamAway: {name: "The B Team"},
                        date: "2020-01-01"
                    },
                    {
                        teamHome: {name: "The A Team"},
                        teamAway: {name: "The B Team"},
                        date: "2019-12-01"
                    },
                ],
                // teams: [],
                // matches: [],
                numberOfTeams: 8,
            }
        }
    }

    getTournament(id) {
        ApiCommunication.graphQLRequest(
            "query", 
            "tournament", 
            "name teams{name} matches{teamHome {name} teamAway {name} date}",
                {
                name: "id", 
                type: "Int", 
                value: id
            })
            .then(response => this.setState({tournaments: response.data.data.tournament}))
    }

    componentDidMount() {
        this.getTournament(this.props.id)
    }

    getUpcomingMatches() {
        let upcomingMatches = [];
        for (let match of this.state.tournament.matches) {
            if (new Date(match.date) >= new Date()) {
                upcomingMatches.push(match)
            }
        }
        return upcomingMatches
    }

    getPassedMatches() {
        let passedMatches = [];
        for (let match of this.state.tournament.matches) {
            if (new Date(match.date) < new Date()) {
                passedMatches.push(match)
            }
        }
        return passedMatches
    }

    render() {
        return (this.state.tournament == null ?
                <div className={"alert-warning"}>
                    <p> Tournament not found. Try a different tournament! </p>
                </div> :
                <div>
                    <h1>{this.state.tournament.name}</h1>
                    <div className={"row justify-content-md-center"}>
                        <div className={"col-sm-4"}>
                            <TournamentTeamListComponent teams={this.state.tournament.teams}
                                                         numberOfTeams={this.state.tournament.numberOfTeams}
                                                         class="col-sm"/>
                        </div>
                        <div className={"col-sm-8"}>
                            <div>
                                <h5>Matches</h5>
                                <TournamentMatchListComponent matches={this.getUpcomingMatches()}/>
                            </div>
                            <div>
                                <h5>Match History</h5>
                                <TournamentMatchListComponent matches={this.getPassedMatches()}/>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default TournamentDetailsView;