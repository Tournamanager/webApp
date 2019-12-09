import React, { Component } from "react";

import ChangeUserName from "../../components/account/ChangeUserNameComponent";
import DeleteUser from "../../components/account/DeleteUserComponent";

class AccountUser extends Component {
  state = {};
  render() {
    return (
      <div>
        This in an account
        <div>
          <ChangeUserName></ChangeUserName>
          <DeleteUser></DeleteUser>
        </div>
      </div>
    );
  }
}

export default AccountUser;
