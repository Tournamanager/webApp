import React, { Component } from "react";
import TeamDetailHeaderComponent from "../../components/team/TeamDetailHeaderComponent";
import TeamTournamentsComponent from "../../components/team/TeamTournamentsComponent";
import TeamMembersComponent from "../../components/team/TeamMembersComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication"

class TeamDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.id
        };
    }

    componentDidMount() {
        ApiCommunication.graphQLRequest(
            "query",
            "team",
            "name users{id uuid} tournaments {id name}",
            [{name:"id", type:"ID", value: this.state.id}])
            .then(response => {
                if (response != null) {
                    this.setState({ team: response.data.data.team })
                }
            })
    }

    deleteThis() {
        ApiCommunication.graphQLRequest(
            "mutation",
            "deleteTeam",
            null,
            [{ name: "id", type: "Int", value: this.state.id }])
            .then(this.props.history.push({ pathname: "/teams" }))
    }

    render() {
        return this.state.team == null ? (
            <div className={"alert-warning"}>
                <p> Team not found. Try a different team! </p>
            </div>
        ) : (
                <div>
                    <TeamDetailHeaderComponent name={this.state.team.name} />
                    <div className="row">
                        <TeamTournamentsComponent tournaments={this.state.team.tournaments} />
                        <TeamMembersComponent members={this.state.team.users} />
                    </div>
                    <div className="text-center">
                        <button
                            className="btn-danger"
                            style={{ width: "60%" }}
                            onClick={() => this.deleteThis(this.state.id)}>
                            <h2>delete team</h2>
                        </button>
                    </div>
                </div>
            );
    }
}

export default TeamDetailsView;
