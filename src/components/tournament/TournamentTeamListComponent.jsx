import React, { Component } from "react";

class TournamentTeamListComponent extends Component {

    render() {
        return (
            this.props.teams.length >= 1 ?
                <div>
                    <div className={"row"}>
                        <div className={"col-sm-10"}>
                            <h5>Teams</h5>
                        </div>
                        <div className={"col-sm-2"}>
                            <h6>{this.props.teams.length}/{this.props.numberOfTeams}</h6>
                        </div>
                    </div>
                    <div className={"border"}>
                        {
                            this.props.teams.map(team => <div className={"border-bottom  align-self-center"}>
                                <span className={"text-center"} onClick={() => this.props.history.push('/team/' + team.id)}>{team.name}</span></div>)
                        }
                    </div>
                </div> :
                <div>
                    <div className={"row"}>
                        <div className={"col-sm-10"}>
                            <h5>Teams</h5>
                        </div>
                        <div className={"col-sm-2"}>
                            <h6>{this.props.teams.length}/{this.props.numberOfTeams}</h6>
                        </div>
                    </div>
                    <div className={"border"}>
                        <p>No Teams have joined the tournament yet!</p>
                    </div>
                </div>

        )
    }
}

export default TournamentTeamListComponent
