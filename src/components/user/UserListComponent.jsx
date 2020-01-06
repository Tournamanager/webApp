import React, { Component } from "react";

import firebase from "firebase";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class UserListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: [],
      users: [],
      teamId: this.props.teamId
    };

    //  this.changeSelectedUser = this.changeSelectedUser.bind(this)
    this.submitUser = this.submitUser.bind(this);
  }

  componentDidMount() {
    console.log(this.props.teamId);
    this.getAllUsers();
  }

  getAllUsers() {
    const users = [];

    firebase
      .firestore()
      .collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          users.push([data.username, data.uuid]);
        });
      })
      .then(() => {
        this.setState({ users: users });
      });
  }

  changeSelectedUser(name) {
    this.setState({ selectedUser: name });
  }

  submitUser() {
    ApiCommunication.graphQLRequest("query", "user", "id", [
      {
        name: "uuid",
        type: "String",
        value: this.state.selectedUser[1]
      }
    ])
      .then(response =>
        this.setState({ foundUserId: response.data.data.user.id })
      )
      .then(
        ApiCommunication.graphQLRequest("mutation", "addUserToTeam", null, [
          {
            name: "teamId",
            type: "Int",
            value: this.state.teamId
          },
          {
            name: "userId",
            type: "Int",
            value: this.state.foundUserId
          }
        ])
      );
  }

  render() {
    return (
      <div class="container">
        <h2>Users</h2>
        <div class="list-group">
          {this.state.users.map(user => (
            <a
              href="#"
              class="list-group-item"
              onClick={() => this.changeSelectedUser(user)}
            >
              {user[0]}
            </a>
          ))}
        </div>
        <div>
          <button
            style={{ verticalAlign: "super", float: "right" }}
            type="button"
            className="btn btn-dark"
            onClick={this.submitUser}
          >
            Add user {this.state.selectedUser[0]}
            <i
              style={{ verticalAlign: "middle", fontSize: "28px" }}
              className="material-icons"
            >
              add_circle
            </i>
          </button>
        </div>
      </div>
    );
  }
}

export default UserListComponent;
