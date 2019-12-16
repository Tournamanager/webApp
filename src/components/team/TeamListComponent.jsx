import React, { Component } from "react";

class TeamListComponent extends Component {

    onClick() {
        this.props.history.push({
            pathname: "/team",
            id: this.props.object.id
        });
    }

    render() {
        return (
            <tr onClick={() => this.onClick()}>
                <td width="50%">
                    {this.props.object.name}
                </td>
                <td width="50%">
                    Users: {this.props.object.users.length}
                </td>
            </tr>
        )
    }
}

export default TeamListComponent;