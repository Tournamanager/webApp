import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class TeamMembersComponent extends Component {

    listItems = () => (
        this.props.members.map((item) => {
            return <li key={item.id} className="list-group-item">{item.name}</li>
        })
    )

    render() {
        return (
            <div className="col-md-5" style={{ margin: '0 auto' }}>
                <div>
                    <h2 style={{ display: 'inline-block' }}>Members</h2>
                    <button onClick={() => this.props.history.push("/team/addUser/" + this.props.object.id)} style={{ verticalAlign: 'super', float: 'right' }} type="button" className="btn btn-dark"><i style={{ verticalAlign: 'middle', fontSize: '28px' }} className="material-icons">add_circle</i>
                    </button>
                </div>
                <ul className="list-group">
                    {
                        this.listItems()
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(TeamMembersComponent);