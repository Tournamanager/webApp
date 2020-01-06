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
                <h1 className="ml-3">
                    All Teams
                    <button className="btn btn-dark float-right mr-3 mt-1" onClick={this.redirectToTarget}>
                        <i style={{ verticalAlign: 'middle', fontSize: '28px' }} className="material-icons">add_circle</i>
                    </button>
                </h1>
                <SearchList objects={this.state.teams} isSet={this.state.isSet} src="teams" {...this.props} />
            </div>
        );
    }

}

export default AllTeamsView

