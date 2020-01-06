import React, { Component } from "react";
import TeamDetailHeaderComponent from "../../components/team/TeamDetailHeaderComponent";
import TeamTournamentsComponent from "../../components/team/TeamTournamentsComponent";
import TeamMembersComponent from "../../components/team/TeamMembersComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication"

class TeamDetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        ApiCommunication.graphQLRequest(
            "query",
            "team",
            "name users{id uuid} tournaments {id name}",
            [{name:"id", type:"ID", value: this.props.match.params.id}])
            .then(response => {
                console.log(response)
                if (response != null) {
                    this.setState({ team: response.data.data.team })
                }
            })
    }


    render() {
        return this.state.team == null ? (
            <div className={"alert-warning"}>
                <p> Team not found. Try a different team! </p>
            </div>
            ) : (
            <div>
                <TeamDetailHeaderComponent name={this.state.team.name} />
                <div className="row">
                    <TeamTournamentsComponent tournaments={this.state.team.tournaments} />
                    <TeamMembersComponent members={this.state.team.users} />
                </div>
            </div>
        );
    }
}

export default TeamDetailsView;
