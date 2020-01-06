import React, { Component } from "react";

class TournamentMatchListComponent extends Component {

    constructor(props) {
        super(props);

        this.redirectMatch = this.redirectMatch.bind(this);
    }

    redirectMatch(id) {
        this.props.history.push({
            pathname: "/match",
            id: id
        });
    }

    render() {
        return (
            this.props.matches.length >= 1 ?
                <div>
                    <div className={"border"}>
                        {
                            this.props.matches.map(
                                match =>
                                    <div className={"border-bottom  align-self-center"} onClick={() => this.redirectMatch(match.id)}>
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