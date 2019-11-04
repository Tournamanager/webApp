import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Navigator from './components/routerComponent';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: ${{secrets.FIREBASE_API_KEY}},
    authDomain: ${{secrets.FIREBASE_AUTH_DOMAIN}},
    databaseURL: ${{secrets.FIREBASE_DATABASE_URL}},
    projectId: "tournamanager-3a17a",
    storageBucket: ${{secrets.FIREBASE_STORAGE_BUCKET}},
    messagingSenderId: ${{secrets.FIREBASE_MESSAGING_SENDER}},
    appId: "1:578644609279:web:ff2c015800e7ce861ea4ca",
    measurementId: "G-P266ND2WDH"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


class App extends Component {

  state = { isSignedIn: false }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    credentialHelper: 'none',
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.email}</h1>
            <Navigator></Navigator>
          </span>
        ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
      </div>
    )
  }

}

export default App
