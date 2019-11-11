import React, { Component } from "react";
import { Card, Button, Form, FormControl, Col } from "react-bootstrap";

class TeamCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEdit: false
    };

    this.enableEdit = this.enableEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  enableEdit(event) {
    console.log("I Got Clicked B****");
    this.setState({
      isEdit: true
    });
  }

  handleSubmit(event) {
    console.log("I Got Clicked C***");
    this.setState({
      isEdit: false
    });
  }

  render() {
    switch (this.state.isEdit) {
      case true:
        return (
          <div>
            <Form>
              <FormControl
                className="mr-sm-2"
                type="text"
                placeholder="Edit is Yes"
              ></FormControl>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </Form>
          </div>
        );

      case false:
        return (
          <div>
            <Col>
              <Card>
                <Card.Title>{this.props.data.name}</Card.Title>
                <Card.Body>
                  <Button
                    className="btn btn-primary"
                    onClick={this.enableEdit}
                    type="submit"
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </div>
        );

      default:
        break;
    }
  }
}

export default TeamCard;
