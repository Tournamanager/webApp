import React, { Component } from "react";

import firebase from "firebase";

class HomeView extends Component {
  state = {};

  checkForUser() {
    if (firebase.auth().currentUser !== null) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div style={{ minWidth: '400px', width: "80%", margin: "100px auto", textAlign: 'center' }}>
        <img
          style={{ margin: "0 auto", minWidth: '400px', width: '50%' }}
          src="https://i.imgur.com/ExjLfdD.png"
          alt="logo"
        />
        <br />
        <br />
        <div style={{ margin: "0 auto", minWidth: '400px', width: '50%' }}>
          <h3 style={{ textAlign: "center" }}>Welkom to Tournamanager!!</h3>
          <p style={{ textAlign: "center" }}>
            Managing a tournament usually is quite tedious. As a tournament
            manager you need to keep track of scores, plan matches, set up a
            bracket and a lot more. This sometimes still is done on paper, or
            the notification to the teams are manually typed and mailed.
            Wouldn’t it be nice if there was an application with which one can
            easily do this?
          </p>
          <p style={{ textAlign: "center" }}>
            Tournamanager is just that. From local football games to online
            tournaments, you can manage any tournament you want. With
            Tournamanager you will be able to easily keep track of the match
            dates, match history and participating teams.
          </p>
          {this.checkForUser() ? (
            <p style={{ textAlign: "center" }}>
              <a href={"/user/" + firebase.auth().currentUser.uid}>View Profile</a>
            </p>
          ) : (
              <p style={{ textAlign: "center" }}>
                <a href="/Login">Join now</a>
              </p>
            )}
        </div>
      </div>
    );
  }
}

export default HomeView;
