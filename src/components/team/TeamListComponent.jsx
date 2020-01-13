import React, { Component } from "react";

class TeamListComponent extends Component {

    render() {
        return (
            <tr onClick={() => this.props.history.push('/team/' + this.props.object.id)}>
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