import React, { Component } from "react";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import firebase from "firebase";
import logo from '../../images/tournamentIcon.png';

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
      .then(() => {
        this.props.history.push({ pathname: "/tournaments" });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div class="container contact-form" style={{ backgroundColor: '#fbfbfb', border: '1px solid #eeeeee', borderRadius: '30px' }}>
        <div class="contact-image">
          <img src={logo} alt="rocket_contact" style={{ borderRadius: '50%', overflow: 'hidden' }} />
        </div>
        <form method="post" onSubmit={this.handleSubmit}>
          <h3>Create tournament</h3>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <input type="text" name="txtName" class="form-control" placeholder="Tournament name *" onChange={this.handleNameChange} />
              </div>
              <div class="form-group">
                <label color="primary">Number of teams:</label>
                <select className="form-control" onChange={this.handleNumberChange} placeholder="">
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>

              </div>
              <div class="form-group">
                <input type="submit" name="btnSubmit" class="btnContact" value="Create" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <textarea name="txtMsg" class="form-control" placeholder="Description *" onChange={this.handleDescriptionChange} style={{ width: '100%', height: '125px' }}></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    );

  }
}

export default TournamentCreate;
