import React, { Component } from "react";
import { Card, Button, Form, FormControl, Col } from "react-bootstrap";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class UpdateTeamComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newTeamName: "",
      teams: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleSubmit(event) {
    const body =
      "mutation m($name:String!, $id:Int!){updateTeam(name: $name, id: $id){id}}";
    const vars = `{ "name": "${this.state.newTeamName}", "id":${this.props.data.id} } `;
    ApiCommunication.graphQlCall(this, body, vars, "teams");

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
              />
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

export default UpdateTeamComponent;
