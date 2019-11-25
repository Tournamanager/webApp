import React, { Component } from "react"
import "./App.css"
import FirebaseAuthComponent from "./components/firebase/FirebaseAuthComponent";
import AllUsersView from "./views/user/AllUsersView";
import ProfileView from "./views/user/UserProfileView";
import HomeView from "./views/HomeView";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import firebase from "firebase";

class App extends Component {

  isSignedIn() {
    return !!firebase.auth.currentUser;
  }

  render() {
    return (
        <div className="App">
          <div className="container">
            <BrowserRouter>
              {this.isSignedIn() ? (
                  <Switch>
                    <Route path="/users">
                      <AllUsersView />
                    </Route>
                    <Route path="/myProfile">
                      <ProfileView />
                    </Route>
                  </Switch>
              ) : (
                  <Switch>
                    <Route path="/" component={HomeView} exact/>
                    <Route path="/login" component={FirebaseAuthComponent}/>
                  </Switch>
              )}
            </BrowserRouter>
          </div>
        </div>
    )
  }
}

export default App;
