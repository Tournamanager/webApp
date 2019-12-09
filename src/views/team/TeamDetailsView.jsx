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
                tournaments: [
                    {id:'weewewe', name: 'a'},
                    {id:'weewewe1', name: 'b'},
                    {id:'weewewe2', name: 'c'}
                ],
                teamMembers: [
                    { id: 'wer500c', name: 'Jelle' },
                    { id: 'wer501c', name: 'Michiel' },
                    { id: 'wer502c', name: 'Geert' },
                    { id: 'wer503c', name: 'Tim' },
                    { id: 'wer504c', name: 'Lars' },
                    { id: 'wer555c', name: 'LLoyd' },
                    { id: 'wer506c', name: 'Luuk' }],

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
