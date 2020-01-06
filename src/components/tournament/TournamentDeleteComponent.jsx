import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import { confirmAlert } from "react-confirm-alert";

class TournamentDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourId: 0,
      tempTourId: 0
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleIdSubmit = this.handleIdSubmit.bind(this);
    this.handleDeleteTournament = this.handleDeleteTournament.bind(this);
  }

  handleIdChange(event) {
    this.setState({ tempTourId: event.target.value });
  }

  handleIdSubmit() {
    confirmAlert({
      title: "Confirm delete",
      message:
        "Are you sure you want to delete this tournament? This can not be undone",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.handleDeleteTournament()
        },
        {
          label: "No",
          onClick: () => {}
        }
      ]
    });
  }

  handleDeleteTournament() {
    var id = this.state.tempTourId;
    ApiCommunication.graphQLRequest("mutation", "deleteTournament", null, [
      {
        name: "id",
        type: "Int",
        value: id
      }
    ]).then(this.props.history.push({ pathname: "/tournaments" }));
  }

  render() {
    return (
      <div>
        <Row style={{ marginLeft: "10px" }}>
          <Col md={3}>
            <h6>What Tournament would you like to delete?</h6>
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

export default TournamentDelete;
