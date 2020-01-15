import React, { Component } from "react";
import "./App.css";
import FirebaseAuthView from "./views/firebase/FirebaseAuthView";
import AllUsersView from "./views/user/AllUsersView";
import ProfileView from "./views/user/ProfileUserView";
import HomeView from "./views/HomeView";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import firebase from "firebase";
import NavigationComponent from "./components/NavigationComponent";
import CreateTeamView from "./views/team/CreateTeamView";
import AllTournamentsView from "./views/tournament/AllTournamentsView";
import AllTeamsView from "./views/team/AllTeamsView";
import TeamDetailsView from "./views/team/TeamDetailsView";
import TournamentDetailsView from "./views/tournament/TournamentDetailsView";
import AccountUser from "./views/user/AccountUserView";
import TournamentCreate from "./views/tournament/TournamentCreateView";
import AddUserToTeamView from "./views/team/AddUserToTeamView";
import MatchView from "./views/match/MatchView";
import TournamentDelete from "./components/tournament/TournamentDeleteComponent";
import TournamentEdit from "./views/tournament/TournamentEditView";
import MatchEdit from "./components/match/MatchEditComponent";

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
      <BrowserRouter>
        <NavigationComponent isSignedIn={this.state.isSignedIn} />
        <Switch>
          <Route path="/" component={HomeView} exact />
          <Route path="/login" component={FirebaseAuthView} />
          <Route path="/users" component={AllUsersView} />
          <Route path="/tournaments" component={AllTournamentsView} />
          <Route path="/user/profile" component={ProfileView} />
          <Route path="/team/create" component={CreateTeamView} />
          <Route path="/teams" component={AllTeamsView} />
          <Route path="/match/:id" component={MatchView} />
          <Route path="/match-edit/:id" component={MatchEdit}/>
          <Route path="/team/:id" component={TeamDetailsView} />
          <Route path="/addUserToTeam/:id" component={AddUserToTeamView} />
          <Route path="/tournament/:id" component={TournamentDetailsView} />
          <Route path="/user/account" component={AccountUser} />
          <Route path="/createTournament" component={TournamentCreate} />
          <Route path="/deleteTournament" component={TournamentDelete}/>
          <Route path="/editTournament/:id" component={TournamentEdit}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
