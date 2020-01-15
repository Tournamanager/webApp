import React, { Component } from "react";
import TeamDetailHeaderComponent from "../../components/team/TeamDetailHeaderComponent";
import TeamTournamentsComponent from "../../components/team/TeamTournamentsComponent";
import TeamMembersComponent from "../../components/team/TeamMembersComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TeamDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    deleteThis() {
        ApiCommunication.graphQLRequest(
            "mutation",
            "deleteTeam",
            null,
            [{ name: "id", type: "Int", value: this.state.team.id }])
            .then(this.props.history.push({ pathname: "/teams" }))
    }

  componentDidMount() {
    ApiCommunication.graphQLRequest(
      "query",
      "team",
      "id name users{id uuid} tournaments {id name}",
      [{name:"id", type:"ID", value: this.props.match.params.id}])
      .then(response => {
          console.log(response);
        if (response != null) {
          this.setState({ team: response.data.data.team })
        }
    })
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
          <TeamTournamentsComponent {...this.props}
              tournaments={this.state.team.tournaments}
              teamId={this.state.team.id}
          />
          <TeamMembersComponent
            members={this.state.team.users}
            teamId={this.state.team.id}
            {...this.props}
          />
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
