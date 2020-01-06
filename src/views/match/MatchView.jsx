
import React, { Component } from "react";

import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import { Card, Col, Row } from "react-bootstrap";

class MatchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            match: null
        };

        this.teamLeft = {background: ''};
        this.teamRight = {background: ''};
    }

    componentDidMount() {
        ApiCommunication.graphQLRequest(
            "query",
            "match",
            "id,teamHome{id, name},teamAway{id, name},winner{id, name},date",
            [{
                name: "id",
                type: "ID",
                value: this.props.location.id
            }]
        ).then(response => this.setState({match: response.data.data.match}));
    }

    render() {
        if (this.state.match) {
            if (this.state.match.winner) {
                if (this.state.match.teamHome.id === this.state.match.winner.id) {
                    this.teamLeft = {background: 'green', color: 'white'}
                } else if (this.state.match.teamAway.id === this.state.match.winner.id) {
                    this.teamRight = {background: 'green', color: 'white'}
                }
            }
        }

        return (
            this.state.match ? (
                <div className="m-3">
                    <h1>Match</h1>
                    <h4>{this.state.match.date}</h4>
                    <hr/>
                    <Row className="m-5">
                        <Col>
                            <Card style={this.teamLeft} className="p-2 h4">
                                {this.state.match.teamHome.name}
                            </Card>
                        </Col>
                        <Col>
                            <Card style={this.teamRight} className="p-2 h4">
                                {this.state.match.teamAway.name}
                            </Card>
                        </Col>
                    </Row>
                </div>
            ) : (
                <div className="m-3">
                    <h1>Match</h1>
                    <hr/>
                    <Row className="m-5">
                        <div>Match not found</div> 
                    </Row>
                </div>
            )
        )
    }

}

export default MatchView;
