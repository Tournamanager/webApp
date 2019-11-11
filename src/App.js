import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import Navigator from './components/routerComponent';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDaQdxs3hQ-nDVInjpdhgLbaleRIeIHn-Y",
  authDomain: "tournamanager-3a17a.firebaseapp.com",
  databaseURL: "https://tournamanager-3a17a.firebaseio.com",
  projectId: "tournamanager-3a17a",
  storageBucket: "tournamanager-3a17a.appspot.com",
  messagingSenderId: "578644609279",
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
        <Navigator isSignedIn={this.state.isSignedIn}></Navigator>
        <div className="container">
          {this.state.isSignedIn ? (
            <span>
              {/* <Navigator></Navigator> */}
              {/* <div>Signed In!</div> */}
  
            </span>
          ) : (
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            )}
        </div>
      </div>
    )
  }

}

export default App
