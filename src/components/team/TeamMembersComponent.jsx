import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import firebase from "firebase";

class TeamMembersComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: this.props.teamId
    };
    this.getAllUsers();
  }
  getAllUsers() {
    let users = [];

    this.props.members.forEach(user => {
      if (user.uuid !== "") {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uuid)
          .get()
          .then(doc => {
            if (doc.exists) {
              users.push({ uuid: user.uuid, id: user.id, name: doc.data().username });
              this.setState({ users: users });
            }
          });
      } else {
        users.push({ id: user.id, name: "account deleted" });
        this.setState({ users: users });
      }
    });
  }

  listItems = () =>
    this.props.members.map(item => {
      return (
        <li key={item.id} className="list-group-item">
          {item.name}
        </li>
      );
    });

  unjoin(id) {
    ApiCommunication.graphQLRequest("mutation", "removeUserFromTeam", null, [
      { name: "userId", type: "Int", value: id },
      { name: "teamId", type: "Int", value: this.state.id }
    ]).then(() => {
      this.setState(
        { users: this.state.users.filter(user => user.id !== id) },
        () => console.log(this.state.users)
      );
    });
  }
  
  render() {
    return (
      <div className="col-md-5" style={{ margin: "0 auto" }}>
        <div>
          <h2 style={{ display: "inline-block" }}>Members</h2>
          <button
            onClick={() => this.props.history.push("/addUserToTeam/" + this.state.id)}
            style={{ verticalAlign: "super", float: "right" }}
            type="button"
            className="btn btn-dark"
          >
            <i
              style={{ verticalAlign: "middle", fontSize: "28px" }}
              className="material-icons"
            >
              add_circle
            </i>
          </button>
        </div>
        <ul className="list-group">
          {this.state.users.map(item => (
            <li onClick={() => this.props.history.push('/user/' + item.uuid)} key={item.id} className="list-group-item">
              {item.name}
              <button
                className="btn-danger"
                onClick={() => this.unjoin(item.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(TeamMembersComponent);
