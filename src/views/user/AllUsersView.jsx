import React, { Component } from "react";

import firebase from "firebase";

class AllUsersView extends Component {

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
        <div>
          {this.state.users.map(user => (
            <userComponent user={user} />
          ))}
        </div>
      </div>
    );
  }
}

export default AllUsersView;
