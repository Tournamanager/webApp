import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import TournamentsList from "../../components/user/TournamentsListComponent";
import TeamsList from "../../components/user/TeamsListComponent";
import MatchesList from "../../components/user/MatchesListComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import firebase from "firebase";

class ProfileUserView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      matches: [],
      tournaments: [],
      uuid: null,
    };
    if (props.isSignedIn)
    this.setState({uuid: firebase.auth().currentUser.uid});
  }

  componentDidMount() {
    ApiCommunication.graphQLRequest("query","teams","id name users {uuid}")
        .then(response => {
          this.setState({teams: response.data.data.teams.filter(team => team.users.contains(this.state.uuid))})
        })
    ApiCommunication.graphQLRequest("query","matches","id teamHome {name users {uuid}} teamAway {name users {uuid}} date")
        .then(response => {
          this.setState({matches: response.data.data.matches.filter(match => match.teamHome.users.contains(this.state.uuid) || match.teamAway.users.contains(this.state.uuid))})
        })
    ApiCommunication.graphQLRequest("query","tournaments","id name teams {id users {uuid}} numberOfTeams matches {id}")
        .then(response => {
          this.setState({tournaments: response.data.data.tournaments.filter(tournament => tournament.teams.users.contains(this.state.uuid))})
        })
  }

  render() {
    return (
      <div>
        <Row>
          <Col id="teamsCol" md="2">
            Teams:
            {this.state.teams.map(team => (
                -<TeamsList key={team.id} object={team} {...this.props}/>
                ))}
          </Col>
          <Col>
            {/*page should be split horizontally in 2 even parts*/}
            <Row>
              Matches:
            </Row>
            {this.state.matches.map(match => (
                <Row>-<MatchesList key={match.id} object={match} {...this.props}/></Row>
            ))}
            <Row>
              Tournaments:
            </Row>
            {this.state.tournaments.map(tournament => (
              <Row>-<TournamentsList key={tournament.id} object={tournament} {...this.props}/></Row>
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfileUserView;
