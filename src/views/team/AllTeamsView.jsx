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
        ApiCommunication.graphQLRequest("query", "teams", "id name users {id} tournaments {id} ")
            .then(response => this.setState({ teams: response.data.data.teams, isSet: true }))
    }

    redirectToTarget() {
        this.props.history.push({ pathname: "/team/create" })
    }

    render() {
        return (
            <div>
                <h1 className="ml-3 text-center">
                    All Teams
                    <button className="btn btn-primary ml-3 mb-1" onClick={this.redirectToTarget}>
                        <i style={{ verticalAlign: 'middle', fontSize: '28px' }} className="material-icons">add_circle</i>
                    </button>
                </h1>
                <div>
                    <SearchList objects={this.state.teams} isSet={this.state.isSet} src="teams" {...this.props} />
                </div>
            </div>
        );
    }

}



export default AllTeamsView

