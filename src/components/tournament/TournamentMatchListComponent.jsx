import React, { Component } from "react";

class TournamentMatchListComponent extends Component {

    render() {
        return (
            this.props.matches.length >= 1 ?
                <div>
                    <div className={"border"}>
                        {
                            this.props.matches.map(
                                match =>
                                    <div className={"border-bottom  align-self-center"} onClick={() => this.props.history.push("/match/" + match.id)}>
                                        <p className={"text-center"}>{match.teamHome.name} VS {match.teamAway.name} {match.date}</p>
                                    </div>
                            )
                        }
                    </div>
                </div> :
                <div>
                    <div className={"border"}>
                        <p>The tournament is not started yet!</p>
                    </div>
                </div>
        )
    }
}

export default TournamentMatchListComponent