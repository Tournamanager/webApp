import React, { Component} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

export default class UserComponent extends Component{


    render(){
        return (
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Card>
                        <Card.Body>{this.props.user.name}</Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Body>Member of lots of tournaments</Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}
