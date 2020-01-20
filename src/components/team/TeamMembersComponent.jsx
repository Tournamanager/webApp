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

  unjoin(id) {
    ApiCommunication.graphQLRequest("mutation", "removeUserFromTeam", null, [
      { name: "userId", type: "Int", value: id },
      { name: "teamId", type: "Int", value: this.state.id }
    ]).then(() => {
      this.setState(
        { users: this.state.users.filter(user => user.id !== id) }
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
            className="btn btn-primary ml-3 mb-1"
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
            <li key={item.id} className="list-group-item">
              <div style={{ textAlign: 'left', display: 'inline-block', width: '75%' }}>
                {item.name}
              </div>

              <div style={{ textAlign: 'right', display: 'inline-block', width: '25%' }}>
                <button
                  className="btn ml-3 mb-1"
                  onClick={() => this.unjoin(item.id)}
                  style={{
                    padding: '4px',
                    color: '#dc3545',
                    backgroundColor: '#fff',
                    borderColor: '#fff'
                  }}
                >
                  <i style={{ verticalAlign: 'middle' }} class="material-icons">
                    clear</i>
                </button>
              </div>

            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(TeamMembersComponent);
