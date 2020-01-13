import React, { Component } from "react";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class JoinTeamListComponent extends Component {

    submitTournament(id) {
        ApiCommunication.graphQLRequest("mutation", "addTeamToTournament", null, [
          {
            name: "teamId",
            type: "Int",
            value: this.props.match.params.id
          },
          {
            name: "tournamentId",
            type: "Int",
            value: id
          }
        ]).then(() => {
            this.props.history.push("/team/" + this.props.match.params.id)
        })
      }

    render() {
        return (
            <tr>
                <td width="50%">
                    {this.props.object.name}
                </td>
                <td width="50%">
                    {this.props.object.teams.findIndex(team => team.id === this.props.match.params.id) < 0 &&
                        this.props.object.teams.length !== this.props.object.numberOfTeams &&
                    (
                        <button className="btn btn-primary float-right" onClick={()=> this.submitTournament(this.props.object.id)}>join this tournament</button>
                    )
                    }
                </td>
            </tr>
        )
    }
}

export default JoinTeamListComponent;
