import React, { Component } from "react";

import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import firebase from "firebase";

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDeleteUserGraphQL = this.handleDeleteUserGraphQL.bind(this);
    this.handleDeleteUserFirebase = this.handleDeleteUserFirebase.bind(this);
    this.redirectToTarget = this.redirectToTarget.bind(this);

    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
  }

  redirectToTarget = () => {
    this.props.history.push({ pathname: "/" });
  };

  handleDeleteUserGraphQL() {
    //the graphQL call will be made here
    ApiCommunication.graphQLRequest("mutation", "updateUser", null, [
      { uuid: /*deleted user id*/ "UUID" }
    ]);
  }

  handleDeleteUserFirebase() {
    //the firebase call will be made here
    var user = firebase.auth().currentUser;

    user
      .delete()
      .then(function() {
        //user deleted
        console.log("User deleted");
        this.handleDeleteUserGraphQL();
      })
      .catch(function(error) {
        //An error happend
        console.log(error);
      });

    this.redirectToTarget();
  }

  render() {
    return (
      <div>
        <button class="btn btn-danger" onClick={this.handleDeleteUserFirebase}>
          Delete
        </button>
      </div>
    );
  }
}

export default DeleteUser;
