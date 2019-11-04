import React, { Component } from 'react'

import Userdetail from "./userdetailComponent"

class Users extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: "",
            users: [],
            selectedUser: {}
        }

        this.setUser = this.setUser.bind(this)
    }
   

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                this.setState({ users: data })
            })
            .catch(console.log)
    }

    setUser(user) {
        this.setState({
            selectedUser: user
        })
        //console.log(this.user)
    } 


    render() {

        return (
            <div>
                <center><h1>User list</h1></center>
                {this.state.users.map((user) => (
                    <div className="card" >
                        <div class="card-body">
                            <a ><h5 className="card-title"  >{user.name}</h5></a>
                            
                            {/* <h6 class="card-subtitle mb-2 text-muted">{user.email}</h6>
                            <p class="card-text">beschrijving....</p> */}
                            <button onClick={ () => this.setUser(user) }>Details</button>
                         
                        </div>
                    </div>
                ))}
                <Userdetail data={this.state.selectedUser} key={this.state.selectedUser}></Userdetail>
            </div>
        )
    }
}

export default Users