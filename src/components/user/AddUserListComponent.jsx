import React, { Component } from "react";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";

class AddUserListComponent extends Component {

    submitUser(id) {
        ApiCommunication.graphQLRequest("mutation", "addUserToTeam", null, [
            {
                name: "teamId",
                type: "Int",
                value: this.props.match.params.id
            },
            {
                name: "userId",
                type: "Int",
                value: id
            }
        ]).then(
            () => this.props.history.push("/team/" + this.props.match.params.id)
        )
    }

    render() {
        return (
            <tr>
                <td width="50%">
                    {this.props.object.name}
                </td>
                <td width="50%">
                    {this.props.object.inTeam === false &&
                        (
                            <button className="btn btn-primary float-right" onClick={() => this.submitUser(this.props.object.id)}>Join team</button>
                        )
                    }
                </td>
            </tr>
        )
    }
}

export default AddUserListComponent;
