import React, { Component } from "react";

import { Button, Form, Col, Row, FormControl } from "react-bootstrap";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class CreateTeamView extends Component {
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
    ApiCommunication.graphQLRequest("mutation", "createTeam", "id", [{
      name: "name",
      type: "String",
      value: this.state.selectedName
    }])
    .then(() => {
      this.props.history.push({ pathname: "/teams" });
    })
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
              />
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

export default CreateTeamView;
