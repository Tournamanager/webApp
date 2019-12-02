import React, { Component } from "react";
import TeamDetailHeaderComponent from "../../components/team/TeamDetailHeaderComponent"
import TeamTournamentsComponent from "../../components/team/TeamTournamentsComponent"
import TeamMembersComponent from "../../components/team/TeamMembersComponent"

class TeamDetailsView extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };


    }


    render() {
        return (
            <div> <TeamDetailHeaderComponent /> </div>
            <div> <TeamTournamentsComponent /></div>
            <div>  <TeamMembersComponent /></div>
          
    );
    }

}

export default TeamDetailsView;
