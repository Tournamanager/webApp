import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class MatchEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      changedDate: "",
      winner: "0"
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getMatch();
  }

  getMatch() {
    ApiCommunication.graphQLRequest(
      "query",
      "match",
      "id teamHome{id name} teamAway{id name} winner{id name} date",
      [
        {
          name: "id",
          type: "ID",
          value: this.props.match.params.id
        }
      ]
    ).then(response => {
          let oldDate = response.data.data.match.date; //YYYY-MM-DD
          response.data.data.match.date = oldDate.substr(8, 2) + "/" + oldDate.substr(5,2)+"/"+oldDate.substr(0, 4);//DD/MM/YYYY
          this.setState({match: response.data.data.match, winner: response.data.data.match.winner.id, changedDate: response.data.data.match.date})
        }
    );
  }

  handleFormSubmit(event) {
    ApiCommunication.graphQLRequest("mutation", "updateMatch", "id", [
      {
        name: "id",
        type: "Int",
        value: this.state.matchId
      },
      {
        name: "date",
        type: "String",
        value: this.state.changedDate
      },
      {
        name: "winnerId",
        type: "Int",
        value: this.state.winner
      },
      { //todo remove
        name: "homeScore",
        type: "Int",
        value: 0
      },
      { //todo remove
        name: "awayScore",
        type: "Int",
        value: 0
      }
    ]).then(response => event.preventDefault())
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
      return (
        this.state.match ? (
        <div>
          <Row>
            <Col md={3}>
              <Form
                style={{ marginLeft: "10px" }}
                onSubmit={this.handleFormSubmit}
              >
                <span>Date:</span>
                <Form.Control
                  type="text"
                  name="changedDate"
                  placeholder={this.state.match.date}
                  onChange={this.handleChange}
                />
                <div className="list-group">
                  <select name="winner" className="list-group-item" onChange={this.handleChange} value={this.state.winner}>
                    <option disabled>select a team</option>
                    <option value={this.state.match.teamHome.id}>{this.state.match.teamHome.name}</option>
                    <option value={this.state.match.teamAway.id}>{this.state.match.teamAway.name}</option>
                  </select>
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      ): (
        <div>No Match Found</div>
      )
    );
  }
}

export default MatchEdit;
