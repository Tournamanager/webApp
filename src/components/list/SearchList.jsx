import React, { Component } from "react";
import TournamentListComponent from "../tournament/TournamentListComponent";
import TeamsListComponent from "../team/TeamListComponent";
import UserListComponent from "../user/UsersListComponent";
import AddUserListComponent from "../user/AddUserListComponent";
import JoinTeamListComponent from "../team/JoinTeamListComponent";

class SearchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredObjects: []
    };

    this.className='';
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    let filtered = [];
    this.props.objects.forEach(o => {
      if (o.name.toLowerCase().includes(event.target.value.toLowerCase())) {
        filtered.push(o);
      }
    });
    this.setState({ filteredObjects: filtered });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isSet !== this.props.isSet) {
      this.setState({ filteredObjects: this.props.objects });
    }
  }

  render() {
    if (this.state.filteredObjects.length > 0) {
      this.className = 'pointer'
    } else {
      this.className = ''
    }

    return (
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th colSpan="10">
              <input
                onChange={this.onChange}
                size="1"
                className="form-control col-lg-2 float-right"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </th>
          </tr>
        </thead>
        <tbody className={this.className}>
          {!this.props.isSet ? (
            <tr>
              <td>No data to display</td>
            </tr>
          ) : this.state.filteredObjects.length > 0 ? (
            this.props.src === "tournaments" ? (
              this.state.filteredObjects.map(object => (
                <TournamentListComponent
                  key={object.id}
                  object={object}
                  {...this.props}
                />
              ))
            ) : this.props.src === "teams" ? (
              this.state.filteredObjects.map(object => (
                <TeamsListComponent
                  key={object.id}
                  object={object}
                  {...this.props}
                />
              ))
            ) : this.props.src === "users" ? (
              this.state.filteredObjects.map(object => (
                <UserListComponent key={object.id} object={object} {...this.props} />
              ))
            ) : this.props.src === "addUsers" ? (
                this.state.filteredObjects.map(object => (
                    <AddUserListComponent key={object.id} object={object} {...this.props} />
                ))
            ) : this.props.src === "joinTournament" ? (
              this.state.filteredObjects.map(object => (
                  <JoinTeamListComponent key={object.id} object={object} {...this.props} />
              ))
          ) : (
              <tr>
                <td>No data to display</td>
              </tr>
            )
          ) : (
            <tr>
              <td>No data to display</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default SearchList;
