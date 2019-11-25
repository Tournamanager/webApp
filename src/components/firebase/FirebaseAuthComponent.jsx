import React, { Component } from "react";
import firebase from "firebase";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import { StyledFirebaseAuth } from "react-firebaseui";

const firebaseConfig = {
    apiKey: "AIzaSyDaQdxs3hQ-nDVInjpdhgLbaleRIeIHn-Y",
    authDomain: "tournamanager-3a17a.firebaseapp.com",
    databaseURL: "https://tournamanager-3a17a.firebaseio.com",
    projectId: "tournamanager-3a17a",
    storageBucket: "tournamanager-3a17a.appspot.com",
    messagingSenderId: "578644609279",
    appId: "1:578644609279:web:ff2c015800e7ce861ea4ca",
    measurementId: "G-P266ND2WDH"
};
firebase.initializeApp(firebaseConfig);

class FirebaseAuthComponent extends Component {
    state = {
        isSignedIn: false
    };

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
            this.setState({ isSignedIn: !!user });
            ApiCommunication.graphQlCallPost("mutation m($uuid: String!) { createUser(uuid: $uuid) { id } }",`{"uuid": "${user.uid}"}`)
                .then(res => console.log(res))
                .catch(err => console.log(err));
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

export default FirebaseAuthComponent;
