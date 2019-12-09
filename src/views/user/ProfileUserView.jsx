import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import TournamentsList from "../../components/user/TournamentsListComponent";
import TeamsList from "../../components/user/TeamsListComponent";
import MatchesList from "../../components/user/MatchesListComponent";

class ProfileUserView extends Component {
  ref;
  userNames = [];

  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: ""
        //key: firebase.auth().currentUser.uid
      },
      newUsername: ""
    };
  }

  render() {
    return (
      <div>
        <Row>
          <Col id="teamsCol" md="2">
            <TeamsList></TeamsList>
          </Col>
          <Col>
            {/*page should be split horizontally in 2 even parts*/}
            <Row>
              <MatchesList></MatchesList>
            </Row>
            <Row>
              <TournamentsList></TournamentsList>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfileUserView;
