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

  componentDidMount() {
    ApiCommunication.graphQLRequest(
      "query",
      "team",
      "id name users{id uuid} tournaments {id name}",
      [{ name: "id", type: "ID", value: this.props.match.params.id }])
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
          <div className="row" style={{ margin: '0' }}>
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
          <div className="text-center"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              left: '0',
              right: '0',
              bottom: '10px',
              position: 'absolute'
            }}>
            <button
              className="btn btn-secondary"
              style={{
                width: "150px",
                width: '200px',
                fontSize: '16px',
                padding: '4px'
              }}
              onClick={() => this.deleteThis(this.state.id)}>
              <span>delete team
                 <i class="material-icons" style={{ verticalAlign: 'middle' }}> delete_forever</i> </span>
            </button>
          </div>
        </div>
      );
  }

}

export default TeamDetailsView;
