import React, { Component } from "react";

import { Button, Form, Col, Row, FormControl } from "react-bootstrap";
import ApiCommunication from "../apicommunication/ApiCommunication";

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedName: ""
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.submitTeam = this.submitTeam.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      selectedName: event.target.value
    });
  }

  submitTeam() {
    var body = "mutation m($name:String!){createTeam(name: $name){id}}";
    var vars = `{ name: ${selectedName} } `;
    ApiCommunication.graphQlCall(this, body, vars, "team");
  }

  render() {
    return (
      <div>
        <Form>
          <Col md="2">
            <Row style={{ marginLeft: "0px" }}>
              <h6>Enter team name:</h6>
              <FormControl
                class="mr-sm-2"
                type="text"
                placeholder="Team name"
                onChange={this.handleNameChange}
              ></FormControl>
            </Row>
            <Button
              onClick={this.submitTeam}
              style={{ marginTop: "10px" }}
              class="btn btn-primary"
            >
              Submit
            </Button>
          </Col>
        </Form>
      </div>
    );
  }
}

export default CreateTeam;
