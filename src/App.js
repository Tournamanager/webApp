import React, { Component } from "react"
import "./App.css"
import FirebaseAuthView from "./views/firebase/FirebaseAuthView";
import AllUsersView from "./views/user/AllUsersView";
import ProfileView from "./views/user/UserProfileView";
import HomeView from "./views/HomeView";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import firebase from "firebase";
import NavigationComponent from "./components/NavigationComponent";

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

class App extends Component {
  state = {
    isSignedIn: false
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user });
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <NavigationComponent isSignedIn={this.state.isSignedIn}/>
            <Switch>
              <Route path="/" component={HomeView} exact/>
              <Route path="/login" component={FirebaseAuthView}/>
              <Route path="/users" component={AllUsersView}/>
              <Route path="/user/profile" component={ProfileView}/>
              <Route />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
