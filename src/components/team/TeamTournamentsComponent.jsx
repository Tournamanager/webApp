import React, { Component } from 'react';
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TeamTournamentsComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tournaments: [],
        };
    }

    selectTournament(id) {
        alert(id);
    }
    
    listItems = () => (
        this.props.tournaments.map((item) => {
            return <li key={item.id} className="list-group-item" onClick={() => this.props.history.push("/tournament/" + item.id)}>{item.name}</li>
        })
    )

    componentDidMount() {
        this.getAllTournamentsThisTeamIn();
    }

    getAllTournamentsThisTeamIn() {
        ApiCommunication.graphQLRequest("query","tournaments","id name teams {id users {uuid}} numberOfTeams matches {id}")
            .then(response => {
                this.setState({tournaments: response.data.data.tournaments.filter(tournament => {return tournament.teams.some(team => { return team.id === this.props.teamId})})})
            });
        console.log(this.props.teamId);
        ApiCommunication.graphQLRequest("query","tournaments","id name teams {id users {uuid}} numberOfTeams matches {id}")
            .then(response => {
                console.log(response)
            });
    }

    containsId(team) {

    }

    render() {
        return (
            <div className="col-md-5" style={{ margin: '0 auto' }}>
                <div>
                    <h2 style={{ display: 'inline-block' }}>Tournaments</h2>
                    <button
                        onClick={() => this.routeTo()}
                        style={{ verticalAlign: "super", float: "right" }}
                        type="button"
                        className="btn btn-dark">
                        <i style={{ verticalAlign: "middle", fontSize: "28px" }}
                            className="material-icons">
                            add_circle</i>
                    </button>
                </div>

                <ul className="list-group">
                    {this.state.tournaments.map(item => (
                        <li key={item.id} className="list-group-item">{item.name}
                            <button className="btn-danger" onClick={() => this.selectTournament(item.id)}>x</button>
                        </li>))
                    }
                </ul>
            </div>

        )
    }

}

export default TeamTournamentsComponent;
