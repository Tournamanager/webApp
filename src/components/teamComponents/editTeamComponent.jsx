import React, { Component } from "react";
import TeamCard from "./teamCardComponent";

const teams = [
  {
    id: 1,
    name: "Team A"
  },
  {
    id: 2,
    name: "Team B"
  }
];

class EditTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamList: teams
    };
  }

  render() {
    return (
      <div>
        {this.state.teamList.map(team => {
          return <TeamCard data={team}></TeamCard>;
        })}
      </div>
    );
  }
}

export default EditTeam;
