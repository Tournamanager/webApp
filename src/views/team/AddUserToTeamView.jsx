import React, { Component } from "react";
import UserListComponent from "../../components/user/UserListComponent";

class AddUserToTeamView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.id
    };
  }

  render() {
    return (
      <div>
        <h1 className="jumbotron text-center">team A</h1>

        <UserListComponent teamId={this.props.location.id} />
      </div>
    );
  }
}

export default AddUserToTeamView;
