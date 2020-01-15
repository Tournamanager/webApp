import React, { Component } from "react";

import { Button, Form, Col, Row, FormControl } from "react-bootstrap";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import logo from '../../images/team.png';

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
      .then(this.props.history.push("/teams"))
  }

  render() {
    return (
      <div class="container contact-form" style={{ backgroundColor: '#fbfbfb', border: '1px solid #eeeeee', borderRadius: '30px' }}>
        <div class="contact-image">
          <img src={logo} alt="rocket_contact" style={{ borderRadius: '50%', overflow: 'hidden' }} />
        </div>
        <form method="post" onSubmit={this.handleSubmit}>
          <h3>Create team</h3>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <input type="text" name="txtName" class="form-control" placeholder="Team name *" onChange={this.handleNameChange} />
              </div>
              <div class="col-md-6" style={{ paddingLeft: '0' }}>
                <div class="form-group">
                  <input type="submit" name="btnSubmit" class="btnContact" value="Create" onClick={this.submitTeam} />
                </div>
              </div>

            </div>

          </div>
        </form>
      </div>

      // <div>
      //   <Form>
      //     <Col md="2">
      //       <Row style={{ marginLeft: "0px" }}>
      //         <h6>Enter team name:</h6>
      //         <FormControl
      //           class="mr-sm-2"
      //           type="text"
      //           placeholder="Team name"
      //           onChange={this.handleNameChange}
      //         />
      //       </Row>
      //       <Button
      //         onClick={this.submitTeam}
      //         style={{ marginTop: "10px" }}
      //         class="btn btn-primary"
      //       >
      //         Submit
      //       </Button>
      //     </Col>
      //   </Form>
      // </div>
    );
  }
}

export default CreateTeamView;
