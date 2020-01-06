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

    async saveUserInfo(user) {
        const ref = firebase.firestore().collection("users").doc(user.uid)
        ref.get().then(
            doc => {
                if (!doc.exists) {
                    ref.set({uuid: user.uid,username: user.email})
                }
            }
        )
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                ApiCommunication.graphQLRequest("mutation", "createUser", "id", [{name:"uuid", type:"String", value: user.uid}]);
                this.saveUserInfo(user)
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
