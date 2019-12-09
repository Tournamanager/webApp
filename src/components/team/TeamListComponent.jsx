import React, { Component } from "react";

class TeamListComponent extends Component {

    render() {
        return (
            <tr>
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