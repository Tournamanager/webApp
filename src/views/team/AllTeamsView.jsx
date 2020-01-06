import React, { Component } from 'react';
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import SearchList from "../../components/list/SearchList";


class AllTeamsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teams: [],
            isSet: false
        }
        this.redirectToTarget = this.redirectToTarget.bind(this)
    }

    componentDidMount() {
        ApiCommunication.graphQLRequest("query", "teams", "id name users {id}")
            .then(response => this.setState({ teams: response.data.data.teams, isSet: true }))
    }

    redirectToTarget() {
        this.props.history.push({ pathname: "/team/create" })
    }

    render() {
        return (
            <div>
                <h1>All Teams</h1>
                <button onClick={this.redirectToTarget}>+</button>
                <SearchList objects={this.state.teams} isSet={this.state.isSet} src="teams" {...this.props} />
            </div>
        );
    }

}

export default AllTeamsView

