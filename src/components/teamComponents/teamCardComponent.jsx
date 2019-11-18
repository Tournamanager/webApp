import React, { Component } from "react";
import { Card, Button, Form, FormControl, Col } from "react-bootstrap";
import ApiCommunication from "../apicommunication/ApiCommunication";

class TeamEditCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTeamName: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleSubmit(event) {
    var body = "mutation m($name:String!){createTeam(name: $name){id}}";
    var vars = `{ name: ${this.state.newTeamName} } `;
    ApiCommunication.graphQlCall(this, body, vars, "team");

    event.preventDefault();
  }

  handleNameChange(event) {
    this.setState({
      newTeamName: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Col md="4" style={{ marginTop: "10px" }}>
          <Card Card style={{ width: "18rem" }}>
            <Form style={{ padding: "10px" }} onSubmit={this.handleSubmit}>
              <FormControl
                className="mr-sm-2"
                type="text"
                placeholder={this.props.data.name}
                onChange={this.handleNameChange}
              ></FormControl>
              <Button style={{ marginTop: "10px" }} type="submit">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </div>
    );
  }
}

export default TeamEditCard;
