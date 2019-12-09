import React, { Component } from "react";

import firebase from "firebase";
import UserComponent from "../../components/user/UserComponent";
import Jumbotron from "react-bootstrap/Jumbotron";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

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
          users.push({uuid: doc.id, username: data.username});
        });
      })
      .then(() => {
        this.setState({ users: users });
      })
    this.state.users.forEach(user => {
      const body = "query {user{id}}";
      const vars = `{"uuid": "${user.uuid}"}`;
      ApiCommunication.graphQlCallPost(body, vars)
          .then(response => console.log(response));
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
        <Jumbotron><h1 className="text-center">All Users</h1></Jumbotron>
        <div>
          {this.state.users.map(user => (
              <UserComponent key={user} user={user} />
          ))}
        </div>
      </div>
    );
  }
}

export default AllUsersView;
