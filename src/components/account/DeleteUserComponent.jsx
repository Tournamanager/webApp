import React, { Component } from "react";

import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import firebase from "firebase";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

class DeleteUser extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.redirectToTarget = this.redirectToTarget.bind(this);
    this.submit = this.submit.bind(this);

    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);
  }

  redirectToTarget = () => {
    this.props.history.push({ pathname: "/" });
  };

  handleDeleteUser() {
    var user = firebase.auth().currentUser;

    user
      .delete()
      .then(function() {
        ApiCommunication.graphQLRequest("mutation", "updateUser", null, [
          { uuid: user.uid }
        ]);
      })
      .catch(function(error) {
        console.error(error);
      });

    this.redirectToTarget();
  }

  submit() {
    confirmAlert({
      title: "Confirm delete",
      message:
        "Are you sure you want to delete your account? This can not be undone",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleDeleteUser()
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <button className="btn btn-danger" onClick={this.submit}>
          Delete
        </button>
      </div>
    );
  }
}

export default DeleteUser;
