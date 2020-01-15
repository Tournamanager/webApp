import React, { Component } from "react";

class UsersListComponent extends Component {

    render() {
        return (
            <tr onClick={() => this.props.history.push('/user/' + this.props.object.uuid)}>
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
