import React, { Component } from 'react';


class TeamDetailHeaderComponent extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div>
                <h1 className="jumbotron text-center">team {this.props.name}</h1>
             
            </div>
        )
    }
}

export default TeamDetailHeaderComponent;