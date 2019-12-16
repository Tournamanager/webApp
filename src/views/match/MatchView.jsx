import React, {Component} from 'react';
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import {Card, Col, Row} from "react-bootstrap";

class MatchView extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.state = {
            match: {
                id: 0,
                teamHome: {id: 1, name: 'teamHome'},
                teamAway: {id: 2, name: 'teamAway'},
                winner: {id: 1, name: 'teamHome'},
                date: '14-2-2019'
            }
        };
    }

    componentDidMount() {
        ApiCommunication.graphQLRequest(
            "query",
            "match",
            "id,teamHome{id, name},teamAway{id, name},winner{id, name},date",
            {
                name: "id",
                type: "Int",
                value: id
            }
    ).then(response => this.setState({match: response.data.data.match}));

        const body = 'query q($id:ID!) {match{id,teamHome,teamAway,winner,date}}';
        const vars = '$id:' + this.id;
        ApiCommunication.graphQlCall(this, body, vars, "match")
    }

    render() {
        return (
            <div className="m-3">
                <h1>Match</h1>
                <h4>{this.state.match.date}</h4>
                <hr/>
                <Row className="m-5">
                    <Col>
                        <Card>
                            {this.state.match.teamHome.name}
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            {this.state.match.teamAway.name}
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MatchView;
