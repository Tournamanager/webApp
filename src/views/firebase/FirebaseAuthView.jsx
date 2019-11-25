import React, { Component } from "react";
import firebase from "firebase";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import { StyledFirebaseAuth } from "react-firebaseui";

class FirebaseAuthView extends Component {
    uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        credentialHelper: 'none',
        callbacks: {
            signInSuccessWithAuthResult : () => false
        }
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                ApiCommunication.graphQlCallPost("mutation m($uuid: String!) { createUser(uuid: $uuid) { id } }",`{"uuid": "${user.uid}"}`)
                  .then(res => console.log(res))
                  .catch(err => console.log(err));
            }
        })
    };

    render() {
        return (
            <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
            />
        )
    }
}

export default FirebaseAuthView;
