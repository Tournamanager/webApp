import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TournamentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleIdChange(event) {
    this.setState({ tempTourId: event.target.value });
  }

  componentDidMount() {
    this.getTournament();
  }

  getTournament() {
    ApiCommunication.graphQLRequest(
      "query",
      "tournament",
      "id name numberOfTeams description owner{id}",
      [
        {
          name: "id",
          type: "ID",
          value: this.props.match.params.id
        }
      ]
    ).then(response =>
      this.setState({ tournament: response.data.data.tournament })
    );
  }

  handleFormSubmit(event) {
    ApiCommunication.graphQLRequest("mutation", "updateTournament", "name", [
      {
        name: "id",
        type: "Int",
        value: this.state.tournament.id
      },
      {
        name: "ownerId",
        type: "Int",
        value: this.state.tournament.owner.id
      },
      {
        name: "name",
        type: "String",
        value: this.state.tournament.name
      },
      {
        name: "description",
        type: "String",
        value: this.state.tournament.description
      },
      {
        name: "numberOfTeams",
        type: "Int",
        value: this.state.tournament.numberOfTeams
      }
    ]);
    this.props.history.push("/tournament/" + this.state.tournament.id);
  }

  handleChange(event) {
    this.setState({
      tournament: {...this.state.tournament, [event.target.name]: event.target.value}
    }, console.log(this.state.tournament));
  }

  render() {
    return this.state.tournament == null ? (
      <div className={"alert-warning"}>
        <p> Tournament not found. Try a different tournament! </p>
      </div>
    ) : (
      <div>
        <Row>
          <Col md={3}>
            <Form
              style={{ marginLeft: "10px" }}
              onSubmit={this.handleFormSubmit}
            >
              <span>Name:</span>
              <Form.Control
                type="text"
                name="name"
                placeholder={this.state.tournament.name}
                onChange={this.handleChange}
              />
              <span style={{ marginTop: "10px" }}>Description:</span>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                placeholder={this.state.tournament.description}
                onChange={this.handleChange}
              />
              <span style={{ marginTop: "10px" }}>Number of teams:</span>
              <Form.Control
                type="number"
                name="numberOfTeams"
                placeholder={this.state.tournament.numberOfTeams}
                onChange={this.handleChange}
              />
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
    )
  }
}

export default TournamentEdit;
