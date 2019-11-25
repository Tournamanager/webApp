import React, { Component } from 'react';
import firebase from "firebase"

class ProfileUserView extends Component {

    ref;
    userNames = [];

    constructor(props) {
        super(props);
        this.state = {
            User: {
                username: "",
                //key: firebase.auth().currentUser.uid
            },
            NewUsername: "",
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.saveUsername = this.saveUsername.bind(this);

        this.ref = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);
    }




    componentDidMount() {

        console.log(firebase.auth().currentUser.uid);
        const userDetails = {
            username: "User " + firebase.auth().currentUser.uid,
            // key: firebase.auth().currentUser.uid
        };

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
                    User: userDetails
                });

                this.ref.set(userDetails);

                console.log("No such document!");
            } else {
                this.setState({
                    User: userDetails
                });
            }

            console.log(doc.data())
        });
    }

    getAllUsers() {
        const userNames = [];

        firebase.firestore().collection('users').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    userNames.push(data.username)
                });
            }).then(() => {
                this.userNames = userNames;
                console.log(this.userNames)
            })
    }

    checkAvailability(username) {
        console.log(this.userNames);
        return !this.userNames.find(u => u === username);
    }

    handleChangeUsername(event) {
        this.setState({ NewUsername: event.target.value });
        // console.log(this.state.newUsername)
    }

    saveUsername() {
        const newUserName = this.state.NewUsername;
        console.log(this.checkAvailability(newUserName));
        if (this.checkAvailability(newUserName)) {
          
            this.ref.set({ username: newUserName });
            alert('Username opgeslagen ' + newUserName);
            this.setState({ User: { username: newUserName } })
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

export default ProfileUserView;
