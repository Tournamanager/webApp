import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TournamentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourId: 0,
      tempTourId: 0,
      tournament: {},
      changedName: "",
      changedDesc: "",
      changedNumberOfTeams: 0
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleIdSubmit = this.handleIdSubmit.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleNumberTeamsChange = this.handleNumberTeamsChange.bind(this);
  }

  componentDidMount() {
    if (this.props.location.id !== undefined) {
      this.handleIdSubmit();
    }
  }

  handleIdChange(event) {
    this.setState({ tempTourId: event.target.value });
  }

  handleIdSubmit() {
    this.setState({
      tourId: this.state.tempTourId
    });
    var id;
    if (this.props.location.id !== undefined) {
      this.setState({
        tourId: this.props.location.id
      });
      id = this.props.location.id;
    }
    else {
      this.setState({
        tourId: this.state.tempTourId
      });
      id = this.state.tourId;
    }


    ApiCommunication.graphQLRequest(
      "query",
      "tournament",
      "name numberOfTeams description owner{id}",
      [
        {
          name: "id",
          type: "ID",
          value: id
        }
      ]
    ).then(response =>
      this.setState({ tournament: response.data.data.tournament }),
    );

  }

  handleFormSubmit(event) {
    var id = this.state.tempTourId;
    var owner = this.state.tournament.owner.id;
    ApiCommunication.graphQLRequest("mutation", "updateTournament", "name", [
      {
        name: "id",
        type: "Int",
        value: id
      },
      {
        name: "ownerId",
        type: "Int",
        value: owner
      },
      {
        name: "name",
        type: "String",
        value: this.state.changedName
      },
      {
        name: "description",
        type: "String",
        value: this.state.changedDesc
      },
      {
        name: "numberOfTeams",
        type: "Int",
        value: this.state.changedNumberOfTeams
      }
    ]);
    event.preventDefault();
  }

  handleNameChange(event) {
    this.setState({
      changedName: event.target.value
    });
  }

  handleDescChange(event) {
    this.setState({
      changedDesc: event.target.value
    });
  }

  handleNumberTeamsChange(event) {
    this.setState({
      changedNumberOfTeams: event.target.value
    });
  }

  handleDelete() {
    var tourId = this.state.tourId
    ApiCommunication.graphQLRequest(
      "mutation",
      "deleteTournament",
      null,
      [{ name: "id", type: "Int", value: tourId }]
    ).then(
      this.props.history.push({ pathname: "/tournaments" })
    )
  }

  render() {
    if (this.state.tourId !== 0) {
      return (
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
                  placeholder={this.state.tournament.name}
                  onChange={this.handleNameChange}
                />
                <span style={{ marginTop: "10px" }}>Description:</span>
                <Form.Control
                  type="text"
                  placeholder={this.state.tournament.description}
                  onChange={this.handleDescChange}
                />
                <span style={{ marginTop: "10px" }}>Number of teams:</span>
                <Form.Control
                  type="number"
                  placeholder={this.state.tournament.numberOfTeams}
                  onChange={this.handleNumberTeamsChange}
                />
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
                <Button
                  className="btn-danger"
                  style={{ marginTop: "10px" }}
                  onClick={this.handleDelete}
                >
                  delete Tournament
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Row style={{ marginLeft: "10px" }}>
            <Col md={3}>
              <h6>What Tournament would you like to edit?</h6>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tournament Id"
                  aria-label="Tournament Id"
                  aria-describedby="basic-addon1"
                  onChange={this.handleIdChange}
                />
              </div>
              <button className="btn btn-primary" onClick={this.handleIdSubmit}>
                Submit
              </button>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default TournamentEdit;
