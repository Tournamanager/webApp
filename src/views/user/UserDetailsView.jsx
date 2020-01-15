import React, {Component} from "react";
import {Row, Col} from "react-bootstrap";
import TournamentsList from "../../components/user/TournamentsListComponent";
import TeamsList from "../../components/user/TeamsListComponent";
import MatchesList from "../../components/user/MatchesListComponent";
import ApiCommunication from "../../services/apicommunication/ApiCommunication";
import firebase from "firebase";
import TeamDetailHeaderComponent from "../team/TeamDetailsView";
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
                    console.log(response)
                    this.setState({user: response.data.data.user})
                }
            });

        ApiCommunication.graphQLRequest("query", "teams", "id name users {uuid}")
            .then(response => {
                console.log(response)
                this.setState({teams: response.data.data.teams.filter(team => {return team.users.some(user => { return user.uuid === this.state.uuid })})})
            });

        ApiCommunication.graphQLRequest("query", "matches", "id teamHome {name users {uuid}} teamAway {name users {uuid}} date")
            .then(response => {
                console.log(response)
                this.setState({matches: response.data.data.matches.filter(match => match.teamHome.users.includes(this.state.uuid) || match.teamAway.users.includes(this.state.uuid))})
            });

        ApiCommunication.graphQLRequest("query","tournaments","id name teams {id users {uuid}} numberOfTeams matches {id}")
            .then(response => {
                console.log(response)
                this.setState({tournaments: response.data.data.tournaments.filter(tournament => {return tournament.teams.some(team => {return team.users.some(user => { return user.uuid === this.state.uuid })})})})
                console.log(this.state)
            });

    }

     render() {
         return this.state.user == null ? (
             <div className={"alert-warning"}>
                 <p> User not found. </p>
             </div>
         ) : (
             <div>
                 <UserDetailHeaderComponent name="USER" />
                 <div className="row">
                     <UserTournamentsComponent tournaments={this.state.tournaments} />
                     <UserTeamsComponent teams={this.state.teams} />
                     <UserMatchesComponent matches={this.state.matches} />
                 </div>
             </div>
         );
    //     return (
    //         <div>
    //             <Row>
    //                 <Col id="teamsCol" md="2">
    //                     Teams:
    //                     {this.state.teams.map(team => (
    //                         -<TeamsList key={"team" + team.id} object={team} {...this.state}/>
    //                     ))}
    //                 </Col>
    //                 <Col>
    //                     <Row>
    //                         Matches:
    //                     </Row>
    //                     {this.state.matches.map(match => (
    //                         <Row>-<MatchesList key={"match" + match.id} object={match} {...this.state}/></Row>
    //                     ))}
    //                     <Row>
    //                         Tournaments:
    //                     </Row>
    //                     {this.state.tournaments.map(tournament => (
    //                         <Row>-<TournamentsList key={"tournament" + tournament.id} object={tournament} {...this.state}/></Row>
    //                     ))}
    //                 </Col>
    //             </Row>
    //         </div>
    //     );
    }
}

export default UserDetailsView;
