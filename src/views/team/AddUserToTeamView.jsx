import React, { Component } from 'react';
import UserListComponent from "../../components/user/UserListComponent"

class AddUserToTeamView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users:['',''],
            name: 'Naam a',
            numberOfUsers: 2
        }
    }

    componentDidMount(){
       
    }

    render() {
        return (
            <div>
                <h1 className="jumbotron text-center">team A</h1>
    
                <UserListComponent object = { { users: this.state.users, name: this.state.name , numberOfUsers: this.state.numberOfUsers } }/>
            </div>
        )
    }

}

export default AddUserToTeamView;