import React, { Component } from "react";

import firebase from "firebase";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import SearchList from "../../components/list/SearchList";

class AllUsersView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isSet: false
    };
  }

  getAllUsers() {
    let users = []

    ApiCommunication.graphQLRequest("query", "users", "id uuid").then(
      response => {
        response.data.data.users.forEach(user => {
          if (user.uuid !== "") {
            firebase.firestore().collection('users').doc(user.uuid)
            .get().then(doc => {
              if (doc.exists) {
                users.push({id: user.id, name: doc.data().username})
                this.setState({users: users, isSet: true})
              }
            })
          } else {
            users.push({id: user.id, name: "account deleted"})
            this.setState({users: users, isSet: true})
          }
        })
    })
  }

  componentDidMount() {
    this.getAllUsers();
  }

  render() {
    return (
      <div>
        <h1 className="ml-3">All Users</h1>
        <SearchList objects={this.state.users} isSet={this.state.isSet} src="users"/>
      </div>
    );
  }
}

export default AllUsersView;
