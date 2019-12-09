import React, { Component } from "react";
import TeamDetailHeaderComponent from "../../components/team/TeamDetailHeaderComponent"
import TeamTournamentsComponent from "../../components/team/TeamTournamentsComponent"
import TeamMembersComponent from "../../components/team/TeamMembersComponent"
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class TeamDetailsView extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };


    }

    render() {
        return (
            <div>
                <TeamDetailHeaderComponent />
                <TeamTournamentsComponent />
                <TeamMembersComponent />
            </div>
          
    );
    }

}

export default TeamDetailsView;
