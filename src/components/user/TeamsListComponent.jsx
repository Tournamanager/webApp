import React, { Component } from "react";

class MyTeamsList extends Component {

     render() {
        return (
            <tr onClick={() => this.props.history.push("/team/" + this.props.object.id)}>
                {this.props.object.name}, {this.props.object.users.length} members
            </tr>
        )
    }
}

export default MyTeamsList;
