import React, { Component } from 'react';
import firebase from "firebase"

class UserProfileView extends Component {

    ref;
    Usernames = [];

    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            User: {
                username: "",
                //key: firebase.auth().currentUser.uid
            },
            NewUsername: "",
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.saveUsername = this.saveUsername.bind(this);

        this.ref = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
    }




    componentDidMount() {

        console.log(firebase.auth().currentUser.uid)
        const Userdetails = {
            username: "User " + firebase.auth().currentUser.uid,
            // key: firebase.auth().currentUser.uid
        }

        this.getAllUsers();
        //   this.unsubscribe = this.ref.onSnapshot(this.getAllUsers);

        this.ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    User: doc.data(),
                    key: doc.id,
                });
            } else if (!doc.exists) {

                this.setState({
                    User: Userdetails
                });

                this.ref.set(Userdetails);

                console.log("No such document!");
            } else {
                this.setState({
                    User: Userdetails
                });
            }

            console.log(doc.data())
        });
    }

    getAllUsers() {
        const usernames = [];

        firebase.firestore().collection('users').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    usernames.push(data.username)
                });
            }).then(() => {
                this.Usernames = usernames  
                console.log(this.Usernames)
            })
    }

    checkAvailibility(username) {
        console.log(this.Usernames)
        return !this.Usernames.find(u => u === username);
    }

    handleChangeUsername(event) {
        this.setState({ NewUsername: event.target.value });
        // console.log(this.state.newUsername)
    }

    saveUsername() {
        const newusername = this.state.NewUsername;
        console.log(this.checkAvailibility(newusername))
        if (this.checkAvailibility(newusername)) {
          
            this.ref.set({ username: newusername });
            alert('Username opgeslagen ' + newusername);
            this.setState({ User: { username: newusername } })
        }
        else {
            alert('Username bezet');
        }

    }

    render() {
        return (
            <div className="container">
                <label>
                    Username: {this.state.User.username}
                    <br />
                    <input onChange={this.handleChangeUsername} placeholder="New username..." type="text" name="name" />
                </label>
                <br />
                <button onClick={() => this.saveUsername()}>Save</button>
            </div>
        )
    }
}

export default UserProfileView;
