import React, { Component } from 'react';
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

import TeamRowComponent from "../../components/team/TeamRowComponent";

class AllTeamsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        const body = "query {teams{name}}";
        const vars = "{}";
        ApiCommunication.graphQlCallPost(body, vars)
            .then(response => this.setState({teams: response.data.data.teams}))
    }

    render() {   
        return (
            <div>
                <h1 className="jumbotron text-center">All Teams</h1>
                <div className="flex-column">
                {this.state.teams.map(team => (
                    <TeamRowComponent data={{team}}/>
                ), )}
                </div>
            </div>
        );
    }

}

export default AllTeamsView

