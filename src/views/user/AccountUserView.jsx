import React, { Component } from "react";

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
