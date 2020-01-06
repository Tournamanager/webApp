import React, { Component } from "react";

import firebase from "firebase";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class UserListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUser: "test",
      users: []
    };

    //  this.changeSelectedUser = this.changeSelectedUser.bind(this)
  }

  componentDidMount() {
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
          users.push(data.username);
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
    //TODO fix this
    var teamId = 1;
    var userId = 1;

    ApiCommunication.graphQLRequest("mutation", "addUserToTeam", null, [
      {
        name: "teamId",
        type: "Int",
        value: teamId
      },
      {
        name: "userId",
        type: "Int",
        value: userId
      }
    ]);
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
              {user}
            </a>
          ))}
        </div>
        <div>
          <button
            style={{ verticalAlign: "super", float: "right" }}
            type="button"
            className="btn btn-dark"
          >
            Add user {this.state.selectedUser}
            <i
              style={{ verticalAlign: "middle", fontSize: "28px" }}
              className="material-icons"
              onClick={this.submitUser}
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
