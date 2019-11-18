import React, { Component } from "react";
import TeamEditCard from "./teamCardComponent";
import ApiCommunication from "../apicommunication/ApiCommunication";

//example component to show edit team
class EditTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamList: { teams: [] }
    };
  }

  componentDidMount() {
    var body = "query {teams{name, id}}";
    var vars = `{} `;
    ApiCommunication.graphQlCall(this, body, vars, "teamList");
  }

  render() {
    return (
      <div>
        {this.state.teamList.teams.map(team => {
          return <TeamEditCard data={team} />;
        })}
      </div>
    );
  }
}

export default EditTeam;
