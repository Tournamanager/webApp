import React, { Component } from "react";

class MyTeamsList extends Component {

    onClick() {
        this.props.history.push({
            pathname: "/team",
            id: this.props.object.id
        });
    }

    render() {
        return (
            <tr onClick={() => this.onClick()}>
                {this.props.object.name}, {this.props.object.users.length} members
            </tr>
        )
    }
}

export default MyTeamsList;
