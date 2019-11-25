import React, { Component } from "react";

import firebase from "firebase";
import ApiCommunication from "./apicommunication/ApiCommunication";

class Tournaments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            tournaments: [],
            selectedTournament: {}
        };
    }

    getAllUsers() {
        const tournaments = [];

        var body = "query m($name:String!){createTeam(name: $name){id}}";
        var vars = "";
        ApiCommunication.graphQlCall(this, body, vars, "team");

        firebase.firestore().collection('users').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    tournaments.push(data);
                });
            })
            .then(() => {
                this.setState({ tournaments: tournaments });
            })
    }

    componentDidMount() {
        this.getAllUsers();
    }

    setActiveTournament(tournament) {
        alert(tournament)
    }

    render() {
        return (
            <div>
                <h1>All Tournaments</h1>
                {this.state.tournaments.map(tournament => (
                    <div key={tournament.toString() + 'card'}className="card">
                        <div key={tournament.toString() + 'cardbody'} className="card-body">
                            <h5 className="card-title" key={tournament.toString() + ''}>{tournament.username}</h5>
                            <button onClick={() => this.setActiveTournament(tournament)} key={tournament.toString() + 'button'}>Details</button>
                        </div>
                    </div>
                ), )}
            </div>
        );
    }
}

export default Tournaments;
