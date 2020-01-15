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

    render() {
        return (
            <div className="col-md-5" style={{ margin: '0 auto' }}>
                <div>
                    <h2 style={{ display: 'inline-block' }}>Tournaments</h2>
                    <button
                        onClick={() => this.props.history.push("/joinTournament/" + this.state.id)}
                        style={{ verticalAlign: "super", float: "right" }}
                        type="button"
                        className="btn btn-primary ml-3 mb-1"
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
                    {this.state.tournaments.map(item => (
                        <li onClick={() => this.props.history.push("/tournament/" + item.id)} key={item.id} className="list-group-item">
                            <div style={{ textAlign: 'left', display: 'inline-block', width: '75%', cursor: 'pointer', fontWeight: '400' }}>
                                {item.name}
                            </div>

                            <div style={{ textAlign: 'right', display: 'inline-block', width: '25%' }}>
                                <button
                                    className="btn ml-3 mb-1"
                                    onClick={() => this.leaveTournament(item.id)}
                                    style={{
                                        padding: '4px',
                                        color: '#dc3545',
                                        backgroundColor: '#fff',
                                        borderColor: '#fff'
                                    }}
                                >
                                    <i style={{ verticalAlign: 'middle' }} class="material-icons">
                                        clear</i>
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>

        )
    }

}

export default TeamTournamentsComponent;
