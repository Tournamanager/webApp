import React, { Component } from "react";

class HomeView extends Component {
  render() {
    return (
      <div style={{ width: "80%", margin: "2% auto" }}>
        <img
          style={{ marginLeft: "380px" }}
          src="https://i.imgur.com/ExjLfdD.png"
          alt="logo"
        />
        <br />
        <br />
        <div style={{ width: "50%", marginLeft: "400px" }}>
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
          <p style={{ textAlign: "center" }}>
            <a href="/Login">Join now</a>
          </p>
        </div>
      </div>
    );
  }
}

export default HomeView;
