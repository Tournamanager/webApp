import React, { Component } from 'react';

class UserTeamsComponent extends Component {

    listItems = () => (
        this.props.teams.length > 0 ?
            this.props.teams.map((item) => {
                return <li key={item.id} className="list-group-item"
                           onClick={() => this.props.history.push("/team/" + item.id)}>{item.name}</li>
            }) : <li>No teams found.</li>
    )

    render() {
        return (
            <div className="col-md-3" style={{ margin: '0 auto' }}>
                <div>
                    <h2 className="text-center" style={{ display: 'inline-block' }}>Teams</h2>
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

export default UserTeamsComponent;
