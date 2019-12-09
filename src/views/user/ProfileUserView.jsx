import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import MyTournamentsList from "../../components/user/MyTournamentsListComponent";
import MyTeamsList from "../../components/user/MyTeamsListComponent";
import MyMatchesList from "../../components/user/MyMatchesListComponent";

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
            <MyTeamsList></MyTeamsList>
          </Col>
          <Col>
            {/*page should be split horizontally in 2 even parts*/}
            <Row>
              <MyMatchesList></MyMatchesList>
            </Row>
            <Row>
              <MyTournamentsList></MyTournamentsList>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProfileUserView;

/* Firebase name checking stuff, might be usefull later so will not delete yet

***this in constructor*****
this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.saveUsername = this.saveUsername.bind(this);

    this.ref = firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid);

*********


componentDidMount() {
    const userDetails = {
      username: "User " + firebase.auth().currentUser.uid
      // key: firebase.auth().currentUser.uid
    };

    this.getAllUsers();
    //   this.unsubscribe = this.ref.onSnapshot(this.getAllUsers);

    this.ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id
        });
      } else if (!doc.exists) {
        this.setState({
          user: userDetails
        });

        this.ref.set(userDetails);
      } else {
        this.setState({
          user: userDetails
        });
      }
    });
  }

  getAllUsers() {
    const userNames = [];

    firebase
      .firestore()
      .collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data();
          userNames.push(data.username);
        });
      })
      .then(() => {
        this.userNames = userNames;
      });
  }

  checkAvailability(username) {
    return !this.userNames.find(u => u === username);
  }

  handleChangeUsername(event) {
    this.setState({ newUsername: event.target.value });
  }

  saveUsername() {
    const newUserName = this.state.newUsername;
    if (this.checkAvailability(newUserName)) {
      this.ref.set({ username: newUserName });
      alert("Username opgeslagen " + newUserName);
      this.setState({ user: { username: newUserName } });
    } else {
      alert("Username bezet");
    }
  }
  */
