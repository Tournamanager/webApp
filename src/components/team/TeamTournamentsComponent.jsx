import React, { Component } from 'react';
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TeamTournamentsComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tournaments: this.props.tournaments,
            id: this.props.teamId
        };
    }

    leaveTournament(id) {
        ApiCommunication.graphQLRequest("mutation", "removeTeamFromTournament", null, [
            { name: "tournamentId", type: "Int", value: id },
            { name: "teamId", type: "Int", value: this.state.id }
        ]).then(() => {
            this.setState(
                { tournaments: this.state.tournaments.filter(tournament => tournament.id !== id) }
            );
        });
    }

    componentDidMount() {
        this.getAllTournamentsThisTeamIn();
    }

    getAllTournamentsThisTeamIn() {
        ApiCommunication.graphQLRequest("query","tournaments","id name teams {id users {uuid}} numberOfTeams matches {id}")
            .then(response => {
                this.setState({tournaments: response.data.data.tournaments.filter(tournament => {return tournament.teams.some(team => { return team.id === this.props.teamId})})})
            });
    }

    render() {
        return (
            <div className="col-md-5" style={{ margin: '0 auto' }}>
                <div>
                    <h2 style={{ display: 'inline-block' }}>Tournaments</h2>
                    <button
                        onClick={() => this.props.history.push("/joinTournament/" + this.state.id)}
                        style={{ verticalAlign: "super", float: "right" }}
                        type="button"
                        className="btn btn-dark"
                    >
                        <i
                            style={{ verticalAlign: "middle", fontSize: "28px" }}
                            className="material-icons"
                        >
                            add_circle
                        </i>
                    </button>
                </div>

                <ul className="list-group">
                    {this.props.tournaments.map((item) => {
                        return <li key={item.id} className="list-group-item" onClick={() => this.props.history.push("/tournament/" + item.id)}>{item.name}</li>
                    })}
                    {this.state.tournaments.map(item => (
                        <li key={item.id} className="list-group-item">
                            {item.name}
                            <button
                                className="btn-danger"
                                onClick={() => this.leaveTournament(item.id)}
                            >
                                x
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        )
    }

}

export default TeamTournamentsComponent;
