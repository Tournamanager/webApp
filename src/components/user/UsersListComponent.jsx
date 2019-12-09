import React, { Component } from "react";

class UsersListComponent extends Component {

    render() {
        return (
            <tr>
                <td width="50%">
                    {this.props.object.name}
                </td>
                <td width="50%">
                    ID: {this.props.object.id}
                </td>
            </tr>
        )
    }
}

export default UsersListComponent;
