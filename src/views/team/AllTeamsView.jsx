import React, { Component } from 'react';
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import SearchList from "../../components/list/SearchList";


class AllTeamsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teams:[]
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
                <h1>All Teams</h1>
                <SearchList objects={this.state.teams} src="teams"/>
            </div>
        );
    }

}

export default AllTeamsView

