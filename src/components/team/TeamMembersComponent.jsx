import React, { Component } from 'react';

class TeamMembersComponent extends Component {

    listItems = () => (
        this.props.members.map((item) => {
           return  <li class="list-group-item">{item}</li>
        })
    )

    render() {
        return (
            <div class="col-md-5" style={{margin: '0 auto'}}>
                    <div>
                    <h2 style={{display: 'inline-block'}}>Members</h2>
                    <button style={{verticalAlign: 'super', float: 'right'}} type="button" class="btn btn-dark"><i style={{verticalAlign: 'middle', fontSize: '28px'}} class="material-icons">add_circle</i>
                    </button>
                </div>
                <ul class="list-group">
                    {
                        this.listItems()
                    }
                </ul>
            </div>      
        )
    }
}

export default TeamMembersComponent;