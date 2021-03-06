import React, {Component} from "react";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import firebase from "firebase";
import UserDetailHeaderComponent from "../../components/user/UserDetailHeaderComponent";
import UserTournamentsComponent from "../../components/user/UserTournamentsComponent";
import UserMatchesComponent from "../../components/user/UserMatchesComponent";
import UserTeamsComponent from "../../components/user/UserTeamsComponent";

class UserDetailsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            teams: [],
            matches: [],
            tournaments: [],
            uuid: this.props.match.params.id === "profile" ? firebase.auth().currentUser.uid: this.props.match.params.id, // firebase.auth().currentUser.uid does not return uid if reloading
        };
    }

    componentDidMount() {
        ApiCommunication.graphQLRequest(
            "query",
            "user",
            "id uuid",
            [{name: "uuid", type: "String", value: this.state.uuid}])
            .then(response => {
                if (response != null) {
                    firebase
                        .firestore()
                        .collection("users")
                        .doc(this.state.uuid)
                        .get()
                        .then(doc => {
                            if (doc.exists) {
                                var user = response.data.data.user;
                                if (user != null) {
                                    user.email = doc.data().username;
                                    this.setState({user: user})
                                }
                            }
                        });
                }
            });

        ApiCommunication.graphQLRequest("query", "teams", "id name users {uuid}")
            .then(response => {
                this.setState({teams: response.data.data.teams.filter(team => {return team.users.some(user => { return user.uuid === this.state.uuid })})})
            });

        ApiCommunication.graphQLRequest("query", "matches", "id teamHome {name users {uuid}} teamAway {name users {uuid}} date")
            .then(response => {
                this.setState({matches: response.data.data.matches.filter(match => match.teamHome.users.includes(this.state.uuid) || match.teamAway.users.includes(this.state.uuid))})
            });

        ApiCommunication.graphQLRequest("query","tournaments","id name teams {id users {uuid}} numberOfTeams")
            .then(response => {
                this.setState({tournaments: response.data.data.tournaments.filter(tournament => {return tournament.teams.some(team => {return team.users.some(user => { return user.uuid === this.state.uuid })})})})
            });
    }

     render() {
         return this.state.user == null ? (
             <div className={"alert-warning"}>
                 <p> User not found. </p>
             </div>
         ) : (
             <div>
                 <UserDetailHeaderComponent name={this.state.user.email} />
                 <div className="row justify-content-center">
                     <UserTeamsComponent teams={this.state.teams} {...this.props}/>
                     <UserTournamentsComponent tournaments={this.state.tournaments} {...this.props} />
                     <UserMatchesComponent matches={this.state.matches} {...this.props}/>
                 </div>
             </div>
         );
    }
}

export default UserDetailsView;
