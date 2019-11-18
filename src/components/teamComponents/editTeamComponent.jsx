import React, { Component } from "react";
import TeamEditCard from "./teamCardComponent";
import ApiCommunication from "../apicommunication/ApiCommunication";

//example component to show edit team
class EditTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamList: []
    };
  }

  async componentDidMount() {
    var body = "query {teams{name}}";
    var vars = `{} `;
    var test = await ApiCommunication.graphQlCallPost(body, vars);
    this.setState({
      teamList: test
    });

    console.log(test);
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
