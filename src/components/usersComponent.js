import React, { Component } from "react";

import Userdetail from "./userdetailComponent";
import firebase from "firebase";

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      users: [],
      selectedUser: {}
    };

    this.setUser = this.setUser.bind(this);
  }

  getAllUsers() {
    const users = [];

    firebase.firestore().collection('users').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const data = doc.data();
            users.push(data.username);
          });
        })
        .then(() => {
          this.setState({ users: users });
    })
  }

  componentDidMount() {
    this.getAllUsers();
  }

  setUser(user) {
    alert(user)
    //this.setState({
    //  selectedUser: user
    //});
  }

  render() {
    return (
      <div>
        <h1>All Users</h1>
          {this.state.users.map(user => (
            <div key={user + 'card'}className="card">
              <div key={user + 'cardbody'} className="card-body">
                <h5 className="card-title" key={user}>{user}</h5>
                <button onClick={() => this.setUser(user)} key={user + 'button'}>Details</button>
              </div>
            </div>
          ), )}
      </div>
    );
  }
}

export default Users;
