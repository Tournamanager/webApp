import React, { Component } from "react";
import TeamDetailHeaderComponent from "../../components/team/TeamDetailHeaderComponent";
import TeamTournamentsComponent from "../../components/team/TeamTournamentsComponent";
import TeamMembersComponent from "../../components/team/TeamMembersComponent";
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
                // tournaments: [
                //     { id: 'weewewe', name: 'a' },
                //     { id: 'weewewe1', name: 'b' },
                //     { id: 'weewewe2', name: 'c' }
                // ],
                users: [
                    { id: 'wer500c', uuid: 'Jelle' },
                    { id: 'wer501c', uuid: 'Michiel' },
                    { id: 'wer502c', uuid: 'Geert' },
                    { id: 'wer503c', uuid: 'Tim' },
                    { id: 'wer504c', uuid: 'Lars' },
                    { id: 'wer555c', uuid: 'LLoyd' },
                    { id: 'wer506c', uuid: 'Luuk' }],

               // teamCaptain: 'Jelle',
            }
        };
    }

    componentDidMount() {
        ApiCommunication.graphQLRequest(
            "query",
            "team",
            "id name users{id uuid}")
            .then(response => {
                if (response != null) {
                    this.setState({ team: response.data.data.team })
                }
            })
    }


    render() {
        return (
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
