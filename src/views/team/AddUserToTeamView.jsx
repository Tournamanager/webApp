import React, { Component } from "react";
import SearchList from "../../components/list/SearchList";
import firebase from "firebase";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";


class AddUserToTeamView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      teamUsers: [],
      isSet: false
    };

    
    this.countReaction = 0;
    this.userCount = 0;
  }

  componentDidMount() {
    this.getAllUsers();
    this.getAllTeamUsers();
  }

  getAllUsers() {
    let users = []

    ApiCommunication.graphQLRequest("query", "users", "id uuid").then(
      response => {
        this.userCount = response.data.data.users.length;
        response.data.data.users.forEach(user => {
          if (user.uuid !== "") {
            firebase.firestore().collection('users').doc(user.uuid)
                .get().then(doc => {
              if (doc.exists) {
                users.push({id: user.id, name: doc.data().username, inTeam: false})
                this.setState({users: users})
              }
              this.isInTeam();
            })
          }
        })
      }
    )
  }

  getAllTeamUsers() {
    ApiCommunication.graphQLRequest(
        "query",
        "team",
        "users{id uuid}",
        [{name:"id", type:"ID", value: this.props.match.params.id}])
        .then(response => {
          if (response != null) {
            this.setState({ teamUsers: response.data.data.team.users })
          }
        }
    )
  }

  isInTeam() {
    this.countReaction++;
    if (this.countReaction === this.userCount) {
      let userList = this.state.users;
      let teamUsers = this.state.teamUsers;
      userList.forEach(user => {
        teamUsers.forEach(u => {
          if (String(user.id) === String(u.id)) {
            const i = userList.indexOf(user);
            user = {...user, inTeam: true}
            userList[i] = user
          }
        })
      })
      this.setState({users: userList, isSet: true})
    }
  }

  render() {
    return (
      <div>
        <h1 className="jumbotron text-center">team A</h1>
        <SearchList objects={this.state.users} isSet={this.state.isSet} src="addUsers" {...this.props} />
      </div>
    );
  }
}

export default AddUserToTeamView;
