import React, { Component } from "react";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import firebase from "firebase";

class TournamentCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 2,
      name: "",
      description: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleNumberChange(event) {
    this.setState({
      number: event.target.value
    });
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    var tourName = this.state.name;
    var tourDesc = this.state.description;
    var tourNum = this.state.number;
    var user = firebase.auth().currentUser.uid;

    var userId = await ApiCommunication.graphQLRequest("query", "user", "id", [
      {
        name: "uuid",
        type: "String",
        value: firebase.auth().currentUser.uid
      }
    ]);

    ApiCommunication.graphQLRequest("mutation", "createTournament", "id", [
      {
        name: "name",
        type: "String",
        value: tourName
      },
      {
        name: "description",
        type: "String",
        value: tourDesc
      },
      {
        name: "owner",
        type: "Int",
        value: userId.data.data.user.id
      },
      {
        name: "numberOfTeams",
        type: "Int",
        value: tourNum
      }
    ])
      .then(response => {
        this.props.history.push({ pathname: "/tournaments" });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div style={{ width: "400px", allign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Tournament name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tournament name..."
              onChange={this.handleNameChange}
            />
          </div>
          <div className="form-group">
            <label>Number of teams:</label>
            <select className="form-control" onChange={this.handleNumberChange}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
          </div>
          <div className="from-group">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              onChange={this.handleDescriptionChange}
            ></textarea>
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "20px" }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default TournamentCreate;
