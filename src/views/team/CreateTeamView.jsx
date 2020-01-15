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
      <div className="container contact-form" style={{ backgroundColor: '#fbfbfb', border: '1px solid #eeeeee', borderRadius: '30px' }}>
        <div className="contact-image">
          <img src={logo} alt="rocket_contact" style={{ borderRadius: '50%', overflow: 'hidden', width: '150px', height: '150px' }} />
        </div>
        <form method="post" onSubmit={this.handleSubmit}>
          <h3>Create team</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input type="text" name="txtName" className="form-control" placeholder="Team name *" onChange={this.handleNameChange} />
              </div>
              <div className="form-group">
                <input type="submit" name="btnSubmit" className="btnContact" value="Create" onClick={this.submitTeam} />
              </div>
            </div>

          </div>
        </form>
      </div>
    );
  }
}

export default CreateTeamView;
