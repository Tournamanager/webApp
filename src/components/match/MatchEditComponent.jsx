import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class MatchEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      matchId: 0,
      tempMatchId: 0,
      changedDate: "",
      winner: {}
    };

    this.handleIdSubmit = this.handleIdSubmit.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.props.location.id !== undefined) {
      this.handleIdSubmit();
    }
  }

  handleIdSubmit() {
    let id;
    if (this.props.location.id !== undefined) {
      id = this.props.location.id;
    }
    else {
      id = this.state.tempMatchId;
    }

    this.setState({
      matchId: id
    });

    ApiCommunication.graphQLRequest(
      "query",
      "match",
      "date teamHome{id name} teamAway{id name} winner{id name} date",
      [
        {
          name: "id",
          type: "ID",
          value: id
        }
      ]
    ).then(response => {
          let oldDate = response.data.data.match.date; //YYYY-MM-DD
          response.data.data.match.date = oldDate.substr(8, 2) + "/" + oldDate.substr(5,2)+"/"+oldDate.substr(0, 4);//DD/MM/YYYY
          this.setState({match: response.data.data.match, winner: response.data.data.match.winner})
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
        value: this.state.winner.id
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
    ]).then(response => console.log(response.data.data));
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  changeSelectedTeam(team){
    this.setState({winner: team});
  }

  render() {
    if (this.state.match !== undefined && this.state.match !== null) {
      return (
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
                  <a
                      href="#"
                      className="list-group-item"
                      onClick={() => this.changeSelectedTeam(this.state.match.teamHome)}
                  >
                    {this.state.match.teamHome.name}
                  </a>
                  <a
                      href="#"
                      className="list-group-item"
                      onClick={() => this.changeSelectedTeam(this.state.match.teamAway)}
                  >
                    {this.state.match.teamAway.name}
                  </a>
                </div>
                Selected winner: {this.state.winner.name} <br/>
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
      );
    } else {
      return (
        <div>
          <Row style={{ marginLeft: "10px" }}>
            <Col md={3}>
              <h6>What Match would you like to edit?</h6>
              <div className="input-group mb-3">
                <input
                  type="text"
                  name="tempMatchId"
                  className="form-control"
                  placeholder="Match Id"
                  aria-label="Match Id"
                  aria-describedby="basic-addon1"
                  onChange={this.handleChange}
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

export default MatchEdit;
