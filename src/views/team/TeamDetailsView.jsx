import React, { Component } from "react"
import TeamDetailHeaderComponent from "../../components/team/TeamDetailHeaderComponent"
import TeamTournamentsComponent from "../../components/team/TeamTournamentsComponent"
import TeamMembersComponent from "../../components/team/TeamMembersComponent"
import ApiCommunication from "../../services/apicommunication/ApiCommunication"

class TeamDetailsView extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;

        //Geen teams aanwezig dus mock data gebruikt
        this.state = {
            team: {
                id: 0,
                name: 'A',
                tournaments: ['a', 'b', 'c'],
                teamMembers: ['Jelle', 'Michiel', 'Geert'],
                teamCaptain: 'Jelle',
            }
        };
    }

    componentDidMount() {
        const body = "query q($id:ID!) {team{id, name}}";
        const vars = "$id:' + this.id";
        ApiCommunication.graphQlCallPost(this, body, vars, "team")

    }


    render() {
        return (
            <div>
                <TeamDetailHeaderComponent name={this.state.team.name} />
                <div className="row">
                    <TeamTournamentsComponent tournaments={this.state.team.tournaments} />
                    <TeamMembersComponent members={this.state.team.teamMembers} />
                </div>
            </div>
        );
    }
}

export default TeamDetailsView;
