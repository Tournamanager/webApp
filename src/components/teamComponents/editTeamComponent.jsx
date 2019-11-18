import React, { Component } from "react";
import TeamEditCard from "./teamCardComponent";

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

//example component to show edit team
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
          return <TeamEditCard data={team} />;
        })}
      </div>
    );
  }
}

export default EditTeam;
