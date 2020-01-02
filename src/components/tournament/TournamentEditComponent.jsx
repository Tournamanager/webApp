import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TournamentEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourId: 0,
      tempTourId: 0,
      tournament: {}
    };

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleIdSubmit = this.handleIdSubmit.bind(this);
  }

  handleIdChange(event) {
    this.setState({ tempTourId: event.target.value });
  }

  handleIdSubmit() {
    this.setState({
      tourId: this.state.tempTourId
    });

    var id = this.state.tempTourId;

    ApiCommunication.graphQLRequest(
      "query",
      "tournament",
      "name teams{name} matches{teamHome {name} teamAway {name} date}",
      [
        {
          name: "id",
          type: "ID",
          value: id
        }
      ]
    ).then(response =>
      this.setState({ tournament: response.data.data.tournament })
    );
  }

  render() {
    if (this.state.tourId != 0) {
      return <div>yes tour id</div>;
    } else {
      return (
        <div>
          <Row style={{ marginLeft: "10px" }}>
            <Col md={3}>
              <h6>What Tournament would you like to edit?</h6>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
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
