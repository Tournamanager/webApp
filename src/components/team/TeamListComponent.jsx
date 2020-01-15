import React, { Component } from "react";

class TeamListComponent extends Component {
    redirectToTarget = () => {
        this.props.history.push({
            pathname: "/team/" + this.props.object.id
        });
    };


    render() {
        return (
            <tr style={{ textAlign: 'center' }} onClick={() => this.props.history.push('/team/' + this.props.object.id)}>
                <td>
                    <div style={{ maxWidth: '1400px', margin: 'auto', textAlign: 'center', display: 'inline-block', width: '100%' }}>
                        <div style={{ width: '10%', display: 'inline-block' }}> #{this.props.object.id}</div>
                        <div className="customTD" style={{ textAlign: 'left' }}>  <span style={{ color: '#007BFF', fontWeight: '500', fontSize: '1.25rem' }}> {this.props.object.name} </span> </div>
                        <div className="customTD">  Members: <b>{this.props.object.users.length}</b></div>
                        <div className="customTD">  Tournaments:  <b> {this.props.object.tournaments.length}</b></div>
                    </div>
                </td>
            </tr >
        )
    }


}



export default TeamListComponent;